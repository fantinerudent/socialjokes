import React from 'react';
import FormRegister from "../Components/FormRegister";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "88vh",
    }
  });
  
  const Register = () => {
    const classes = useStyles();
    return (
      <div className={classes.root}>
        <FormRegister />
      </div>
    );
  };

export default Register;