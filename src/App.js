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
import Header from "./Components/Header";
import Register from "./Pages/Register";
import Profil from "./Pages/Profil";
import { UserProvider } from "./Contexts/UserContext";

function App() {
  // the user object must contain : pseudonyme, name, firstname, email adress, gender, age, password...
  const [user, setUser] = useState();
  // this will determines if the user is logged.
  const [isLogged, setIsLogged] = useState(false);

  const providerValue = useMemo(
    () => ({ user, setUser, isLogged, setIsLogged }),
    [user, setUser, isLogged, setIsLogged]
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
        </Switch>
      </Router>
    </UserProvider>
  );
}

export default App;
