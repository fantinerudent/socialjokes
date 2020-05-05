import React, {useState, useContext} from 'react';
import Axios from 'axios';
import UserContext from "../Contexts/UserContext";

const FriendslistAdmin = () => {
    const { user, setUser, isAdmin } = useContext(UserContext);

    let friends;

    Axios.get('/friends/friendslistadmin', user.pseudonyme).then((response) => {
        console.log(response)
    })

    return (
        <div>cooucou je suis admin</div>
      );
}
 
export default FriendslistAdmin;