/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import UserContext from "../Contexts/UserContext";
import CardFriendsWithAction from "./CardFriendsWithAction";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    position: "absolute",
    left: "40%",
    transform: "perspective(1px) translateY(25%)",
    width: 450,
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
    width: "fit-content",
    backgroundColor: "red",
    flexDirection: "column",
    textAlign: "center",
    margin: "0 auto",
  },
}));

const SearchBar = ({ confirmedFriends, pendingFriends }) => {
  const classes = useStyles();
  const [allUsers, setAllUsers] = useState([]);
  const [messageToDisplay, setMessageToDisplay] = useState();
  const [hasMessage, setHasMessage] = useState(true);
  const [userToSearch, setUserToSearch] = useState();
  const [userToDisplay, setUserToDisplay] = useState();
  const [arrayOfUsersToDisplay, setArrayOfUsersToDisplay] = useState([]);

  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("/friends/friendslist");
      setAllUsers(result.data);
    };
    fetchData();
  }, [messageToDisplay]);

  const handleChange = (event) => {
    setUserToSearch(event.currentTarget.value);
  };

  const data = {
    pseudonyme: userToSearch,
    myPseudonyme: user.pseudonyme,
    myAvatar: user.avatar,
    pendingFriends: pendingFriends,
    confirmedFriends: confirmedFriends,
  };

  if (user.avatar) {
    data.myAvatar = user.avatar;
  } else {
    data.myAvatar = "";
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userToSearch) {
      axios
        .post(`/friends/friendslist/search`, data)
        .then((response) => {
          console.log(response.data);
          setHasMessage(response.data.hasMessage);
          setMessageToDisplay(response.data.messageToDisplay);
          if (response.data.pseudonyme) {
            if (!response.data.avatar || response.data.avatar === "") {
              response.data.avatar = "/uploads/unknown.png";
              setUserToDisplay(response.data);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post("/friends/friendslist/except", data)
        .then((response) => {
          setArrayOfUsersToDisplay(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  for (let i = 0; i < arrayOfUsersToDisplay.length; i++) {
    if (
      !arrayOfUsersToDisplay[i].avatar ||
      arrayOfUsersToDisplay[i].avatar === ""
    ) {
      arrayOfUsersToDisplay[i].avatar = "/uploads/unknown.png";
    }
  }

  return (
    <div>
      <Paper component="form" className={classes.root}>
        <InputBase
          onChange={handleChange}
          className={classes.input}
          placeholder="Search an user or click the button to get the list"
          inputProps={{ "aria-label": "search a new user" }}
        />
        {hasMessage && (
          <span style={{ backgroundColor: "red", fontSize: "1em" }}>
            {messageToDisplay}
          </span>
        )}
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
            <SearchIcon />
          </IconButton>
        </form>
      </Paper>
      {arrayOfUsersToDisplay.length > 0 && (
        <CardFriendsWithAction
          title="all the users"
          listToDisplay={arrayOfUsersToDisplay}
        />
      )}
      {userToDisplay && (
        <>
          <div className={classes.containerUserToDisplay}>
            <span> {messageToDisplay} </span>
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
