import React, { useState, useContext } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { Link } from "react-router-dom";
import UserContext from "../Contexts/UserContext";


const useStyles = makeStyles((theme) => ({
  root: {
    width: 200,
  },
}));

const FormPasswordForgotten = () => {
  // Use of the context.
  const { setUser } = useContext(UserContext);

  const classes = useStyles();

  const [error, hasError] = useState(false);
  const [errorMessage, setNewMessageError] = useState();
  const [message, hasMessage] = useState();
  const [messageToShow, setMessageToShow] = useState();
  const [email, setEmail] = useState();
  const [mailSent, setMailSent] = useState(false);

  const handleInputEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email,
    };

    axios
      .post("/users/passwordforgotten", userData)
      .then((response) => {
        hasError(response.data.error);
        setNewMessageError(response.data.errorMessage);
        setMessageToShow(response.data.messageToShow);
        hasMessage(response.data.message);
        setMailSent(response.data.mailSent);
        setUser(response.data.userData);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={classes.root} autoComplete="off">
        <TextField
          type="email"
          onChange={handleInputEmailChange}
          label="Enter your email"
        />
        {error && <span style={{ color: "red" }}> {errorMessage} </span>}
        <Button
          style={{ margin: "20px 0 0 30px" }}
          variant="contained"
          color="primary"
          type="submit"
        >
          
          SEND
        </Button>
        {mailSent && <Link style={{display: "block", margin:"10px"}} to="/"> BACK TO HOME</Link>}
        {message && (
          <span style={{ display: "flex", color: "blue" }}>
            {messageToShow}
          </span>
        )}
      </form>
    </>
  );
};

export default FormPasswordForgotten;
