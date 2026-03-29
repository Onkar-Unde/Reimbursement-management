import { useState } from "react";
import SubmitExpense from "../pages/Expense/SubmitExpense";
import ExpenseHistory from "../pages/Expense/ExpenseHistory";
import AdminDashboard from "../modules/admin/pages/AdminDashboard";
import UserManagement from "../modules/admin/pages/UserManagement";
import CompanySettings from "../modules/admin/pages/CompanySettings";
import ApprovalRules from "../modules/admin/pages/ApprovalRules";
import { FiBarChart2, FiPlus, FiSettings, FiUsers, FiHome, FiCheck } from "react-icons/fi";
import "../style/sidebar.css";
import "../modules/admin/style/admin.css";

const Sidebar = () => {
  const [activeSection, setActiveSection] = useState("employee"); // "employee" or "admin"
  const [activeTab, setActiveTab] = useState("history"); // for employee section
  const [activeAdminTab, setActiveAdminTab] = useState("dashboard"); // for admin section

  const getMainTitle = () => {
    if (activeSection === "employee") {
      return activeTab === "history" ? "Expense History" : "Submit Expense";
    } else {
      switch (activeAdminTab) {
        case "dashboard":
          return "Admin Dashboard";
        case "users":
          return "User Management";
        case "company":
          return "Company Settings";
        case "rules":
          return "Approval Rules";
        default:
          return "Admin";
      }
    }
  };

  return (
    <div className="app-layout">
      {/* 🔷 Sidebar */}
      <div className="sidebar">
        <h2 className="logo">RB Management</h2>

        {/* Section Toggle */}
        <div style={{ marginBottom: "20px", borderBottom: "1px solid #333", paddingBottom: "15px" }}>
          <div
            className={`menu-item ${activeSection === "employee" ? "active" : ""}`}
            onClick={() => {
              setActiveSection("employee");
              setActiveTab("history");
            }}
          >
            <FiBarChart2 style={{ marginRight: "8px", display: "inline" }} /> Employee
          </div>
          <div
            className={`menu-item ${activeSection === "admin" ? "active" : ""}`}
            onClick={() => {
              setActiveSection("admin");
              setActiveAdminTab("dashboard");
            }}
          >
            <FiSettings style={{ marginRight: "8px", display: "inline" }} /> Admin
          </div>
        </div>

        {/* Employee Menu */}
        {activeSection === "employee" && (
          <div className="menu">
            <div
              className={`menu-item ${activeTab === "history" ? "active" : ""}`}
              onClick={() => setActiveTab("history")}
            >
              <FiBarChart2 style={{ marginRight: "8px", display: "inline" }} /> Expense History
            </div>

            <div
              className={`menu-item ${activeTab === "form" ? "active" : ""}`}
              onClick={() => setActiveTab("form")}
            >
              <FiPlus style={{ marginRight: "8px", display: "inline" }} /> Submit Expense
            </div>
          </div>
        )}

        {/* Admin Menu */}
        {activeSection === "admin" && (
          <div className="menu">
            <div
              className={`menu-item ${activeAdminTab === "dashboard" ? "active" : ""}`}
              onClick={() => setActiveAdminTab("dashboard")}
            >
              <FiBarChart2 style={{ marginRight: "8px", display: "inline" }} /> Dashboard
            </div>

            <div
              className={`menu-item ${activeAdminTab === "users" ? "active" : ""}`}
              onClick={() => setActiveAdminTab("users")}
            >
              <FiUsers style={{ marginRight: "8px", display: "inline" }} /> Users
            </div>

            <div
              className={`menu-item ${activeAdminTab === "company" ? "active" : ""}`}
              onClick={() => setActiveAdminTab("company")}
            >
              <FiHome style={{ marginRight: "8px", display: "inline" }} /> Company
            </div>

            <div
              className={`menu-item ${activeAdminTab === "rules" ? "active" : ""}`}
              onClick={() => setActiveAdminTab("rules")}
            >
              <FiCheck style={{ marginRight: "8px", display: "inline" }} /> Rules
            </div>
          </div>
        )}
      </div>

      {/* 🔷 Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <h1 className="header-title">{getMainTitle()}</h1>
          <span className="link-btn">Welcome 👋</span>
        </div>

        {/* Page Content */}
        <div className="content-area">
          {activeSection === "employee" ? (
            <div className="card">
              {activeTab === "history" ? <ExpenseHistory /> : <SubmitExpense />}
            </div>
          ) : (
            <div className="card">
              {activeAdminTab === "dashboard" && <AdminDashboard />}
              {activeAdminTab === "users" && <UserManagement />}
              {activeAdminTab === "company" && <CompanySettings />}
              {activeAdminTab === "rules" && <ApprovalRules />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;