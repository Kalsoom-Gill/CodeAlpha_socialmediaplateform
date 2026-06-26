const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "socialmedia",
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Database Connected");
  }
});

app.post("/register", (req, res) => {
  const { name, email } = req.body;

  db.query(
    "INSERT INTO users(name,email) VALUES (?,?)",
    [name, email],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send("User Registered");
      }
    },
  );
});

app.get("/posts", (req, res) => {
  db.query("SELECT * FROM posts ORDER BY id DESC", (err, result) => {
    res.json(result);
  });
});

app.post("/posts", (req, res) => {
  const { user_id, content } = req.body;

  db.query(
    "INSERT INTO posts(user_id,content) VALUES (?,?)",
    [user_id, content],
    (err, result) => {
      res.send("Post Added");
    },
  );
});

app.post("/comments", (req, res) => {
  const { post_id, comment } = req.body;

  db.query(
    "INSERT INTO comments(post_id,comment) VALUES (?,?)",
    [post_id, comment],
    (err, result) => {
      res.send("Comment Added");
    },
  );
});

app.post("/likes", (req, res) => {
  const { post_id } = req.body;

  db.query(
    "INSERT INTO likes(post_id) VALUES (?)",
    [post_id],
    (err, result) => {
      res.send("Liked");
    },
  );
});

app.post("/follow", (req, res) => {
  const { follower_id, following_id } = req.body;

  db.query(
    "INSERT INTO followers(follower_id,following_id) VALUES (?,?)",
    [follower_id, following_id],
    (err, result) => {
      res.send("Followed");
    },
  );
});

app.listen(3000, () => {
  console.log("Server Running on Port 3000");
});
