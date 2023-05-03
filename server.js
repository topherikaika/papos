const { MongoClient } = require("mongodb");
const express = require("express");
let db;
const app = express();

app.get("/", async (req, res) => {
  const allRecipes = db.collection("recipes").find().toArray();
  console.log("Welcome to the Homepage");
});

app.get("/admin", (req, res) => {
  res.send("Welcome to the Admin page");
});

async function start() {
  const client = new MongoClient();
  await client.connect();
  db = client.db();
  app.listen(3000);
}
start();
