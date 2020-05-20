/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    position: "relative",
    left: "50%",
    transform: "perspective(1px) translateY(25%)",
    width: 400,
  },
  input: {
    display: "flex",
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 5,
  },
  containerUserToDisplay: {
    display: "flex",
    width: 'fit-content',
    backgroundColor: 'red',
    flexDirection: 'column',
    textAlign: 'center',
    margin:'0 auto',
  },
}));

const SearchBar = () => {
  const classes = useStyles();
  const [allUsers, setAllUsers] = useState([]);
  const [messageToDisplay, setMessageToDisplay] = useState();
  const [userToSearch, setUserToSearch] = useState();
  const [userToDisplay, setUserToDisplay] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("/friends/friendslist");
      setAllUsers(result.data);
    };
    fetchData();
  }, [messageToDisplay]);

  console.log(allUsers, "all users");

  const handleChange = (event) => {
    setUserToSearch(event.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userFound = async () => {
      const result = await axios.get(
        `/friends/friendslist/search/${userToSearch}`
      );
      if (!result.data.avatar || result.data.avatar === "") {
        result.data.avatar = "/uploads/unknown.png";
      }

      setUserToDisplay(result.data);
    };
    userFound();
  };

  return (
    <div>
      <Paper component="form" className={classes.root}>
        <InputBase
          onChange={handleChange}
          className={classes.input}
          placeholder="Search an user "
          inputProps={{ "aria-label": "search a new user" }}
        />
        <form
          type="submit"
          onSubmit={handleSubmit}
          className={classes.iconButton}
          aria-label="search"
        >
          <IconButton
            type="submit"
            className={classes.iconButton}
            aria-label="search"
          >
            <SearchIcon />{" "}
          </IconButton>
        </form>
      </Paper>
      {userToDisplay && (
        <>
        <div className={classes.containerUserToDisplay}>
        <span> result of your search :</span>
          {userToDisplay.pseudonyme}
          <img
            src={userToDisplay.avatar}
            style={{
              // marginLeft: 55,
              borderRadius: 30,
              width: 100,
              height: 100,
            }}
            alt="avatar user searched"
          />
        </div>
        </>
      )}
    </div>
  );
};

export default SearchBar;
