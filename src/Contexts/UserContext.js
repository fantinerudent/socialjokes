import {createContext} from 'react';


const userContext = {
    pseudonymeContext: null,
    setNewPseudonymecontext: ()=>{},
    isLogged: false,
    setNewLoggedStatus: () => {},
}



const UserContext = createContext(userContext);

export default UserContext;
