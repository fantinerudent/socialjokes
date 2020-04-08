import React, { useContext } from "react";
import UserContext from "../Contexts/UserContext";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange, deepPurple } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "58vw",
    margin: "0 auto",
    minWidth: 275,
  },
  userData: {
    fontWeight: "bolder",
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
  const { user  } = useContext(UserContext);

  const firstLetterPseudonyme = user.pseudonyme.charAt(0);
  console.log(firstLetterPseudonyme);

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Avatar className={classes.orange}> {firstLetterPseudonyme}</Avatar>
        <ul className={classes.title}> MY PROFILE : </ul>
        <li>
          {" "}
          my pseudonyme :{" "}
          <span className={classes.userData}> {user.pseudonyme} </span>{" "}
        </li>
        <li>
          {" "}
          my password :{" "}
          <span className={classes.userData}> {user.password} </span>{" "}
        </li>
        <li>
          {" "}
          my first name :{" "}
          <span className={classes.userData}> {user.firstname} </span>{" "}
        </li>
        <li>
          {" "}
          my name : <span className={classes.userData}>
            {" "}
            {user.namet}{" "}
          </span>{" "}
        </li>
        <li>
          {" "}
          my email adress :{" "}
          <span className={classes.userData}> {user.email} </span>{" "}
        </li>
        <li>
          {" "}
          my age :{" "}
          {user.age ? (
            <span className={classes.userData}> {user.age} </span>
          ) : (
            <span className={classes.information}>
              {" "}
              you must enter this information{" "}
            </span>
          )}
        </li>
        <li>
          {" "}
          my description :{" "}
          {user.description ? (
            <span className={classes.userData}> {user.description} </span>
          ) : (
            <span className={classes.information}>
              {" "}
              you must enter a description{" "}
            </span>
          )}
        </li>
        <li>
          {" "}
          my contact informations :{" "}
          {user.contactInformations ? (
            <span className={classes.userData}>
              {" "}
              {user.contactInformations}{" "}
            </span>
          ) : (
            <span className={classes.information}>
              {" "}
              you must enter your contact informations{" "}
            </span>
          )}
        </li>
        <li>
          {" "}
          my favs :{" "}
          {user.favs ? (
            <span className={classes.userData}> {user.favs} </span>
          ) : (
            <span className={classes.information}>
              {" "}
              you must enter your favs{" "}
            </span>
          )}
        </li>
        <li>
          {" "}
          my gender :{" "}
          {user.gender ? (
            <span className={classes.userData}> {user.gender} </span>
          ) : (
            <span className={classes.information}>
              {" "}
              my teachers said we need this informations but, I really don't
              know why.{" "}
            </span>
          )}
        </li>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default CardProfil;
