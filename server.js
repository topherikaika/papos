const { MongoClient } = require("mongodb");
const express = require("express");
let db;
const uri = "mongodb+srv://memorias:memorias123@cluster0.kohzkj0.mongodb.net/papos?retryWrites=true&w=majority&authSource=admin";
const app = express();
app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", async (req, res) => {
  const allRecipes = await db.collection("recipes").find().toArray();
  console.log(allRecipes);
  res.render("home", { allRecipes });
});

app.get("/admin", (req, res) => {
  res.render("admin");
});

async function start() {
  const cloud = new MongoClient(uri);
  await cloud.connect();
  db = cloud.db();
  app.listen(8080);
}
start();
