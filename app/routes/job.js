var express = require("express");
var router = express.Router();

const Job = require("../models/Job");

//const esClient = require("../esClient");
const { Client } = require("@elastic/elasticsearch");

router.get("/", function (req, res, next) {
  Job.find({}, function (err, jobs) {
    if (err) res.status(404).json({ message: err });
    res.status(200).json(jobs);
  });
});

router.post("/", function (req, res, next) {
  let newJob = new Job({
    company_id: req.body.company_id,
    position: req.body.position,
    description: req.body.description,
    quality: 5,
    sidebenefit: req.body.sidebenefit.join(", "),
    workingType: req.body.workingType,
    salary: req.body.salary,
  });

  newJob.save((error, data) => {
    if (error) res.status(400).json({ error: error });
    res.status(201).json(data);
  });
});

router.post("/objectionableword", async function (req, res, next) {
  const elasticUrl = process.env.ELASTIC_URL || "http://localhost:9200";
  const esclient = new Client({ node: elasticUrl });
  const index = "quotes";
  try {
    await esclient.indices.create({ index });
    console.log(
      "********************************************Created index duzgun"
    );
  } catch (err) {
    console.error(
      "******************************************An error occurred while creating the index"
    );
    console.error(err);
  }
});

module.exports = router;
