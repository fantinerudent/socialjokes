import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    width: 200
  }
}));

const FormLogin = () => {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField  required="true"  label="Pseudonyme" />
        <TextField required="true"  label="Password" />
        <Button
          style={{ margin: "20px 0 0 30px" }}
          variant="contained"
          color="primary"
          type="submit"
          disabled="true"
        >
          {" "}
          Envoyer{" "}
        </Button>
      </div>
    </form>
  );
};


export default FormLogin;
