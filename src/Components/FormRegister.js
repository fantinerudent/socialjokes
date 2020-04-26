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
  const { setUser, setIsLogged, isLogged} = useContext(
    UserContext
  );

  const [error, hasError] = useState(false);
  const [errorMessage, setNewMessageError] = useState();
  const [pseudonyme, setPseudonyme] = useState();
  const [password, setPassword] = useState();
  const [confirmationPassword, setConfirmationPassword] = useState();
  const [name, setName] = useState();
  const [firstname, setFirstname] = useState();
  const [email, setEmail] = useState();

  const handleInputNameChange = event => {
    setName(event.target.value);
  };

  const handleInputFirstnameChange = event => {
    setFirstname(event.target.value);
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

  const handleBlurForm = (event) => {
    if (password !== confirmationPassword) {
      hasError(true);
      setNewMessageError("you must enter the same password");
    }
  }

  const handleInputEmailChange = event => {
    setEmail(event.target.value);
  };

  const handleChangeForm = (event) => {
    hasError(false)
  }


  const handleSubmit = event => {
    event.preventDefault();
    hasError(false);


    const userData = {
      pseudonyme,
      password,
      email,
      name,
      firstname
    };


    if (!error) {
      axios
        .post("/users/register", userData)
        .then(response => {
          hasError(response.data.error);
          setNewMessageError(response.data.errorMessage);
          setUser(response.data.userData)
          setIsLogged(response.data.isLogged);
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  return (
    <>
      {isLogged && (
        <>
          <Redirect to={"/profil"} />
        </>
      )}
      <form
        onSubmit={handleSubmit}
        onChange={handleChangeForm}
        className={classes.root}
        autoComplete="off"
        onBlur={handleBlurForm}
      >
        <div>
          <TextField
            style={{ width: "300px" }}
            id="registerPseudonyme"
            label="Pseudonyme"
            onChange={handleInputPseudonymeChange}
            required
          />
          <TextField
            style={{ width: "300px" }}
            id="registerFirstname"
            label="Firstname"
            onChange={handleInputFirstnameChange}
            required
          />
          <TextField
            style={{ width: "300px" }}
            id="registerName"
            label="Name"
            onChange={handleInputNameChange}
            required
          />
          <TextField
            style={{ width: "300px" }}
            id="registerPassword"
            type="password"
            label="Password"
            onChange={handleInputPasswordChange}
            required
          />
          <TextField
            style={{ width: "300px" }}
            id="registerPasswordConfirmation"
            type="password"
            label="Password confirmation"
            onChange={handleInputConfirmationPasswordChange}
            required
          />
          <TextField
            style={{ width: "300px" }}
            id="registerEmail"
            label="Email"
            type="email"
            onChange={handleInputEmailChange}
            required
          />
          <Button
            style={{ margin: "20px 0 0 110px" }}
            variant="contained"
            color="primary"
            type="submit"
          >
            
            Envoyer
          </Button>
          {error && <div style={{ color: "red" }}> {errorMessage} </div>}
        </div>
      </form>
    </>
  );
};

export default FormRegister;