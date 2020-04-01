import React, { useState } from "react";
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
  const [pseudonymeContext, setNewPseudonymeContext] = useState(null);
  const [nameContext, setNewNameContext] = useState(null);
  const [firstnameContext, setNewFirstnameContext] = useState(null);
  const [ageContext, setNewAgeContext] = useState(null);
  const [passwordContext, setPasswordContext] = useState(null);
  const [emailContext, setNewEmailContext] = useState(null);
  const [descriptionContext, setNewDescriptionContext] = useState(null);
  const [genderContext, setNewGenderContext] = useState(null);
  const [
    contactInformationsContext,
    setNewContactInformationsContext
  ] = useState(null);
  const [favsContext, setNewFavsContext] = useState(null);

  const value = {
    isLogged,
    setNewLoggedStatus,
    pseudonymeContext,
    setNewPseudonymeContext,
    firstnameContext,
    setNewFirstnameContext,
    nameContext,
    setNewNameContext,
    ageContext,
    setNewAgeContext,
    passwordContext,
    setPasswordContext,
    emailContext,
    setNewEmailContext,
    descriptionContext,
    setNewDescriptionContext,
    genderContext,
    setNewGenderContext,
    contactInformationsContext,
    setNewContactInformationsContext,
    favsContext,
    setNewFavsContext
  };

  return (
    <UserContext.Provider value={value}>
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
            {isLogged && (
              <Route path="/profil">
                <Profil />
              </Route>
            )}
          </Switch>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
