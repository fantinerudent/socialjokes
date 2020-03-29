import React, { useState, createContext, useContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Header from "./Components/Header";
import Register from "./Pages/Register";
import Profil from "./Pages/Profil";
import UserContext from "./Contexts/UserContext";

function App() {
  const [isLogged, setNewLoggedStatus] = useState(false);
  const [pseudonymeContext, setNewPseudonymecontext] = useState(null);

  const value = {
    isLogged, 
    setNewLoggedStatus, 
    pseudonymeContext, 
    setNewPseudonymecontext
  }
 

  return (
    <UserContext.Provider
      value={
       value
      }
    >
      <div>
        <Header />
        <Router>
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
              <Profil />
            </Route>
          </Switch>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
