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

// route to get the list with ALL the users,
route.get("/friendslist", middlewares.isThisUserLogged, (req, res, next) => {
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
});

// route to get (data) the friends'users in DB
route.get(
  "/friendslist/:pseudonyme",
  middlewares.isThisUserLogged,
  (req, res, next) => {
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
        let response = {
          confirmedFriends: informationsUser.confirmedFriends,
          pendingFriends: informationsUser.pendingFriends,
        };
        res.json(response);
      });
    });
  }
);

// route to get the list of the users with exceptions :
route.post("/friendslist/except", (req, res, next) => {
  let pseudonyme = req.body.myPseudonyme;
  let arrayOfExceptions = [pseudonyme];

  for (let i = 0; i < req.body.pendingFriends.length; i++) {
    arrayOfExceptions.push(req.body.pendingFriends[i].pseudonyme);
  }
  for (let i = 0; i < req.body.confirmedFriends.length; i++) {
    arrayOfExceptions.push(req.body.confirmedFriends[i].pseudonyme);
  }
  client.connect((err) => {
    if (err) {
      console.log(err);
    }
    let db = client.db("social_jokes");
    let collection = db.collection("users");
    collection
      .find(
        {
          pseudonyme: {
            $nin: arrayOfExceptions,
          },
        },
        { pseudonyme: 1, avatar: 1, confirmedFriends: 1 }
      )
      .toArray((err, result) => {
        if (err) {
          console.log(err);
        }
        res.json(result);
      });
  });
});

// route to get (data) of the user searched
route.post("/friendslist/search", middlewares.isThisUserLogged, (req, res) => {
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
});

// route to update a friendslist with a new list. (add)
route.post("/friendslist/update", (req, res) => {
  let myPseudonyme = req.body.mypseudonyme;
  let myAvatar = req.body.myavatar;
  let userToAdd = req.body.userToAdd;
  client.connect((err) => {
    if (err) {
      console.log(err);
    }
    let db = client.db("social_jokes");
    let collection = db.collection("users");
    collection
      .findOneAndUpdate(
        {
          pseudonyme: myPseudonyme,
        },
        {
          $push: {
            pendingFriends: {
              pseudonyme: userToAdd,
              avatar: "",
              myRequest: true,
            },
          },
        }
      )
      .then((result) => {
        console.log(result.value);
      });
    collection
      .findOneAndUpdate(
        {
          pseudonyme: userToAdd,
        },
        {
          $push: {
            pendingFriends: {
              pseudonyme: myPseudonyme,
              avatar: myAvatar,
              myRequest: false,
            },
          },
        }
      )
      .then((result) => {
        console.log(result.value);
      });
    client.close();
  });
});

route.post("/friendslist/update/needconfirmation", (req, res) => {
  let myPseudonyme = req.body.mypseudonyme;
  let myAvatar = req.body.myavatar;
  let userToAdd = req.body.userToAdd;

  client.connect((err) => {
    if (err) {
      console.log(err);
    }
    let db = client.db("social_jokes");
    let collection = db.collection("users");
    collection
      .findOneAndUpdate(
        {
          pseudonyme: myPseudonyme,
        },
        {
          $push: {
            confirmedFriends: {
              pseudonyme: userToAdd,
              avatar: "",
              myRequest: true,
            },
          },
          $pull: {
            pendingFriends: { pseudonyme: userToAdd },
          },
        }
      )
      .then((result) => {
        console.log(result.value);
      });
    collection
      .findOneAndUpdate(
        {
          pseudonyme: userToAdd,
        },
        {
          $push: {
            confirmedFriends: {
              pseudonyme: myPseudonyme,
              avatar: myAvatar,
              myRequest: false,
            },
          },
          $pull: {
            pendingFriends: { pseudonyme: myPseudonyme },
          },
        }
      )
      .then((result) => {
        console.log(result.value);
      });
    client.close();
  });
});

route.post("/friendslist/update/delete/needconfirmation", (req, res) => {
  let myPseudonyme = req.body.mypseudonyme;
  let userToDelete = req.body.userToDelete;

  client.connect((err) => {
    if (err) {
      console.log(err);
    }
    let db = client.db("social_jokes");
    let collection = db.collection("users");
    collection
      .findOneAndUpdate(
        {
          pseudonyme: myPseudonyme,
        },
        {
          $pull: {
            pendingFriends: { pseudonyme: userToDelete },
          },
        }
      )
      .then((result) => {
        console.log(result.value);
      });
    collection
      .findOneAndUpdate(
        {
          pseudonyme: userToDelete,
        },
        {
          $pull: {
            pendingFriends: { pseudonyme: myPseudonyme },
          },
        }
      )
      .then((result) => {
        console.log(result.value);
      });
    client.close();
  });
});
// route to delete an user from a friendslist.

module.exports = route;
