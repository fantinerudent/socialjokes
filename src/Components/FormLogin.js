import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {
    width: 200
  }
}));

const FormLogin = () => {
  const classes = useStyles();
  const [error, hasError] = useState(false);
  const [errorMessage, setNewMessageError] = useState();
  const [pseudonyme, setPseudonyme] = useState();
  const [password, setPassword] = useState();
  const [userData, setUserData] = useState();
  const [userLogged, setUserLogged] = useState(false);
  const [message, setNewMessage] = useState("");

  const handleInputPseudonymeChange = event => {
    setPseudonyme(event.target.value);
  };
  const handleInputPasswordChange = event => {
    setPassword(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      pseudonyme,
      password
    };

    
    axios
      .post("/users/login", userData)
      .then((response) => {hasError(response.data.error); setNewMessageError(response.data.errorMessage); setUserData(response.data.userData); setUserLogged(response.data.isLogged); setNewMessage(response.data.message)})
      .catch(err => {
        console.error(err);
      });


  };

  return (
    <form  onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField onChange={handleInputPseudonymeChange} label="Pseudonyme" />
        <TextField onChange={handleInputPasswordChange} label="Password" />
        
        { userLogged &&
          <span style={{color: 'blue', fontSize: '1em'}}> {message} </span>
        }
        { error && 
          <span style={{color: 'red'}}> {errorMessage} </span>}

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
  );
};

export default FormLogin;
