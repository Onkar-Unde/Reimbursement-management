const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const axios = require("axios");

const User = require("../models/User");
const Company = require("../models/Company");


router.post("/signup", async (req, res) => {
  const { name, email, password, companyName, country } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

   
    const response = await axios.get(
      "https://restcountries.com/v3.1/all?fields=name,currencies"
    );

    const countryData = response.data.find(
      c => c.name.common.toLowerCase() === country.toLowerCase()
    );

    const currency = countryData && countryData.currencies
      ? Object.keys(countryData.currencies)[0]
      : "USD";

    
    const company = await Company.create({
      name: companyName,
      country,
      currency
    });


    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
      companyId: company._id
    });

    res.json({
      message: "Signup successful",
      user
    });

  } catch (err) {
    console.log("Signup Error:", err);
    res.status(500).json({
      message: "Signup error",
      error: err.message
    });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: "Wrong password" });
    }

    res.json({
      message: "Login successful",
      role: user.role
    });

  } catch (err) {
    console.log("Login Error:", err);
    res.status(500).json({
      message: "Login error",
      error: err.message
    });
  }
});

module.exports = router;