import React, { useState, useContext, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { Redirect } from "react-router-dom";
import UserContext from "../Contexts/UserContext";

const useStyles = makeStyles(theme => ({
  root: {
    width: 200
  }
}));

const FormLogin = () => {
  // Use of the context.
  const { userData, setNewPseudonymeContext, setNewLoggedStatus, setPasswordContext, setNewNameContext, setNewFirstnameContext, setNewEmailContext, localUserData, userLoggedLocal, setNewLocalUserData, isUserLoggedLocal } = useContext(
    UserContext
  );

  useEffect(() => {
    isUserLoggedLocal(JSON.parse(localStorage.getItem("isLogged")))
  }, [isUserLoggedLocal]);
 

  const classes = useStyles();
  const [error, hasError] = useState(false);
  const [errorMessage, setNewMessageError] = useState();
  const [pseudonyme, setPseudonyme] = useState();
  const [password, setPassword] = useState();
  // const [userDataLocal, setUserData] = useLocalState('isLogged');
  const [userLogged, setUserLogged] = useState(false);
  const [pseudoEmpty, isPseudoEmpty] = useState(true);
  const [passwordEmpty, isPasswordEmpty] = useState(true);

  const handleInputPseudonymeChange = event => {
    isPseudoEmpty(false);
    setPseudonyme(event.target.value);
  };

  const handleInputPasswordChange = event => {
    isPasswordEmpty(false);
    setPassword(event.target.value);
  };

  const handleFocus = event => {
    if (error) {
      hasError(false);
    }
    if (event.target.value) {
      event.target.value = "";
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    const userData = {
      pseudonyme,
      password
    };

    axios
      .post("/users/login", userData)
      .then(response => {
        hasError(response.data.error);
        setNewMessageError(response.data.errorMessage);
        setNewPseudonymeContext(userData.pseudonyme);
        setPasswordContext(userData.password);
        setNewLoggedStatus(response.data.isLogged);
        setNewNameContext(response.data.name);
        setNewEmailContext(response.data.email);
        setNewFirstnameContext(response.data.firstname);
        setUserLogged(response.data.isLogged);
        setNewLocalUserData(localStorage.setItem("isLogged", true));
      })
      .catch(err => {
        console.error(err);
      }); 

     
    };


  return (
    <>
      {userLoggedLocal && (
        <>
          <Redirect to={"/profil"} />
        </>
      )}
      <form
        onSubmit={handleSubmit}
        className={classes.root}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            helperText={pseudoEmpty ? "Pseudonyme required." : ""}
            onChange={handleInputPseudonymeChange}
            onFocus={handleFocus}
            label="Pseudonyme"
          />
          <TextField
            helperText={passwordEmpty ? "Password required." : ""}
            onChange={handleInputPasswordChange}
            onFocus={handleFocus}
            label="Password"
            type="password"
          />

          {error && <span style={{ color: "red" }}> {errorMessage} </span>}

          <Button
            style={{ margin: "20px 0 0 30px" }}
            variant="contained"
            color="primary"
            type="submit"
          >
            {" "}
            Envoyer{" "}
          </Button>
        </div>
      </form>
    </>
  );
};

export default FormLogin;
