import { useState, useEffect } from "react";
import axios from "axios";
import Tesseract from "tesseract.js";
import "../../style/expense.css";

const SubmitExpense = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    amount: "",
    category: "",
    date: "",
    description: "",
    currency: "",
  });

  const [countries, setCountries] = useState([]);

  // 🌍 Fetch Countries
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all?fields=name,currencies")
      .then((res) => setCountries(res.data));
  }, []);

  // 🧾 Handle Input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🤖 OCR Function
  const handleOCR = async (file) => {
    const {
      data: { text },
    } = await Tesseract.recognize(file, "eng");

    console.log(text);

    const amountMatch = text.match(/(\d+\.\d{2})/);
    const dateMatch = text.match(/\d{2}\/\d{2}\/\d{4}/);

    setForm((prev) => ({
      ...prev,
      amount: amountMatch ? amountMatch[0] : "",
      date: dateMatch ? dateMatch[0] : "",
      description: text.slice(0, 50),
    }));
  };

  // 💱 Currency Conversion
  const convertCurrency = async (amount, base) => {
    if (!base) return amount;

    const res = await axios.get(
      `https://api.exchangerate-api.com/v4/latest/${base}`
    );

    return amount * res.data.rates.INR;
  };

  // 💾 Save
  const handleSave = async () => {
    const convertedAmount = await fetch("http://localhost:3000/api/expenses/add", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(newExpense)
});

    const newExpense = {
      ...form,
      id: Date.now(),
      amountINR: convertedAmount,
      status: "Pending",
    };

    const old = JSON.parse(localStorage.getItem("expenses")) || [];
    localStorage.setItem("expenses", JSON.stringify([...old, newExpense]));

    alert("Saved!");
  };

  return (
    <div>
      <h2 className="header-title">Submit Expense</h2>

      {/* OCR Upload */}
      <div style={{ marginTop: "20px" }}>
        <label className="label">Upload Receipt (OCR)</label>
        <input
          type="file"
          onChange={(e) => handleOCR(e.target.files[0])}
          className="input"
        />
      </div>

      {/* Name */}
      <div className="grid" style={{ marginTop: "20px" }}>
        <div>
          <label className="label">Last Name</label>
          <input name="lastName" onChange={handleChange} className="input" placeholder="Enter Last Name"/>
        </div>

        <div>
          <label className="label">First Name</label>
          <input name="firstName" onChange={handleChange} className="input" placeholder="Enter Name" />
        </div>
      </div>

      {/* Amount + Category */}
      <div className="grid" style={{ marginTop: "20px" }}>
        <div>
          <label className="label">Amount</label>
          <input
            name="amount"
            type="number"
            onChange={handleChange}
            className="input"
            placeholder="Enter Amount"
          />
        </div>

        <div>
          <label className="label">Category</label>
          <input name="category" onChange={handleChange} className="input" placeholder="Enter Catgery"/>
        </div>
      </div>

      {/* Country + Date */}
<div className="grid" style={{ marginTop: "20px" }}>
  <div>
    <label className="label">Country (Currency)</label>
    <select
      className="input"
      onChange={(e) =>
        setForm({ ...form, currency: e.target.value })
      }
    >
      <option>Select Country</option>
      {countries.map((c, i) => {
        const currency = c.currencies
          ? Object.keys(c.currencies)[0]
          : "";
        return (
          <option key={i} value={currency}>
            {c.name.common} ({currency})
          </option>
        );
      })}
    </select>
  </div>

  <div>
    <label className="label">Expense Date</label>
    <input
      name="date"
      type="date"
      onChange={handleChange}
      className="input"
    />
  </div>
</div>

{/* Description + Button */}
<div
  className="grid"
  style={{
    marginTop: "20px",
    alignItems: "end",
  }}
>
  <div>
    <label className="label">Description</label>
    <textarea
      name="description"
      onChange={handleChange}
      className="input textarea"
    />
  </div>

  <div style={{ display: "flex", justifyContent: "flex-end" }}>
    <button onClick={handleSave} className="save-btn">
      Save
    </button>
  </div>
</div>
    </div>
  );
};

export default SubmitExpense;