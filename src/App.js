import { hot } from "react-hot-loader/root";
import React, { useState, useMemo } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Header from "./Components/Header/Header";
import Register from "./Pages/Register";
import Profil from "./Pages/Profil";
import FriendslistAdmin from "./Pages/FriendslistAdmin.js";
import FriendslistUser from "./Pages/FriendslistUser";
import { UserProvider } from "./Contexts/UserContext";

function App() {
  // the user object must contain : pseudonyme, name, firstname, email adress, gender, age, password...
  const [user, setUser] = useState();
  // this will determines if the user is an administrator;
  const [isAdmin, setIsAdmin] = useState();
  // this will determines if the user is logged.
  const [isLogged, setIsLogged] = useState(false);

  const providerValue = useMemo(
    () => ({ user, setUser, isAdmin, setIsAdmin, isLogged, setIsLogged }),
    [user, setUser, isLogged, setIsLogged, isAdmin, setIsAdmin]
  );

  return (
    <UserProvider value={providerValue}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/profil">
            {isLogged && <Profil />}
            {!isLogged && <Redirect to="/" />}
          </Route>
          <Route path="/friendslist">
            {isAdmin && isLogged && <FriendslistAdmin />}
            {isLogged && <FriendslistUser />}
            {/* {!isLogged && <Redirect to="/" />} */}
          </Route>
        </Switch>
      </Router>
    </UserProvider>
  );
}

export default hot(App);
