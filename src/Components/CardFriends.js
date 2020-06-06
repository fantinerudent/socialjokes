import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {},
  container: {
    borderRadius: 30,
    marginTop: 50,
    backgroundColor: "#bbdefb",
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

const CardFriends = ({ title, listToDisplay, message, confirmedFriends }) => {
  const handleClickWallRedirection = (pseudonyme) => {console.log("Je veux aller sur le mur de : " + pseudonyme)};
  console.log("list to display =>", listToDisplay);
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <p className={classes.title}> {title}</p>
      {message && <div> {message}</div>}
      {confirmedFriends &&
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
                onClick={() => {
                  handleClickWallRedirection(element.pseudonyme);
                }}
                src={element.avatar}
                className={classes.img}
                alt="my friend"
              />
            </span>
          </div>
        ))}
      {!confirmedFriends && listToDisplay &&
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
          </div>
        ))}
    </div>
  );
};

export default CardFriends;
