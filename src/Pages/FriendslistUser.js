import React, {useState, useContext} from 'react';
import Axios from 'axios';
import UserContext from "../Contexts/UserContext";

const FriendslistUser = () => {
    const { user, setUser, isAdmin } = useContext(UserContext);

    let friends;


    return (
        <div>cooucou</div>
      );
}
 
export default FriendslistUser;