import React from "react";
import CardProfil from "../Components/CardProfil";
import MenuProfil from '../Components/MenuProfil';
// import UserContext from '../Contexts/UserContext';

const Profil = () => {

  return (
    <div style={{display:'flex'}}>
      <MenuProfil />
      <CardProfil />
    </div>
  );
};

export default Profil;
