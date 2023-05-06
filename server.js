const { MongoClient, ObjectId } = require("mongodb");
const express = require("express");
const uri = "mongodb+srv://memorias:memorias123@cluster0.kohzkj0.mongodb.net/papos?retryWrites=true&w=majority&authSource=admin";
const multer = require("multer");
const upload = multer();
const sanitizeHTML = require("sanitize-html");
const fse = require("fs-extra");
const sharp = require("sharp");
let db;
const path = require("path");

//when the app first launches make sure the public/uploaded-photos exists
fse.ensureDirSync(path.join("public", "uploaded-photos"));

const app = express();
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  const allRecipes = await db.collection("recipes").find().toArray();
  console.log(allRecipes);
  res.render("home", { allRecipes });
});

app.get("/admin", (req, res) => {
  res.render("admin");
});

app.get("/api/recipes", async (req, res) => {
  const allRecipes = await db.collection("recipes").find().toArray();
  res.json(allRecipes);
});

app.post("/create-recipe", upload.single("photo"), ourCleanup, async (req, res) => {
  if (req.file) {
    const photofilename = `${Date.now()}.jpg`;
    await sharp(req.file.buffer).resize(844, 456).jpeg({ quality: 60 }).toFile(path.join("public", "uploaded-photos", photofilename));
    req.cleanData.photo = photofilename;
  }
  console.log(req.body);
  const info = await db.collection("recipes").insertOne(req.cleanData);
  const newRecipe = await db.collection("recipes").findOne({ _id: new ObjectId(info.insertedId) });
  res.send(newRecipe);
});

app.delete("/recipe/:id", async (req, res) => {
  if (typeof req.params.id != "string") req.params.id = "";
  const doc = await db.collection("recipes").findOne({ _id: new ObjectId(req.params.id) });
  if (doc.photo) {
    fse.remove(path.join("public", "uploaded-photos", doc.photo));
  }
  db.collection("recipes").deleteOne({ _id: new ObjectId(req.params.id) });
  res.send("Removed");
});

app.post("/update-recipe", upload.single("photo"), ourCleanup, async (req, res) => {
  if (req.file) {
    //if uploading new photo
    const photofilename = `${Date.now()}.jpg`;
    await sharp(req.file.buffer).resize(844, 456).jpeg({ quality: 60 }).toFile(path.join("public", "uploaded-photos", photofilename));
    req.cleanData.photo = photofilename;
    const info = await db.collection("recipes").findOneAndUpdate({ _id: new ObjectId(req.body._id) }, { $set: req.cleanData });
    if (info.value.photo) {
      fse.remove(path.join("public", "uploaded-photos", info.value.photo));
    }
    res.send(photofilename);
  } else {
    //if not uploading photo
  }
});

function ourCleanup(req, res, next) {
  if (typeof req.body.name != "string") req.body.name = "";
  if (typeof req.body.type != "string") req.body.type = "";
  if (typeof req.body._id != "string") req.body._id = "";

  req.cleanData = {
    name: sanitizeHTML(req.body.name.trim(), { allowedTags: [], allowedAttributes: {} }),
    type: sanitizeHTML(req.body.type.trim(), { allowedTags: [], allowedAttributes: {} })
  };

  next();
}

async function start() {
  const cloud = new MongoClient(uri);
  await cloud.connect();
  db = cloud.db();
  app.listen(8080);
}
start();
