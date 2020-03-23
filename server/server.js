const express = require('express');
// const bodyParser = require('body-parser');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));


app.get('/', function (req, res) {
    res.send(" vous êtes sur la page home")
});

app.listen(process.env.PORT || 8080 , console.log(" --> serveur connecté au port 8080 <-- "));