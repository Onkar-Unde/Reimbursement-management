const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// DB connect
mongoose.connect("mongodb://127.0.0.1:27017/reimbursement")
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});