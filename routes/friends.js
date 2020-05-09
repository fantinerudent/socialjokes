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

route.get('/friendslistadmin', (req,res) => {
    client.connect((err)=> {
        if (err) {
            console.log(err)
        }
        let db = client.db("social_jokes");
        let collection = db.collection("users");
        collection.find().toArray((err,result) => {
            if(err){
                console.log(err)
            } else {
                return res.json(result);
            }
        });
    })
    // res.send()
})

module.exports = route;