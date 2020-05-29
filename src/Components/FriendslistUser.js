import React, { useState, useContext, useEffect } from "react";
import Axios from "axios";
import UserContext from "../Contexts/UserContext";
import { makeStyles } from "@material-ui/core/styles";
import SearchBar from "./SearchBar";
import CardFriends from "./CardFriends";
import CardFriendsWithActions from "./CardFriendsWithAction";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  container: {
    borderRadius: 30,
    marginTop: 50,
    backgroundColor: "#bbdefb",
    display: "flex",
    flexDirection: "row",
    position: "relative",
    top: "100px",
    left: 10,
    height: "fit-content",
  },
  img: {
    margin: 10,
    borderRadius: 30,
    width: 100,
    height: 100,
  },
  title: {
    color: "#bbdefb",
    fontSize: "1.2em",
    display: "flex",
    width: "fit-content",
    position: "relative",
    left: "57%",
    top: "150px",
  },
}));

const FriendslistUser = () => {
  const { user, setUser, isAdmin } = useContext(UserContext);
  const [confirmedFriends, setConfirmedFriendsList] = useState([]);
  const [pendingFriends, setPendingFriendsList] = useState([]);
  const [friendsRequestIreceived, setFriendsRequestIreceived] = useState([]);
  const [friendsRequestIsent, setFriendsRequestIsent] = useState([]);
  const [messageToDisplay, setMessageToDisplay] = useState();
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios.get(`/friends/friendslist/${user.pseudonyme}`);
      setConfirmedFriendsList(result.data.confirmedFriends);
      setPendingFriendsList(result.data.pendingFriends);
    };
    fetchData();
  }, [messageToDisplay]);

  for (let i = 0; i < confirmedFriends.length; i++) {
    if (!confirmedFriends[i].avatar || confirmedFriends[i].avatar === "") {
      confirmedFriends[i].avatar = "/uploads/unknown.png";
    }
  }

  useEffect(() => {
    for (let i = 0; i < pendingFriends.length; i++) {
      let friendsRequestIreceived = [];
      let friendsRequestIsent = [];
      if (!pendingFriends[i].avatar || pendingFriends[i].avatar === "") {
        pendingFriends[i].avatar = "/uploads/unknown.png";
      }
      if (!pendingFriends[i].myRequest) {
        friendsRequestIreceived.push(pendingFriends[i]);
        setFriendsRequestIreceived(friendsRequestIreceived);
      } else if (pendingFriends[i].myRequest) {
        friendsRequestIsent.push(pendingFriends[i]);
        setFriendsRequestIsent(friendsRequestIsent);
      }
    }
  }, [pendingFriends]);

  return (
    <div className={classes.root}>
      <SearchBar
        confirmedFriends={confirmedFriends}
        pendingFriends={pendingFriends}
      />
      {confirmedFriends && (
        <CardFriends listToDisplay={confirmedFriends} title={"my friends"} />
      )}
      {friendsRequestIreceived && (
        <CardFriendsWithActions
          title="Friends request"
          listToDisplay={friendsRequestIreceived}
        />
      )}
      {friendsRequestIsent && (
        <CardFriends
          listToDisplay={friendsRequestIsent}
          title={"friends request I sent"}
        />
      )}
    </div>
  );
};

export default FriendslistUser;
