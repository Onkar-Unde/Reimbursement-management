import { useState } from "react";
import SubmitExpense from "../pages/Expense/SubmitExpense";
import ExpenseHistory from "../pages/Expense/ExpenseHistory";
import AdminDashboard from "../modules/admin/pages/AdminDashboard";
import UserManagement from "../modules/admin/pages/UserManagement";
import CompanySettings from "../modules/admin/pages/CompanySettings";
import ApprovalRules from "../modules/admin/pages/ApprovalRules";

import {
  FiBarChart2,
  FiPlus,
  FiSettings,
  FiUsers,
  FiHome,
  FiCheck,
  FiLogOut
} from "react-icons/fi";

import "../style/sidebar.css";

const Sidebar = () => {
  // Default admin user
  const [user, setUser] = useState({ name: "Admin", role: "admin" });

  // Active section and tabs
  const [activeSection, setActiveSection] = useState("admin"); // admin by default
  const [activeTab, setActiveTab] = useState("history"); // employee tabs
  const [activeAdminTab, setActiveAdminTab] = useState("dashboard"); // admin tab

  // Logout function
  const logout = () => {
    setUser(null);
    setActiveSection("employee");
    setActiveTab("history");
    setActiveAdminTab("dashboard");
  };

  // Get header title based on current section/tab
  const getMainTitle = () => {
    if (!user) return "RB Management";

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

        {user && (
          <>
            {/* 👤 USER INFO */}
            <div style={{ marginBottom: "20px" }}>
              <div className="menu-item active">Welcome, {user.name} 👋</div>
              <div className="menu-item" onClick={logout}>
                <FiLogOut style={{ marginRight: "8px" }} />
                Logout
              </div>
            </div>

            {/* Section Toggle */}
            <div style={{ borderBottom: "1px solid #333", paddingBottom: "15px" }}>
              <div
                className={`menu-item ${activeSection === "employee" ? "active" : ""}`}
                onClick={() => {
                  setActiveSection("employee");
                  setActiveTab("history");
                }}
              >
                <FiBarChart2 /> Employee
              </div>

              <div
                className={`menu-item ${activeSection === "admin" ? "active" : ""}`}
                onClick={() => {
                  setActiveSection("admin");
                  setActiveAdminTab("dashboard");
                }}
              >
                <FiSettings /> Admin
              </div>
            </div>

            {/* Employee Menu */}
            {activeSection === "employee" && (
              <div className="menu">
                <div
                  className={`menu-item ${activeTab === "history" ? "active" : ""}`}
                  onClick={() => setActiveTab("history")}
                >
                  <FiBarChart2 /> History
                </div>
                <div
                  className={`menu-item ${activeTab === "form" ? "active" : ""}`}
                  onClick={() => setActiveTab("form")}
                >
                  <FiPlus /> Submit
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
                  <FiBarChart2 /> Dashboard
                </div>
                <div
                  className={`menu-item ${activeAdminTab === "users" ? "active" : ""}`}
                  onClick={() => setActiveAdminTab("users")}
                >
                  <FiUsers /> Users
                </div>
                <div
                  className={`menu-item ${activeAdminTab === "company" ? "active" : ""}`}
                  onClick={() => setActiveAdminTab("company")}
                >
                  <FiHome /> Company
                </div>
                <div
                  className={`menu-item ${activeAdminTab === "rules" ? "active" : ""}`}
                  onClick={() => setActiveAdminTab("rules")}
                >
                  <FiCheck /> Rules
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* 🔷 Main Content */}
      <div className="main-content">
        <div className="header">
          <h1 className="header-title">{getMainTitle()}</h1>
          {user && <span className="link-btn">👤 {user.name}</span>}
        </div>

        <div className="content-area">
          {user ? (
            activeSection === "employee" ? (
              activeTab === "history" ? <ExpenseHistory /> : <SubmitExpense />
            ) : (
              <>
                {activeAdminTab === "dashboard" && <AdminDashboard />}
                {activeAdminTab === "users" && <UserManagement />}
                {activeAdminTab === "company" && <CompanySettings />}
                {activeAdminTab === "rules" && <ApprovalRules />}
              </>
            )
          ) : (
            <div>Please Login</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;