import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import KanyeQuote from "../Components/KanyeQuote";
import ChuckNorrisFact from "../Components/ChuckNorrisFacts";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles({
  root: {
  }
});



const Home = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h1> HOME </h1>
      <KanyeQuote/>
      <ChuckNorrisFact/>
      <SimpleMenu/>
    </div>
  );
};

export default Home;




const SimpleMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Open Menu
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}