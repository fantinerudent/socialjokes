const middlewares = require("./middlewares");
const express = require("express");
const route = express.Router();
const MongoClient = require("mongodb").MongoClient;
// link to the database.
const uri =
  "mongodb+srv://frudent:toLi62tL7wdlali3@cluster0-3woch.mongodb.net/test?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

route.get(
  "/friendslist",
  // middlewares.isThisUserLogged,
  (req, res, next) => {
    client.connect((err) => {
      if (err) {
        console.log(err);
      }
      let db = client.db("social_jokes");
      let collection = db.collection("users");
      collection.find().toArray((err, result) => {
        if (err) {
          console.log(err);
        } else {
          return res.json(result);
        }
      });
    });
  }
);

// route to get (data) the friends'users in DB
route.get(
  "/friendslist/:pseudonyme",
  // middlewares.isThisUserLogged,
  (req, res, next) => {
    console.log(
      "if I see this message, it means the back checked that the user is logged"
    );
    let pseudonyme = req.params.pseudonyme;
    client.connect((err) => {
      if (err) {
        console.log(err);
      }
      let db = client.db("social_jokes");
      let collection = db.collection("users");
      collection.find({ pseudonyme: pseudonyme }).toArray((err, result) => {
        if (err) {
          console.log(err);
        }
        const informationsUser = result[0];
        let response ={
          confirmedFriends: informationsUser.confirmedFriends,
          pendingFriends: informationsUser.pendingFriends,
        } 
        res.json(response);
      });
    });
  }
);

// route to get (data) of the user searched
route.post(
  "/friendslist/search",
  // middlewares.isThisUserLogged,
  (req, res, next) => {
    let pseudonyme = req.body.pseudonyme;
    client.connect((err) => {
      if (err) {
        console.log(err);
      }
      let db = client.db("social_jokes");
      let collection = db.collection("users");
      collection.find({ pseudonyme: pseudonyme }).toArray((err, result) => {
        if (err) {
          console.log(err);
        }
        if (!result.length) {
          let response = {
            hasMessage: true,
            messageToDisplay: `No user found`,
          };
          res.json(response);
          client.close();
        } else {
          const informationsUser = result[0];
          let response = {
            hasMessage: true,
            messageToDisplay: "Your result :",
            pseudonyme: informationsUser.pseudonyme,
            avatar: informationsUser.avatar,
          };
          res.json(response);
        }
      });
    });
  }
);

// route to update a friendslist with a new list. (add)
// route to delete an user from a friendslist.

module.exports = route;
