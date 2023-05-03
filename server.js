const { MongoClient } = require("mongodb");
const express = require("express");
let db;
const uri = "mongodb+srv://memorias:memorias123@cluster0.kohzkj0.mongodb.net/papos?retryWrites=true&w=majority";
const app = express();

app.get("/", async (req, res) => {
  const allRecipes = await db.collection("recipes").find().toArray();
  console.log(allRecipes);
  res.send("Welcome to the Homepage");
});

app.get("/admin", (req, res) => {
  res.send("Welcome to the Admin page");
});

async function start() {
  const client = new MongoClient(uri);
  await client.connect();
  db = client.db();
  app.listen(8080);
}
start();
