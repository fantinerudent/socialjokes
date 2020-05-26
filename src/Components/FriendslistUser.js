import React, { useState, useContext, useEffect } from "react";
import Axios from "axios";
import UserContext from "../Contexts/UserContext";
import { makeStyles } from "@material-ui/core/styles";
// import SearchBar from "./SearchBar";
import CardFriends from "./CardFriends";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
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

  for (let i = 0; i < pendingFriends.length; i++) {
    let friendsRequestIreceived = [];
    let friendsRequestIsent = [];
    if (!pendingFriends[i].avatar || pendingFriends[i].avatar === "") {
      pendingFriends[i].avatar = "/uploads/unknown.png";
    }
    // if (!pendingFriends[i].myRequest) {
    //   friendsRequestIreceived.push(pendingFriends[i]);
    //   setFriendsRequestIreceived(friendsRequestIreceived);
    // } 
    // else {
    //   friendsRequestIsent.push(pendingFriends[i]);
    //   setFriendsRequestIsent(friendsRequestIsent);
    // }
  }

  return (
    <div className={classes.root}>
      <CardFriends listToDisplay={confirmedFriends} title={"my friends"} />
      <CardFriends
        listToDisplay={pendingFriends}
        title={"friends request I sent"}
      />
    </div>
  );
};

export default FriendslistUser;
