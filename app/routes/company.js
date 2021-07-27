var express = require("express");
var router = express.Router();

const Company = require("../models/Company");

router.get("/", async function (req, res, next) {
  const companies = await GetAllCompany();
  res.status(200).json(companies);
});

router.post("/", async function (req, res, next) {
  const allCompaines = await GetAllCompany();
  const company = allCompaines.find((el) => el.phone == req.body.phone);

  if (!company) {
    const newCompany = new Company({
      phone: req.body.phone,
      name: req.body.name,
      address: req.body.address,
    });
    newCompany.save((error, data) => {
      //if (error) res.status(400).json(error);
      res.status(201).json(data);
    });
  } else {
    res.status(400).json({ message: "duplicate Data in db" });
  }
});

let GetAllCompany = () => {
  return new Promise((resolve) => {
    Company.find({}, function (err, companies) {
      resolve(companies);
    });
  });
};

module.exports = router;
