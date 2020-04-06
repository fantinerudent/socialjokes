
const express = require("express"); 
const route = express.Router();
const MongoClient = require("mongodb").MongoClient;
// link to the database.
const uri =
  "mongodb+srv://frudent:toLi62tL7wdlali3@cluster0-3woch.mongodb.net/test?retryWrites=true&w=majority";

const response = {
    userData: {},
    isLogged: false,
    message: '',
    error: false,
    errorMessage: '',
}

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });


// Une route post login
route.post('/login', (req, res) => {
    response.userData = {
        pseudonyme: req.body.pseudonyme,
        password: req.body.password
    }
    //////////////// CONNEXION TO DATABASE : 
      client.connect((err, client) => {
          let DB = client.db("social_jokes");
          let collection = DB.collection("users");
          // first I check to see if a matching pseudonyme exists in the DB :
          collection.find({ pseudonyme : response.userData.pseudonyme }).toArray(function(err, result) {
            if (err) {
                  console.log(err);
              }
            if (!result.length) {
                response.errorMessage = 'user name incorrect';
                response.error = true;
                res.json(response);
            } else {
                const informationsUser = result[0];
                console.log('information user',informationsUser)
                if (response.userData.password === informationsUser.password) { 
                    response.message = " You are logged!"
                    response.error = false;
                    response.isLogged = true;
                    response.userData = {
                      pseudonyme: informationsUser.pseudonyme,
                      password: informationsUser.password,
                      name: informationsUser.name,
                      firstname: informationsUser.firstname,
                      gender: informationsUser.gender,
                      age: informationsUser.age,
                      email: informationsUser.email,
                    };
                    res.json(response)
                } else {
                    response.errorMessage = 'password incorrect';
                    response.error = true;
                    response.isLogged = false;
                    res.json(response);
                }
            }
          })
      })
})

route.post("/register", (req, res) => {
    response.userData = {
        pseudonyme: req.body.pseudonyme,
        password: req.body.password,
        email: req.body.email,
        name: req.body.name,
        firstname: req.body.firstname,
    }
    client.connect((err) => {
        if (err) {
          console.log(err)
        }
        let db = client.db("social_jokes");
        let collection = db.collection("users");
        collection
          .find({ pseudonyme: req.body.pseudonyme })
          .toArray(function(err, result) {
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
                    response.message = " You are logged!"
                    response.error = false;
                    response.isLogged = true;
                    res.json(response)
              });
            } else {
                response.errorMessage = "the username is already used"
                response.error = true;
                response.isLogged = false;
                res.json(response)
            }
          });
      });


})




module.exports = route;