var express = require("express");
var router = express.Router();

const Company = require("../models/Company");
const Job = require("../models/Job");

//const { Client } = require("@elastic/elasticsearch");

router.get("/", function (req, res, next) {
  Job.find({}, function (err, jobs) {
    if (err) res.status(404).json({ message: err });
    res.status(200).json(jobs);
  });
});

router.post("/", function (req, res, next) {
  let job = req.body;
  Company.findById({ _id: job.company_id }, function (err, company) {
    if (company.jobCount > 0) {
      //company.jobCount -= 1;
      //company.save();

      console.log("****************************");
      console.log(job.sidebenefit.length);

      let jobQuality = 0;
      if (job.sidebenefit.length > 0) {
        jobQuality += 1;
      }
      if (job.workingType != undefined && job.workingType.length > 0)
        jobQuality += 1;
      if (job.salary != undefined && job.salary.length > 0) jobQuality += 1;
      if (job.description != undefined && job.description.length > 0) {
        //Sakıncalı kelime kontrolü yapılacak.. elastic search
      }

      let newJob = new Job({
        company_id: req.body.company_id,
        position: req.body.position,
        description: req.body.description,
        quality: jobQuality,
        sidebenefit: req.body.sidebenefit.join(", "),
        workingType: req.body.workingType,
        salary: req.body.salary,
      });

      newJob.save((error, data) => {
        if (error) res.status(400).json({ message: error });
        res.status(201).json(data);
      });
    } else {
      res.status(403).json({ message: "İlan hakkınız bitmiştir.." });
    }
  });
});

module.exports = router;
