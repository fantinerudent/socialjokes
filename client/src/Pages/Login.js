import React from 'react';
import FormLogin from "../Components/FormLogin";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "88vh",
    }
  });
  
  const Login = () => {
    const classes = useStyles();
    return (
      <div className={classes.root}>
        <FormLogin />
      </div>
    );
  };
export default Login;