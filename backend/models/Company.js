const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: String,
  country: String,
  currency: String
});

module.exports = mongoose.model("Company", companySchema);