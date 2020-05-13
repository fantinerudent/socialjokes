import React, { useState, useEffect } from "react";
import Axios from "axios";

const FriendslistAdmin = () => {
  const [friends, setFriendsList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios.get(
        "/friends/friendslistadmin",
      );
      setFriendsList(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      {friends &&
        friends.map((element) => (
          <div
            style={{ width: "fit-content", margin:30, backgroundColor: "yellow" }}
            key={element.id}
          >
            <span> PSEUDONYME : {element.pseudonyme} </span>
            <span> PASSWORD : {element.password} </span>
          </div>
        ))}
    </div>
  );
};

export default FriendslistAdmin;
