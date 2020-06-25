const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const expressSession = require("express-session");

const ONE_HOUR = 1000 * 60 * 60;
const SESSION_lifeTime = ONE_HOUR;

const session = {
  name: "sid",
  cookie: {
    maxAge: SESSION_lifeTime,
  },
  rolling: true,
  secret: "Alawaléguainbistouly",
  saveUninitialized: true,
  resave: false,
};

const publicPath = path.join(__dirname, "./client/public/");

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('./client/public/uploads', express.static("uploads"))

app.use(expressSession(session));

const users = require("./routes/users");
const friends = require("./routes/friends");

// for every calls made to the /users, I want to use the file users.js .
app.use("/users", users);
// for every calls made to the /chat, I want to use the file chat.js .
// TODO : 
// app.use('/chat', chat);
// for every calls made to the /friends, I want to use the file friends.js .
app.use("/friends", friends);

app.listen(
  process.env.PORT || 8080,
  console.log(" --> serveur connecté au port 8080 <-- ")
);
