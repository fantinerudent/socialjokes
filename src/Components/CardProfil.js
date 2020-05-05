import React, { useContext, useState } from "react";
import axios from "axios";
import UserContext from "../Contexts/UserContext";
import { makeStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange, deepPurple } from "@material-ui/core/colors";
import Favorites from "./userDetails/Favorites";
import Description from "./userDetails/Description";
import Age from "./userDetails/Age";
import Gender from "./userDetails/Gender";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    border: "solid #e0e0e0",
    marginLeft: "12vw",
    padding: 20,
    borderRadius: 30,
  },
  button: {
    marginLeft: "auto",
    marginRight: "auto",
    display: "block",
    border: "1px solid #bbdefb",
  },
  none: { display: "none" },
  label: {
    fontStyle: "oblique",
    marginBottom: 10,
    display: "table-caption",
    paddingLeft: 10,
  },
  newform: {
    backgroundColor: "#eceff1",
    padding: 20,
    borderRadius: 10,
  },
  userData: {
    fontWeight: "bolder",
    border: "solid 2px #bbdefb",
    backgroundColor: "white",
    borderRadius: 7,
    padding: 5,
    textAlign: "center",
    margin: 8,
    paddingRight: "7px",
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    height: 70,
    width: 70,
    left: "8vw",
    margin: "10px 0px 30px 0px",
  },
  information: {
    color: "blue",
  },
}));

const CardProfil = () => {
  const { user, setUser, isAdmin } = useContext(UserContext);
  let copyUser = user;
  console.log(isAdmin, 'is admin?')

  const firstLetterPseudonyme = user.pseudonyme.charAt(0);
  const classes = useStyles();
  const [newInformationAdded, setNewInformationAdded] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  let arrayOfFavorites = [];
  const [error, hasError] = useState(false);
  const [message, hasMessage] = useState(false);
  const [errorMessage, setNewMessageError] = useState();
  const [messageToShow, setMessageToShow] = useState();
  const [description, setDescription] = useState();
  const [buttonClicked, setButtonClicked] = useState(false);
  const [buttonSend, setButtonSend] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    copyUser.description = description;
    copyUser.favs = arrayOfFavorites;

    if (newInformationAdded) {
      if (copyUser) {
        setUser(copyUser);
        // working on the back part :
        axios
          .post("/users/userdetails", copyUser)
          .then((response) => {
            hasError(response.data.error);
            setNewMessageError(response.data.errorMessage);
            hasMessage(response.data.message);
            setMessageToShow(response.data.messageToShow);
            console.log(message);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    } else {
      console.log("nothing to add");
    }
  };

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
    setNewInformationAdded(true);
  };

  const handleChangeAge = (event) => {
    copyUser.age = event.target.value;
    setNewInformationAdded(true);
  };

  const handleCheckedFavs = (value) => {
    if (!arrayOfFavorites.includes(value)) {
      arrayOfFavorites.push(value);
      setNewInformationAdded(true);
    } else {
      let index = arrayOfFavorites.indexOf(value);
      arrayOfFavorites.splice(index, 1);
      setNewInformationAdded(true);
    }
  };

  const handleChangeGender = (event) => {
    event.preventDefault();
    copyUser.gender = event.target.value;
    setNewInformationAdded(true);
  };

  return (
    <div className={classes.root} style={{ backgroundColor: isAdmin ? 'blue' : 'grey', width: "50vw" }}>
      <div
        style={{
          display: "flex",
          width: "100%",
          alignContext: "stretch",
        }}
      ></div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Box style={{ width: "50%" }}>
          <Avatar className={classes.purple}> {firstLetterPseudonyme}</Avatar>
          <label className={classes.label}>
            Pseudonyme :
            <input
              type="text"
              disabled
              className={classes.userData}
              value={user.pseudonyme}
            />
          </label>
          <label className={classes.label}>
            Password :
            <input
              type="password"
              disabled
              className={classes.userData}
              value={user.password}
            />
          </label>
          <label className={classes.label}>
            My first name :
            <input
              type="text"
              disabled
              className={classes.userData}
              value={user.firstname}
            />
          </label>
          <label className={classes.label}>
            My last name :
            <input
              type="text"
              disabled
              className={classes.userData}
              value={user.name}
            />
          </label>
        </Box>
        <Box style={{ width: "50%" }} alignSelf="flex-end">
          <label className={classes.label}>
            My email adress :
            <input
              type="text"
              disabled
              className={classes.userData}
              value={user.email}
            />
          </label>
          <label className={classes.label}>
            My age :
            {user.age ? (
              <input
                type="text"
                disabled
                className={classes.userData}
                value={user.age}
              />
            ) : (
              <span className={classes.information}>
                you must enter this information
              </span>
            )}
          </label>
          <label className={classes.label}>
            My description :
            {user.description ? (
              <textarea
                type="text"
                rows="4"
                disabled
                className={classes.userData}
              >
                {user.description}
              </textarea>
            ) : (
              <span className={classes.information}>
                you must enter this information
              </span>
            )}
          </label>
          <label className={classes.label}>
            My favorite type of jokes :
            {user.favs ? (
              <input
                type="text"
                disabled
                className={classes.userData}
                value={user.favs}
              />
            ) : (
              <span className={classes.information}>you must your favs</span>
            )}
          </label>
          <label className={classes.label}>
            My gender :
            {user.gender ? (
              <input
                type="text"
                disabled
                className={classes.userData}
                value={user.gender}
              />
            ) : (
              <span className={classes.information}>
                my teachers said we need this informations but, I really don't
                know why.
              </span>
            )}
          </label>
        </Box>
      </div>
      <Box width="100%">
        <CardActions>
          {error && <span> {errorMessage} </span>}
          {message && <span> {messageToShow} </span>}
          {(!user.description || !user.favs || !user.age || !user.gender) &&
            !buttonClicked && (
              <Button
                className={classes.button}
                size="small"
                onClick={() => {
                  setOpenOptions(true);
                  setButtonClicked(true);
                }}
              >
                Update my informations
              </Button>
            )}
          {openOptions && (
            <form
              onSubmit={handleSubmit}
              className={classes.newform}
              autoComplete="off"
            >
              {!user.description && (
                <Description
                  handleChangeDescription={handleChangeDescription}
                />
              )}
              {!user.favs && (
                <Favorites handleCheckedFavs={handleCheckedFavs} />
              )}
              {!user.age && <Age handleChangeAge={handleChangeAge} />}
              {!user.gender && (
                <Gender handleChangeGender={handleChangeGender} />
              )}
              <Button
                className={buttonSend ? classes.none : classes.button}
                type="submit"
                onClick={() => {
                  setButtonSend(true);
                }}
              >
                {" "}
                send{" "}
              </Button>
            </form>
          )}
        </CardActions>
      </Box>
    </div>
  );
};

export default CardProfil;
