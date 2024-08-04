const express = require("express");
const fs = require("fs");
const { LocalStorage } = require("node-localstorage");
const localStorage = new LocalStorage("./scratch");
const routes = express.Router();

let s = false;
routes.get("/", (req, res) => {
  res.send(
    "<html><head><title>login send</title></head><body><form action='/login' method='GET'><button type='submit'>login</button></form></body></html"
  );
});
routes.get("/login", (req, res) => {
  res.send(
    "<html><head><title>login page</title></head><body><form action='/add' method='POST'><input type='text' name='username'><button type='submit'>login</button></form></body></html>"
  );
});
routes.post("/add", (req, res) => {
  let name = req.body.username;
  localStorage.setItem("username", name);
  res.redirect("/chat");
});
routes.get("/chat", (req, res) => {
  res.send(
    `<html><head><title>chat app</title></head><body><form action='/send' method='POST'><p>${
      s ? fs.readFileSync("chats.txt") : ""
    }
    </p><input type='text' name='chat'><button type='submit'>send</button></form></body></html>`
  );
});
routes.post("/send", (req, res) => {
  s = true;
  let string = `${localStorage.getItem("username")}:${req.body.chat}`;
  fs.appendFile("chats.txt", string, (err, data) => {
    if (err) {
      res.send(err);
      return;
    }
  });
  res.redirect("/chat");
});
module.exports = routes;
