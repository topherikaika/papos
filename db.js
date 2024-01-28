const dotenv = require("dotenv");
dotenv.config();
const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.CONNECTIONSTRING);

async function start() {
  await client.connect();
  module.exports = client;
  const app = require("./backend-api/app");
  app.listen(process.env.PORT);
}

start();
