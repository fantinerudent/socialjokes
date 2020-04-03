import React, { useContext } from "react";
import {Redirect} from "react-router-dom";
import UserContext from "../Contexts/UserContext";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange, deepPurple } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: "58vw",
    margin: "0 auto",
    minWidth: 275
  },
  userDataStyle: {
    fontWeight: "bolder"
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500]
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500]
  },
  information: {
    color: "blue"
  },
  title: {
    fontSize: 34
  },
  pos: {
    marginBottom: 12
  }
}));

const CardProfil = () => {
  const { localUserDataParsed, userData } = useContext(UserContext);
  const classes = useStyles();

  if (localUserDataParsed) {
    console.log("je suis connecté");
    const firstLetterPseudonyme = userData.pseudonymeContext.charAt(0);

    return (
      <Card className={classes.root}>
        <CardContent>
          <Avatar className={classes.orange}> {firstLetterPseudonyme}</Avatar>
          <ul className={classes.title}> MY PROFILE : </ul>
          <li>
            {" "}
            my pseudonyme :{" "}
            <span className={classes.userDataStyle}>
              {" "}
              {userData.pseudonymeContext}{" "}
            </span>{" "}
          </li>
          <li>
            {" "}
            my password :{" "}
            <span className={classes.userDataStyle}>
              {" "}
              {userData.passwordContext}{" "}
            </span>{" "}
          </li>
          <li>
            {" "}
            my first name :{" "}
            <span className={classes.userDataStyle}>
              {" "}
              {userData.firstnameContext}{" "}
            </span>{" "}
          </li>
          <li>
            {" "}
            my name :{" "}
            <span className={classes.userDataStyle}>
              {" "}
              {userData.nameContext}{" "}
            </span>{" "}
          </li>
          <li>
            {" "}
            my email adress :{" "}
            <span className={classes.userDataStyle}>
              {" "}
              {userData.emailContext}{" "}
            </span>{" "}
          </li>
          <li>
            {" "}
            my age :{" "}
            {userData.ageContext ? (
              <span className={classes.userDataStyle}>
                {" "}
                {userData.ageContext}{" "}
              </span>
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
            {userData.descriptionContext ? (
              <span className={classes.userDataStyle}>
                {" "}
                {userData.descriptionContext}{" "}
              </span>
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
            {userData.contactInformationsContext ? (
              <span className={classes.userDataStyle}>
                {" "}
                {userData.contactInformationsContext}{" "}
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
            {userData.favsContext ? (
              <span className={classes.userDataStyle}>
                {" "}
                {userData.favsContext}{" "}
              </span>
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
            {userData.genderContext ? (
              <span className={classes.userDataStyle}>
                {" "}
                {userData.genderContext}{" "}
              </span>
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
  }
   else {
       return(
           <Redirect to='/login'/>
       ) 
   }
};

export default CardProfil;
