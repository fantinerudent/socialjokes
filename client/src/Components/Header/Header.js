import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import UserContext from "../../Contexts/UserContext";
import { Link } from "react-router-dom";

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

  const handleClickSignOut = (event) => {
    event.preventDefault();
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
              Social Jokes
            </Link>
          </Typography>
          {!isLogged && (
            <>
              <Link className={classes.LinkButton} color="inherit" to="/login">
                Login
              </Link>
              <Link
                color="inherit"
                className={classes.LinkButton}
                to="/register"
              >
                Register
              </Link>
            </>
          )}
          {isLogged && (
            <>
              <span style={{ marginRight: "10px" }}>
                {user.pseudonyme} est connecté :
              </span>
              <span
                className={classes.LinkButton}
                color="inherit"
                onClick={handleClickSignOut}
              >
                Sign-out
              </span>
              <Link className={classes.LinkButton} color="inherit" to="/profil">
                My Profile 
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
