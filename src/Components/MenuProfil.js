import React, {useContext} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import UserContext from '../Contexts/UserContext'


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    maxWidth: 100,
    // position: "absolute",
  },
}));

const MenuProfil = () => {
    const { setIsLogged } = useContext(UserContext);
    let history = useHistory();

    let routeChange = (newpath) => {
        let path = newpath;
        history.push(path)
    }

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <List
        component="nav"
        className={classes.root}
        aria-label="mailbox folders"
      >
        <ListItem button divider onClick={() => {routeChange('/mywall')}}>
          <ListItemText primary="My wall" />
        </ListItem>
        <Divider />
        <ListItem button divider onClick={() => {routeChange('/inbox')}} >
          <ListItemText primary="Inbox" />
        </ListItem>
        <ListItem button  onClick={() => {routeChange('/')}} >
          <ListItemText primary="log-out" style={{color:'red'}} onClick={() => {setIsLogged(false)}} />
        </ListItem>
        <Divider light />
      </List>

    </div>
  );
};

export default MenuProfil;

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: '100%',
//     maxWidth: 360,
//     backgroundColor: theme.palette.background.paper,
//   },
// }));

// export default function ListDividers() {
//   const classes = useStyles();

//   return (

//   );
// }
