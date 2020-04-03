import { createContext } from "react";


const userContext = {
  userData : {
    pseudonymeContext: null,
    nameContext: null,
    firstnameContext: null,
    passwordContext: null,
    ageContext: null,
    emailContext: null,
    descriptionContext: null,
    avatar: null,
    favsContext: null,
    setNewFavsContext: null,
    genderContext: null,
    contactInformationsContext: null,
    isLogged: false,
  },
  setNewUserData: () => {},
  setNewPseudonymeContext: () => {},
  setNewNameContext: () => {},
  setNewFirstnameContext: () => {},
  setNewPasswordContext: () => {},
  setNewAgeContext: () => {},
  setNewEmailContext : () => {},
  setNewDescriptionlContext : () => {},
  setNewGenderContext: () => {},
  setNewcontactInformationsContext: () => {},
  setNewLoggedStatus: () => {}
};

const UserContext = createContext(userContext);

export default UserContext;
