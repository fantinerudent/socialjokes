import React, { useState, useContext } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { Redirect } from "react-router-dom";
import UserContext from "../Contexts/UserContext";

const useStyles = makeStyles(theme => ({
  root: {
    width: 300
  }
}));

const FormRegister = () => {
  // STYLE :
  const classes = useStyles();

  // Use of the context.
  const { setNewPseudonymecontext, setNewLoggedStatus } = useContext(
    UserContext
  );

  const [error, hasError] = useState(false);
  const [errorMessage, setNewMessageError] = useState();
  const [pseudonyme, setPseudonyme] = useState();
  const [password, setPassword] = useState();
  const [confirmationPassword, setConfirmationPassword] = useState();
  const [nickname, setNickname] = useState();
  const [email, setEmail] = useState();
  const [userData, setUserData] = useState();
  const [userLogged, setUserLogged] = useState(false);

  const handleInputNicknameChange = event => {
    setNickname(event.target.value);
  };

  const handleInputPseudonymeChange = event => {
    setPseudonyme(event.target.value);
  };

  const handleInputPasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleInputConfirmationPasswordChange = event => {
    setConfirmationPassword(event.target.value);
  };

  const handleInputEmailChange = event => {
    setEmail(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    hasError(false);

    let mustIncludes = "@";
    if (email) {
      if (email.includes(mustIncludes) === false) {
        hasError(true);
        setNewMessageError("your must enter a correct email adress");
      }
    }

    if (password !== confirmationPassword) {
      hasError(true);
      setNewMessageError("you must enter the same password");
    }

    const userData = {
      pseudonyme,
      password,
      email,
      nickname
    };

    axios
      .post("/users/register", userData)
      .then(response => {
        hasError(response.data.error);
        setNewMessageError(response.data.errorMessage);
        setNewPseudonymecontext(userData.pseudonyme);
        setUserData(response.data.userData);
        setUserLogged(response.data.isLogged);
        setNewLoggedStatus(response.data.isLogged);
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <>
      {userLogged && (
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
            style={{ width: "300px" }}
            id="registerNickname"
            label="Nickname"
            onChange={handleInputNicknameChange}
          />
          <TextField
            style={{ width: "300px" }}
            id="registerPseudonyme"
            label="Pseudonyme"
            onChange={handleInputPseudonymeChange}
          />
          <TextField
            style={{ width: "300px" }}
            id="registerPassword"
            type="password"
            label="Password"
            onChange={handleInputPasswordChange}
          />
          <TextField
            style={{ width: "300px" }}
            id="registerPasswordConfirmation"
            type="password"
            label="Password confirmation"
            onChange={handleInputConfirmationPasswordChange}
          />
          <TextField
            style={{ width: "300px" }}
            id="registerEmail"
            label="Email"
            onChange={handleInputEmailChange}
          />
          <Button
            style={{ margin: "20px 0 0 110px" }}
            variant="contained"
            color="primary"
            type="submit"
          >
            {" "}
            Envoyer{" "}
          </Button>
          {hasError && <div style={{ color: "red" }}> {errorMessage} </div>}
        </div>
      </form>
    </>
  );
};

export default FormRegister;
