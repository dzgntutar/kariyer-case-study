var express = require("express");
var router = express.Router();

const Job = require("../models/Job");

router.get("/", function (req, res, next) {});

async function createIndex(index) {
  try {
    await esclient.indices.create({ index });
    console.log(`Created index ${index}`);
  } catch (err) {
    console.error(`An error occurred while creating the index ${index}:`);
    console.error(err);
  }
}

module.exports = router;
