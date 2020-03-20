import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    width: 300
  }
}));

const FormRegister = () => {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField style={{width: '300px'}} id="registerNickname"   label="Nickname" />
        <TextField style={{width: '300px'}} id="registerPseudonyme"  label="Pseudonyme" />
        <TextField style={{width: '300px'}} id="registerPassword"  label="Password" />
        <TextField style={{width: '300px'}} id="registerPasswordConfirmation"   label="Password confirmation" />
        <TextField style={{width: '300px'}} id="registerEmail"   label="Email" />
        <Button
          style={{ margin: "20px 0 0 110px" }}
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

export default FormRegister;
