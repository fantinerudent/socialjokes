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

// router.post('/:userId/verify', isUserAuthenticated, (req, res, next) => {
route.get("/friendslistadmin", middlewares.isThisUserAdmin, (req, res, next) => {
    console.log('if I see this message, it means the back checkec if I was a administrator')
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

// route.delete('/friendslistadmin/:pseudonyme', middlewares.isThisUserAdmin, (req,res, next) => {
//   let pseudonyme = req.params.pseudonyme;
//   console.log('delete pseudo ',  pseudonyme)
//   client.connect((err) => {
//     let response = {};
//     if (err) {
//       console.log(err);
//     }
//     let db = client.db("social_jokes");
//     let collection = db.collection("users");
//     collection.deleteOne({pseudonyme: pseudonyme}).catch(err => {console.log(err)});
//     response.message = `the user ${pseudonyme} has been deleted`;
//     res.json(response);
//   })
// })

module.exports = route;