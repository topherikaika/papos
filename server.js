const { MongoClient } = require("mongodb");
const express = require("express");

const app = express();

app.get("/", async (req, res) => {
  console.log("Welcome to the Homepage");
});

app.get("/admin", (req, res) => {
  res.send("Welcome to the Admin page");
});

async function start() {
  const client = new MongoClient();
}
start();
