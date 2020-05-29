import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Axios from 'axios';
import UserContext from "../Contexts/UserContext";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";

const useStyles = makeStyles((theme) => ({
  root: {},
  container: {
    borderRadius: 30,
    marginTop: 50,
    backgroundColor: "#d1c4e9",
    display: "flex",
    flexDirection: "row",
    position: "relative",
    top: "100px",
    left: 10,
    height: "fit-content",
  },
  img: {
    margin: 10,
    borderRadius: 30,
    width: 100,
    height: 100,
  },
  title: {
    color: "#bbdefb",
    fontSize: "1.2em",
    display: "flex",
    width: "fit-content",
    position: "absolute",
    left: "57%",
    top: "-70px",
  },
}));

const CardFriendsWithActions = ({ title, listToDisplay }) => {

    const { user } = useContext(UserContext);
  let allusers = listToDisplay;
  console.log(allusers);

  const handleClickCancel = (event, userToDelete) => {
    event.preventDefault();
  };
  const handleClickDone = (event, userToAdd) => {

    // TODO :  delete the one selected in front
    // for (let i=0; i < listToDisplay.length; i++) {
    //     if (listToDisplay[i].pseudonyme.includes(userToAdd)) {
    //         console.log("youpi match found")
    //     } else {
    //         console.log("nop")
    //     }
    // }
     
    let data = {
      mypseudonyme: user.pseudonyme,
      myavatar: user.avatar,
      userToAdd: userToAdd,
    };
    
    if (listToDisplay.length > 1) {
        Axios.post('/friends/friendslist/update', data).then((response) => {
            console.log(response)
        })
    }
  };

  const classes = useStyles();
  return (
    <div className={classes.container}>
      <p className={classes.title}> {title}</p>
      {listToDisplay &&
        listToDisplay.map((element) => (
          <div
            style={{
              width: "fit-content",
              display: "flex",
              flexDirection: "column",
            }}
            key={element.id}
          >
            <span style={{ alignSelf: "center" }}> {element.pseudonyme} </span>
            <span>
              <img
                src={element.avatar}
                className={classes.img}
                alt="my friend"
              />
            </span>
            <DoneOutlineIcon
              id={element.pseudonyme}
              onClick={(event) => {
                handleClickDone(event, element.pseudonyme);
              }}
            />
            <CancelOutlinedIcon
              id={element.pseudonyme}
              onClick={(event) => {
                handleClickCancel(event, element.pseudonyme);
              }}
            />
          </div>
        ))}
      {/* {messageToDisplay && <div> {messageToDisplay}</div>} */}
    </div>
  );
};

export default CardFriendsWithActions;
