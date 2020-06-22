import React, { useState, useContext } from "react";
import FormForgottenPassword from "../Components/FormPasswordForgotten";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { Redirect } from "react-router-dom";
import UserContext from "../Contexts/UserContext";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 200,
  },
}));

const FormLogin = () => {
  // Use of the context.
  const { setUser, setIsLogged, isLogged, setIsAdmin } = useContext(UserContext);

  const classes = useStyles();

  const [error, hasError] = useState(false);
  const [errorMessage, setNewMessageError] = useState();
  const [pseudonyme, setPseudonyme] = useState();
  const [password, setPassword] = useState();
  const [userForgotPassword, setUserForgotPassword] = useState(false);

  const [pseudoEmpty, isPseudoEmpty] = useState(true);
  const [passwordEmpty, isPasswordEmpty] = useState(true);

  const handleInputPseudonymeChange = (event) => {
    isPseudoEmpty(false);
    setPseudonyme(event.target.value);
  };

  const handleInputPasswordChange = (event) => {
    isPasswordEmpty(false);
    setPassword(event.target.value);
  };

  const handleFocus = (event) => {
    if (error) {
      hasError(false);
    }
    if (event.target.value) {
      event.target.value = "";
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      pseudonyme,
      password,
    };

    axios
      .post("/users/login", userData)
      .then((response) => {
        hasError(response.data.error);
        setNewMessageError(response.data.errorMessage);
        setUser(response.data.userData);
        setIsLogged(response.data.isLogged);
        if ( response.data.userData.isAdministrator) {
          setIsAdmin(response.data.userData.isAdministrator) 
        }
        else {setIsAdmin(false)};
        }) 
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      {isLogged && (
        <>
          <Redirect to={"/profil"} />
        </>
      )}
      {!userForgotPassword && (
        <form
          onSubmit={handleSubmit}
          className={classes.root}
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
              style={{ margin: "40px 0  20px 30px" }}
              variant="contained"
              color="primary"
              type="submit"
            >
              SEND
            </Button>
            <Button
              color="secondary"
              variant="contained"
              onClick={() => setUserForgotPassword(true)}
            >
              Forgot password ?
            </Button>
          </div>
        </form>
      )}
      {userForgotPassword && <FormForgottenPassword />}
    </>
  );
};

export default FormLogin;
