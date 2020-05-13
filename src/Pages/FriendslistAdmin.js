import React, { useState, useEffect } from "react";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import Axios from "axios";

const FriendslistAdmin = () => {
  const [friends, setFriendsList] = useState([]);
  const [messageToDisplay, setMessageToDisplay] = useState();
  let pseudonymeUserToDelete;

  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios.get("/friends/friendslistadmin");
      setFriendsList(result.data);
    };
    fetchData();
  }, [messageToDisplay]);

  const handleClick = (event, pseudonyme) => {
    event.preventDefault();
    console.log("clicked => ", pseudonyme);
    pseudonymeUserToDelete = pseudonyme;
    Axios.delete(`/friends/friendslistadmin/${pseudonymeUserToDelete}`)
      .then((response) => {
        setMessageToDisplay(response.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {friends &&
        friends.map((element) => (
          <div
            style={{
              width: "fit-content",
              fontSize:'0.7em',
              border: "2px black solid",
              margin: 30,
              backgroundColor: "yellow",
            }}
            key={element.id}
          >
            <span> PSEUDONYME : {element.pseudonyme} </span>
            <span> PASSWORD : {element.password} </span>
            <button
              id={element.pseudonyme}
              onClick={(event) => {
                handleClick(event, element.pseudonyme);
              }}
            >
              <DeleteSweepIcon />
            </button>
          </div>
        ))}
      {messageToDisplay && <div> {messageToDisplay}</div>}
    </div>
  );
};

export default FriendslistAdmin;
