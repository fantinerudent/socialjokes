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
  "/friendslistadmin",
  middlewares.isThisUserAdmin,
  (req, res, next) => {
    console.log(
      "if I see this message, it means the back checkec if I was a administrator"
    );
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
  middlewares.isThisUserLogged,
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
      collection
        .find({ pseudonyme: pseudonyme })
        .toArray((err, result) => {
          if (err) {
            console.log(err);
          }
          const informationsUser = result[0];
          let response =  informationsUser.friends;
          res.json(response)
        });
    });
  }
);

// route to update a friendslist with a new list. (add)
// route to delete an user from a friendslist.

module.exports = route;
