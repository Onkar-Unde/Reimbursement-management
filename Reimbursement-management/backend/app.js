const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});