import React, { useState, useContext, useEffect } from "react";
import Axios from "axios";
import UserContext from "../Contexts/UserContext";

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


  // let friends;
  // const handleClick = (event) => {
  //   event.preventDefault();
  //   // console.log("clicked => ", pseudonyme);

  //   Axios.delete(`/users/delete/${user.pseudonyme}`)
  //     .then((response) => {
  //       setMessageToDisplay(response.data.message);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <>
    <div>
      {friends &&
        friends.map((element) => (
          <div
            style={{
              width: "fit-content",
              fontSize: "0.7em",
              border: "2px black solid",
              margin: 30,
              backgroundColor: "yellow",
            }}
            key={element.id}
          >
            <span> PSEUDONYME : {element.pseudonyme} </span>
            <span>
              {" "}
              AVATAR :{" "}
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
