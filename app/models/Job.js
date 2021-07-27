const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobSchema = new Schema({
  company_id: String,
  position: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  deadline: {
    type: Number,
    default: Date.now() + 15 * 24 * 60 * 60 * 1000, //İlanın yayında kalma süresi yayınladığı tarihten 15 gün sonrası olarak kaydedilir.
  },
  quality: {
    type: Number,
  },
  sidebenefit: String,
  workingType: String,
  salary: String,
});

module.exports = mongoose.model("job", JobSchema);
