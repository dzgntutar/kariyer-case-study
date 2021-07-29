var express = require("express");
var router = express.Router();

const Company = require("../models/Company");

router.get("/", async function (req, res, next) {
  const companies = await GetAllCompany();
  res.status(200).json(companies);
});

router.post("/", async function (req, res, next) {
  let phone = req.body.phone;
  if (phone) {
    Company.find({ phone }, function (err, company) {
      console.log(company);
      if (company && company.length > 0) {
        res
          .status(400)
          .json({ message: "Telefon numarası benzersiz olmalıdır." });
      } else {
        const newCompany = new Company({
          phone: req.body.phone,
          name: req.body.name,
          address: req.body.address,
        });
        newCompany.save((error, data) => {
          res.status(201).json(data);
        });
      }
    });
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
