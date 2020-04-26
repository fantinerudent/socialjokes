import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
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
}));

const MenuProfil = () => {
  const { setIsLogged } = useContext(UserContext);
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
        <ListItem
          button
          divider
          onClick={() => {
            routeChange("/mywall");
          }}
        >
          <ListItemText primary="My wall" /> <PersonOutlineIcon />
        </ListItem>
        <Divider />
        <ListItem
          button
          onClick={() => {
            setIsLogged(false);
            routeChange("/friendslist");
          }}
        >
          <ListItemText primary="My friends list"/> <PeopleOutlineIcon style={{marginLeft:10}} />
        </ListItem>
        <Divider />
        <ListItem
          button
          divider
          onClick={() => {
            routeChange("/inbox");
          }}
        >
          <ListItemText primary="Inbox" />
          <MailOutlineIcon />
        </ListItem>
        <ListItem
          button
          onClick={() => {
            setIsLogged(false);
            routeChange("/");
          }}
        >
          <ListItemText primary='Log-out'/> 
          <ExitToAppIcon />
        </ListItem>
      </List>
    </div>
  );
};

export default MenuProfil;