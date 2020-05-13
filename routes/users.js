// creator of a unique id;
const { v4: uuidv4 } = require("uuid");

// handling of the environnement
require("dotenv").config();

const express = require("express");
const route = express.Router();
const MongoClient = require("mongodb").MongoClient;

// link to the database.
const uri =
  "mongodb+srv://frudent:toLi62tL7wdlali3@cluster0-3woch.mongodb.net/test?retryWrites=true&w=majority";

// gestion of nodemailer to send an email with the new password
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD, // generated ethereal password
  },
});

let mailOptions = function (receiver, newPassword) {
  return {
    from: "assistance@socialjoke.fr",
    to: receiver,
    subject: "Your new password",
    text: "your new password to connect is : " + newPassword,
    html: "<p> your new password to connect is : " + newPassword + " </p>",
  };
};

const response = {
  userData: {},
  isLogged: false,
  message: "",
  error: false,
  errorMessage: "",
};

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Une route post login
route.post("/login", (req, res) => {

  response.userData = {
    pseudonyme: req.body.pseudonyme,
    password: req.body.password,
  };
  //////////////// CONNEXION TO DATABASE :
  client.connect((err, client) => {
    let DB = client.db("social_jokes");
    let collection = DB.collection("users");
    // first I check to see if a matching pseudonyme exists in the DB :
    collection
      .find({ pseudonyme: response.userData.pseudonyme })
      .toArray(function (err, result) {
        if (err) {
          console.log(err);
        }
        if (!result.length) {
          response.errorMessage = "user name incorrect";
          response.error = true;
          res.json(response);
        } else {
          const informationsUser = result[0];
          if (response.userData.password === informationsUser.password) {
            response.message = " You are logged!";
            response.error = false;
            response.isLogged = true;
            response.userData = {
              isAdministrator: informationsUser.administrator,
              pseudonyme: informationsUser.pseudonyme,
              password: informationsUser.password,
              favs: informationsUser.favs,
              description: informationsUser.description,
              name: informationsUser.name,
              firstname: informationsUser.firstname,
              gender: informationsUser.gender,
              age: informationsUser.age,
              email: informationsUser.email,
              isLogged : true,
            };
            req.session.userData= response.userData;
            console.log('req. session form loggin=> ', req.session)
            res.json(response);
          } else {
            response.errorMessage = "password incorrect";
            response.error = true;
            response.isLogged = false;
            res.json(response);
          }
        }
      });
  });
});

route.post("/register", (req, res) => {
  response.userData = {
    pseudonyme: req.body.pseudonyme,
    password: req.body.password,
    email: req.body.email,
    name: req.body.name,
    firstname: req.body.firstname,
  };
  client.connect((err) => {
    if (err) {
      console.log(err);
    }
    let db = client.db("social_jokes");
    let collection = db.collection("users");
    collection
      .find({ pseudonyme: req.body.pseudonyme })
      .toArray(function (err, result) {
        if (err) {
          console.log(err);
        }
        if (!result.length) {
          let insertion = {};
          insertion.pseudonyme = req.body.pseudonyme;
          insertion.password = req.body.password;
          insertion.email = req.body.email;
          insertion.name = req.body.name;
          insertion.firstname = req.body.firstname;
          collection.insertOne(insertion, (err, result) => {
            response.message = " You are logged!";
            response.error = false;
            response.isLogged = true;
            res.json(response);
          });
        } else {
          response.errorMessage = "the username is already used";
          response.error = true;
          response.isLogged = false;
          res.json(response);
        }
      });
  });
});

route.post("/userdetails", (req, res) => {
  let userDataAdding = {
    pseudonyme: req.body.pseudonyme,
  };
  if (req.body.age) {
    userDataAdding.age = parseInt(req.body.age);
  }
  if (req.body.description) {
    userDataAdding.description = req.body.description;
  }
  if (req.body.favs) {
    userDataAdding.favs = req.body.favs;
  }
  if (req.body.gender) {
    userDataAdding.gender = req.body.gender;
  }
  console.log(userDataAdding);
  response.userDataAdding = userDataAdding;
  client.connect((err) => {
    if (err) {
      console.log(err);
    }
    let db = client.db("social_jokes");
    let collection = db.collection("users");
    console.log("userDataAdding", userDataAdding);
    collection
      .findOneAndUpdate(
        { pseudonyme: req.body.pseudonyme },
        {
          $set: {
            age: userDataAdding.age,
            gender: userDataAdding.gender,
            description: userDataAdding.description,
            favs: userDataAdding.favs,
          },
        }
      )
      .then((result) => {
        if (!result.value) {
          console.log("profile not updated");
          response.errorMessage = "something went wrong";
          response.error = true;
          res.json(response);
        } else {
          console.log("update ok!");
          response.error = false;
          response.message = true;
          response.messageToShow = " Your profile has been updated ! ";
          res.json(response);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

route.post("/passwordforgotten", (req, res) => {
  response.userData = {
    email: req.body.email,
  };
  client.connect((err) => {
    let newPassword = uuidv4();
    if (err) {
      console.log(err);
    }
    let db = client.db("social_jokes");
    let collection = db.collection("users");
    collection
      .findOneAndUpdate(
        { email: req.body.email },
        {
          $set: {
            password: newPassword,
          },
        }
      )
      .then((result) => {
        console.log("result", result.value);
        if (!result.value) {
          response.errorMessage = "email adress incorrect";
          response.error = true;
          res.json(response);
        } else {
          response.messageToShow =
            "An email has been send to your email adress with your new password.";
          response.error = false;
          response.message = true;
          response.mailSent = true;
          res.json(response);
          transporter.sendMail(
            mailOptions(req.body.email, newPassword),
            function (err, data) {
              if (err) {
                console.log(err);
              } else {
                console.log("email sent");
              }
            }
          );
        }
      });
  });
});

module.exports = route;
