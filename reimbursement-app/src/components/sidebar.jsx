import { useState } from "react";
import SubmitExpense from "../pages/Expense/SubmitExpense";
import ExpenseHistory from "../pages/Expense/ExpenseHistory";
import "../style/sidebar.css";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("history"); // default

  return (
    <div className="app-layout">

      {/* 🔷 Sidebar */}
      <div className="sidebar">
        <h2 className="logo">RB Management</h2>

        <div className="menu">
          <div
            className={`menu-item ${
              activeTab === "history" ? "active" : ""
            }`}
            onClick={() => setActiveTab("history")}
          >
            📊 Expense History
          </div>

          <div
            className={`menu-item ${
              activeTab === "form" ? "active" : ""
            }`}
            onClick={() => setActiveTab("form")}
          >
            ➕ Submit Expense
          </div>
        </div>
      </div>

      {/* 🔷 Main Content */}
      <div className="main-content">

        {/* Header */}
        <div className="header">
          <h1 className="header-title">
            {activeTab === "history"
              ? "Expense History"
              : "Submit Expense"}
          </h1>

          <span className="link-btn">Welcome 👋</span>
        </div>

        {/* Page Content */}
        <div className="content-area">
          {activeTab === "history" ? (
            <div className="card">
              <ExpenseHistory />
            </div>
          ) : (
            <div className="card">
              <SubmitExpense />
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Sidebar;