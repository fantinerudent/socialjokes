import React, { useState, useContext, useEffect } from "react";
import Axios from "axios";
import UserContext from "../Contexts/UserContext";
import SearchBar from "./SearchBar";

const FriendslistUser = () => {
  const { user, setUser, isAdmin } = useContext(UserContext);
  const [friends, setFriendsList] = useState([]);
  const [messageToDisplay, setMessageToDisplay] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios.get(`/friends/friendslist/${user.pseudonyme}`);
      setFriendsList(result.data);
    };
    fetchData();
  }, [messageToDisplay]);

  for (let i = 0; i < friends.length; i++) {
    if (!friends[i].avatar || friends[i].avatar === "") {
      friends[i].avatar = '/uploads/unknown.png'
    }
  }


  return (
    <>
    <div> 
      {friends &&
        friends.map((element) => (
          <div
            style={{
              width: "fit-content",
              display: 'flex',
              flexDirection: 'column',
            }}
            key={element.id}
          >
            <span style={{alignSelf: 'center', marginLeft: 50}}> {element.pseudonyme} </span>
            <span>
              <img
                src={element.avatar}
                style={{
                  marginLeft: 55,
                  borderRadius: 30,
                  width: 100,
                  height: 100,
                }}
                alt="my friend"
              />
            </span>
          </div>
        ))}
      {messageToDisplay && <div> {messageToDisplay}</div>}
    </div>
    </>
  );
};

export default FriendslistUser;
