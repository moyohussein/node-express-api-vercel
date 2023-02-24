const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "../config.env" });

const Db = process.env.ATLAS_URI || "";
const client = new MongoClient(Db);
const dbName = "new_db";

const connectToServer = async () => {
  try {
    await client.connect();
    console.log(`Connected to ${dbName} database`);
  } catch (err) {
    console.error(`Error connecting to database: ${err}`);
  }
}

module.exports = {
  connectToServer,
  getDb: function () {
    return client.db("new_db")
  },
};
