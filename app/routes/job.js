var express = require("express");
var router = express.Router();

const Job = require("../models/Job");

router.get("/", function (req, res, next) {
  const firstJob = new Job({
    name: "Kolera 2",
  });

  firstJob.save((error, data) => {
    if (error) console.log(error);
    res.json(data);
  });
});

module.exports = router;
