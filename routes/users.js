
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
    errorMessage: ''
}


// Une route post login
route.post('/login', (req, res) => {
    response.userData = {
        pseudonyme: req.body.pseudonyme,
        password: req.body.password
    }
    //////////////// CONNECTION WITH DATABASE : 
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
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
                if (response.userData.password === informationsUser.password) { 
                    response.message = " You are logged!"
                    response.error = false;
                    response.isLogged = true;
                    res.json(response)
                } else {
                    response.errorMessage = 'password incorrect';
                    response.error = true;
                    res.json(response);
                }
            }
          })
      })
})

// une route post register
route.post('/register', (req, res) => {
    console.log(req, 'req')
    const userData = {
        pseudonyme: req.body.pseudonyme,
        password: req.body.password
    }
    res.send(console.log(userData, "useeeer data "))
})





module.exports = route;