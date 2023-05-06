const { MongoClient } = require("mongodb");
const express = require("express");
let db;
const uri = "mongodb+srv://memorias:memorias123@cluster0.kohzkj0.mongodb.net/papos?retryWrites=true&w=majority&authSource=admin";
const app = express();

app.get("/", async (req, res) => {
  const allRecipes = await db.collection("recipes").find().toArray();
  console.log(allRecipes);
  res.send(`<h1>Benvido a paxina principal</h1> ${allRecipes.map(recipe => `<p>${recipe.name} - ${recipe.type}</p>`).join("")}`);
});

app.get("/admin", (req, res) => {
  res.send("Welcome to the Admin page");
});

async function start() {
  const cloud = new MongoClient(uri);
  await cloud.connect();
  db = cloud.db();
  app.listen(8080);
}
start();
