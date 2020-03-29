import React, {useContext} from 'react';
import UserContext from '../Contexts/UserContext';

const Profil = () => {
    const {pseudonymeContext, isLogged} = useContext(UserContext);

    return (  
    <div> *Hello {pseudonymeContext}!  </div>  
        
    ); 
}
 
export default Profil;