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
    position:"relative",
    left:30,
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
      console.log(" result ", result);
      if (!result.data.confirmedFriends) {
        result.data.confirmedFriends=[];
      }
      if (!result.data.pendingFriends) {
        result.data.pendingFriends=[];
      }
      setConfirmedFriendsList(result.data.confirmedFriends);
      setPendingFriendsList(result.data.pendingFriends);
    };
    fetchData();
  }, [messageToDisplay]);

  console.log("pending friends", pendingFriends);

  if (confirmedFriends) {
    if (confirmedFriends.length > 0) {
      for (let i = 0; i < confirmedFriends.length; i++) {
        if (!confirmedFriends[i].avatar || confirmedFriends[i].avatar === "") {
          confirmedFriends[i].avatar = "/uploads/unknown.png";
        }
      }
    }

  }

  useEffect(() => {
    let friendsRequestIreceived = [];
    let friendsRequestIsent = [];
    if (pendingFriends.length > 0) {
      for (let i = 0; i < pendingFriends.length; i++) {
        if (!pendingFriends[i].avatar || pendingFriends[i].avatar === "") {
          pendingFriends[i].avatar = "/uploads/unknown.png";
        }
        if (!pendingFriends[i].myRequest) {
          friendsRequestIreceived.push(pendingFriends[i]);
        } else if (pendingFriends[i].myRequest) {
          friendsRequestIsent.push(pendingFriends[i]);
        }
        setFriendsRequestIsent(friendsRequestIsent);
        setFriendsRequestIreceived(friendsRequestIreceived);
      }
    }
  }, [pendingFriends]);

  return (
    <div className={classes.root}>
      <SearchBar
        confirmedFriends={confirmedFriends}
        pendingFriends={pendingFriends}
      />
      {confirmedFriends.length > 0 && (
        <CardFriends listToDisplay={confirmedFriends} title={"my friends"} confirmedFriends={true}/>
      )}
      {friendsRequestIreceived.length > 0 && (
        <CardFriendsWithActions
          title="Friends request"
          listToDisplay={friendsRequestIreceived}
          needConfirmation={true}
        />
      )}
      {friendsRequestIsent.length > 0 && (
        <CardFriends
          listToDisplay={friendsRequestIsent}
          title={"friends request I sent"}
        />
      )}
       {confirmedFriends.length === 0 && (
        <CardFriends
          message={"You don't have friend yet!"}
          title={"my friends"}
        />
      )}
      {friendsRequestIreceived.length === 0 && (
        <CardFriends message="No pending request"  title="Friends request"/>
      )}
      {friendsRequestIsent.length === 0 && (
        <CardFriends
          title={"friends request I sent"}
          message={"You didn't sent any invitation"}
        />
      )}
    </div>
  );
};

export default FriendslistUser;
