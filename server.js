
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors");
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'routes')));



const users = require('./routes/users');

// for every calls made to the /users, I want to use the file users.js .
app.use('/users', users)
// for every calls made to the /chat, I want to use the file chat.js .
// app.use('/chat', chat);


app.listen(process.env.PORT || 8080 , console.log(" --> serveur connecté au port 8080 <-- "));