import React, { useState, useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Header from "./Components/Header";
import Register from "./Pages/Register";
import Profil from "./Pages/Profil";
import UserContext from "./Contexts/UserContext";

function App() {
  
  const [userData, setNewUserData] = useState();
  const [isLogged, setNewLoggedStatus] = useState(null);
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


 // will permit to state a new status of logged
  const [localUserData, setNewLocalUserData] = useState(localStorage.setItem('isLogged', false));
  // will return a boolean false / true in userLoggedLocal.
  const [userLoggedLocal, isUserLoggedLocal] = useState(JSON.parse(localStorage.getItem("isLogged")));


  console.log('app',typeof(userLoggedLocal))
  
  const value = {
    localUserData,
    userLoggedLocal,
    isUserLoggedLocal,
    setNewLocalUserData,
    userData: {
      isLogged,
      pseudonymeContext,
      passwordContext,
      firstnameContext,
      nameContext,
      ageContext,
      emailContext,
      descriptionContext,
      genderContext,
      contactInformationsContext,
      favsContext
    },
    setNewUserData,
    setNewLoggedStatus,
    setNewPseudonymeContext,
    setNewFirstnameContext,
    setNewNameContext,
    setNewAgeContext,
    setPasswordContext,
    setNewEmailContext,
    setNewDescriptionContext,
    setNewGenderContext,
    setNewContactInformationsContext,
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
