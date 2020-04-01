import { createContext } from "react";


const userContext = {
  pseudonymeContext: null,
  setNewPseudonymeContext: () => {},
  nameContext: null,
  setNewNameContext: () => {},
  firstnameContext: null,
  setNewFirstnameContext: () => {},
  passwordContext: null,
  setNewPasswordContext: () => {},
  ageContext: null,
  setNewAgeContext: () => {},
  emailContext: null,
  setNewEmailContext : () => {},
  descriptionContext: null,
  setNewDescriptionlContext : () => {},
  avatar: null,
  favsContext: null,
  setNewFavsContext: null,
  genderContext: null,
  setNewGenderContext: () => {},
  contactInformationsContext: null,
  setNewcontactInformationsContext: () => {},
  isLogged: false,
  setNewLoggedStatus: () => {}
};

const UserContext = createContext(userContext);

export default UserContext;
