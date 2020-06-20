import React, { useContext} from "react";
import UserContext from "../Contexts/UserContext";
import MenuProfil from "../Components/MenuProfil";
import FriendslistAdmin from "../Components/FriendslistAdmin.js";
import FriendslistUser from "../Components/FriendslistUser";


const Friends = () => {
    const { isLogged, isAdmin } = useContext(UserContext);

    return ( 
        
        <div style={{display: 'flex'}}>
            <MenuProfil/>
            {(isAdmin && isLogged) && <FriendslistAdmin style={{display: 'flex'}}/>}
            {(!isAdmin && isLogged) && <FriendslistUser style={{display: 'flex'}} />}
        </div>
        
     );
}
 
export default Friends;