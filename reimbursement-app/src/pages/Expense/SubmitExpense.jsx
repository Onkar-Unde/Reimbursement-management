import { useState } from "react";
import "../../style/expense.css";

const ExpenseFormPage = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    amount: "",
    category: "",
    date: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log(form);
    alert("Saved!");
  };

  return (
    <div className="page-bg">

      {/* Header */}
      <div className="header">
        <h1 className="header-title">Expense Submission</h1>

        <div className="header-actions">
          <span className="link-btn">Save & Add More</span>

          <button onClick={handleSave} className="save-btn">
            Save
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="form-container">
        <div className="form-card">

          {/* Name */}
          <div className="grid">
            <div>
              <label className="label">Last Name</label>
              <input name="lastName" onChange={handleChange} className="input" />
            </div>

            <div>
              <label className="label">First Name</label>
              <input name="firstName" onChange={handleChange} className="input" />
            </div>
          </div>

          {/* Amount + Category */}
          <div className="grid" style={{ marginTop: "20px" }}>
            <div>
              <label className="label">Amount</label>
              <input name="amount" type="number" onChange={handleChange} className="input" />
            </div>

            <div>
              <label className="label">Category</label>
              <input name="category" onChange={handleChange} className="input" />
            </div>
          </div>

          {/* Date */}
          <div style={{ marginTop: "20px" }}>
            <label className="label">Expense Date</label>
            <input name="date" type="date" onChange={handleChange} className="input full" />
          </div>

          {/* Description */}
          <div style={{ marginTop: "20px" }}>
            <label className="label">Description</label>
            <textarea
              name="description"
              onChange={handleChange}
              className="input textarea"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default ExpenseFormPage;