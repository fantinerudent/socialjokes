import React, { useContext, useState } from "react";
import UserContext from "../Contexts/UserContext";
import MenuProfil from "../Components/MenuProfil";
import FriendslistAdmin from "../Components/FriendslistAdmin.js";
import FriendslistUser from "../Components/FriendslistUser";

const Friends = () => {
    const { isLogged, isAdmin } = useContext(UserContext);

    return ( 
        <div>
            <MenuProfil/>
            {(isAdmin && isLogged) && <FriendslistAdmin />}
            {(!isAdmin && isLogged) && <FriendslistUser />}

        </div>
     );
}
 
export default Friends;