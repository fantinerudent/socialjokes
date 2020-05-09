import React, { useState, useContext, useEffect } from "react";
import Axios from "axios";
import UserContext from "../Contexts/UserContext";

const FriendslistAdmin = () => {
  const { user, setUser, isAdmin, isLogged } = useContext(UserContext);
  const [friends, setFriendsList] = useState();
 console.log("is logged?", isLogged);

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
            style={{ width: "fit-content", backgroundColor: "yellow" }}
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
