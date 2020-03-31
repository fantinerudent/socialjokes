import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Link,
  Toolbar,
  Typography,
  IconButton
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import UserContext from "../Contexts/UserContext";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  LinkButton: {
    marginRight: 20,
    cursor: "pointer"
  }
}));

const Header = () => {
  const classes = useStyles();
  const { pseudonymeContext, isLogged, setNewLoggedStatus } = useContext(UserContext);

  const handleClickSignOut = (event) => {
    setNewLoggedStatus(false);
  }


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
          
          <Typography  variant="h6" className={classes.title}>
            <Link href='/' style={{cursor: "pointer", color:"white", textDecoration: "none"}}>  Social Jokes </Link>
          </Typography>

          { !isLogged && (
            <>
              <Link
                className={classes.LinkButton}
                color="inherit"
                href="/login"
              >
                {" "}
                Login{" "}
              </Link>
              <Link
                color="inherit"
                className={classes.LinkButton}
                href="/register"
              >
                {" "}
                Register{" "}
              </Link>{" "}
            </>
          )}
          { isLogged && (
            <>
            <span style={{marginRight: '10px'}}> {pseudonymeContext} est connecté : </span>
            <Link
                className={classes.LinkButton}
                color="inherit"
                href="/"
                onClick={handleClickSignOut}
              >
                {" "}
                Sign-out{" "}
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
