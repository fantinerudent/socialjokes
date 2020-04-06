import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import UserContext from "../Contexts/UserContext";
import { Redirect, Router, Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  LinkButton: {
    textDecoration: "none",
    color: "white",
    marginRight: 20,
    cursor: "pointer",
  },
}));

const Header = () => {
  const classes = useStyles();

  const { user, isLogged, setIsLogged } = useContext(UserContext);

  //usage of the context to know if the user is logged.

  localStorage.setItem("isLogged", isLogged);
  const isLoggedLocally = JSON.parse(localStorage.getItem("isLogged"));
  const pseudoLocally = localStorage.getItem("pseudo");

  const handleClickSignOut = (event) => {
    setIsLogged(false);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link
              to="/"
              style={{
                cursor: "pointer",
                color: "white",
                textDecoration: "none",
              }}
            >
              {" "}
              Social Jokes{" "}
            </Link>
          </Typography>
          {!isLoggedLocally && (
            <>
              <Link className={classes.LinkButton} color="inherit" to="/login">
                {" "}
                Login{" "}
              </Link>
              <Link
                color="inherit"
                className={classes.LinkButton}
                to="/register"
              >
                {" "}
                Register{" "}
              </Link>{" "}
            </>
          )}
          {isLoggedLocally && (
            <>
              <span style={{ marginRight: "10px" }}>
                {" "}
                {user.pseudonyme} est connecté :{" "}
              </span>
              <span
                className={classes.LinkButton}
                color="inherit"
                onClick={handleClickSignOut}
              >
                {" "}
                Sign-out{" "}
              </span>
              <Link className={classes.LinkButton} color="inherit" to="/profil">
                {" "}
                mon profil{" "}
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
