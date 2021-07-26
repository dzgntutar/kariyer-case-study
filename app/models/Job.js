const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("job", JobSchema);
