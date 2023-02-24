const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../Db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

recordRoutes.route("/").get(async function (req, res) {
  res.send("Application running successfully")
});

recordRoutes.route("/record").get(async function (req, res) {
  let db_connect = dbo.getDb("new_db");
  const value = await db_connect.collection("record").find({}).toArray(
    function (err) {
      if (err) throw err;
    });
  res.send(value)
});

// This section will help you get a single record by id
recordRoutes.route("/record/:id").get(async function (req, res) {
  let db_connect = dbo.getDb("new_db");
  let myquery = { _id: ObjectId(req.params.id) };
  const value = await db_connect.collection("record").findOne(myquery, function (err) {
    if (err) throw err;
  });
  res.send(value)
});

// This section will help you create a new record.
recordRoutes.route("/record/add").post(async function (req, res) {
  let db_connect = dbo.getDb("new_db");
  let myobj = {
    name: req.body.name,
    position: req.body.position,
    level: req.body.level,
  };
  const value = await db_connect.collection("record").insertOne(myobj, function (err, res) {
    if (err) throw err;
  });
  res.send(value)
});

// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(async function (req, res) {
  let db_connect = dbo.getDb("new_db");
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    },
  };
  const value = await db_connect
    .collection("record")
    .updateOne(myquery, newvalues, function (err) {
      if (err) throw err;
      console.log("1 document updated");
    });
  res.send(value)
});

// This section will help you delete a record
recordRoutes.route("/:id").delete(async (req, res) => {
  let db_connect = dbo.getDb("new_db");
  let myquery = { _id: ObjectId(req.params.id) };
  const value = db_connect.collection("record").deleteOne(myquery, function (err) {
    if (err) throw err;
    console.log("1 document deleted");
  });
  res.send(value)
});

module.exports = recordRoutes;