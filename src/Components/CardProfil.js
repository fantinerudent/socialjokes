import React, { useContext, useState } from "react";
import axios from "axios";
import UserContext from "../Contexts/UserContext";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange, deepPurple } from "@material-ui/core/colors";
import Favorites from "./userDetails/Favorites";
import Description from "./userDetails/Description";
import Age from "./userDetails/Age";
import Gender from "./userDetails/Gender";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "58vw",
    // position: "relative",  
    // left: '19vw',
    // top: '30px',  // margin: "0 auto",
    // minWidth: 275,
  },
  userData: {
    fontWeight: "bolder",
    textAlign: 'center',
    color: "darkblue",
    marginLeft: "10px",
    paddingRight: "7px",
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  information: {
    color: "blue",
  },
  title: {
    fontSize: 34,
  },
  pos: {
    marginBottom: 12,
  },
}));

const CardProfil = () => {
  const { user, setUser } = useContext(UserContext);
  let copyUser = user;

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

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log('array of favorites',arrayOfFavorites)
    copyUser.description = description;
    copyUser.favs = arrayOfFavorites;

    if (newInformationAdded) {
      if (copyUser) {
        setUser(copyUser);
        // working on the back part :
        axios
          .post("/users/userdetails", copyUser)
          .then((response) => {
            console.log(response);
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
    <Card className={classes.root}>
      <CardContent>
        <Avatar className={classes.purple}> {firstLetterPseudonyme}</Avatar>
        <ul className={classes.title}> MY PROFILE : </ul>
        <label style={{ display: "block" }}>
          Pseudonyme : 
          <input
            type="text"
            disabled
            className={classes.userData}
            value={user.pseudonyme}
          />
        </label>
        <label style={{ display: "block" }}>
          Password :
          <input
            type="text"
            disabled
            className={classes.userData}
            value={user.password}
          />
        </label>
        <label style={{ display: "block" }}>
           My first name :
          <input
            type="text"
            disabled
            className={classes.userData}
            value={user.firstname}
          />
        </label>
        <label style={{ display: "block" }}>
          Pseudonyme
          <input
            type="text"
            disabled
            className={classes.userData}
            value={user.pseudonyme}
          />
        </label>
        <li>
          my name : <span className={classes.userData}> {user.name} </span>
        </li>
        <li>
          my email adress :
          <span className={classes.userData}> {user.email} </span>
        </li>
        <li>
          my age :
          {user.age ? (
            <span className={classes.userData}> {user.age} </span>
          ) : (
            <span className={classes.information}>
              you must enter this information
            </span>
          )}
        </li>
        <li>
          my description :
          {user.description ? (
            <span className={classes.userData}> {user.description} </span>
          ) : (
            <span className={classes.information}>
              
              you must enter a description
            </span>
          )}
        </li>
        <li>
          my favs :
          {user.favs ? (
            <span className={classes.userData}>
              
              - {user.favs.map((x) => x + " - ")}
            </span>
          ) : (
            <span className={classes.information}>
              you must enter your favs
            </span>
          )}
        </li>
        <li>
          my gender :
          {user.gender ? (
            <span className={classes.userData}> {user.gender} </span>
          ) : (
            <span className={classes.information}>
              my teachers said we need this informations but, I really don't
              know why.
            </span>
          )}
        </li>
      </CardContent>
      <CardActions>
        {error && <span> {errorMessage} </span>}
        {message && <span> {messageToShow} </span>}
        {!user.description ||
          !user.favs ||
          !user.age ||
          (!user.gender && (
            <Button
              size="small"
              onClick={() => {
                setOpenOptions(true);
              }}
            >
              Update my informations
            </Button>
          ))}
        {openOptions && (
          <form onSubmit={handleSubmit} autoComplete="off">
            {!user.description && (
              <Description handleChangeDescription={handleChangeDescription} />
            )}
            {!user.favs && <Favorites handleCheckedFavs={handleCheckedFavs} />}
            {!user.age && <Age handleChangeAge={handleChangeAge} />}
            {!user.gender && <Gender handleChangeGender={handleChangeGender} />}
            <button type="submit"> send </button>
          </form>
        )}
      </CardActions>
    </Card>
  );
};

export default CardProfil;
