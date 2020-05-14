import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import UserContext from "../Contexts/UserContext";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
    maxWidth: 100,
  },
  blue: {
    color: "white",
    backgroundColor: "#3f51b5",
    borderRadius: "10px",
  },
  link: {
    cursor: "pointer",
    textDecoration: "none",
    color: "white",
    display: "flex",
    marginTop: 10,
    marginBottom: 10,
  },
  icon: {
    marginLeft: 10,
  },
}));

const MenuProfil = () => {
  const { setIsLogged, isAdmin } = useContext(UserContext);
  let history = useHistory();

  let routeChange = (newpath) => {
    let path = newpath;
    history.push(path);
  };

  const classes = useStyles();
  return (
    <div>
      <List
        component="nav"
        className={classes.blue}
        aria-label="mailbox folders"
      >
        <ListItem button divider>
          <Link to="/friendslist" className={classes.link}>
            {isAdmin ? "Users" : "My friends list"}
            <PeopleOutlineIcon className={classes.icon} />
          </Link>
        </ListItem>
        <ListItem button divider>
          <Link to="/mywall" className={classes.link}>
            My Wall <PersonOutlineIcon style={{ marginLeft: 53 }} />
          </Link>
        </ListItem>
        <ListItem button divider>
          <Link className={classes.link} to="/inbox ">
            Inbox <MailOutlineIcon style={{ marginLeft: 70 }} />
          </Link>
        </ListItem>
        <ListItem
          button
          onClick={() => {
            setIsLogged(false);
            routeChange("/");
          }}
        >
          <ListItemText primary="Log-out" />
          <ExitToAppIcon />
        </ListItem>
      </List>
    </div>
  );
};

export default MenuProfil;
