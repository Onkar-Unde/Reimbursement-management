import { useState, useEffect } from "react";
import SubmitExpense from "../pages/Expense/SubmitExpense";
import ExpenseHistory from "../pages/Expense/ExpenseHistory";
import AdminDashboard from "../modules/admin/pages/AdminDashboard";
import UserManagement from "../modules/admin/pages/UserManagement";
import CompanySettings from "../modules/admin/pages/CompanySettings";
import ApprovalRules from "../modules/admin/pages/ApprovalRules";
import Login from "../Login";
import Signup from "../Signup";

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
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState("login"); // login/signup

  const [activeSection, setActiveSection] = useState("employee");
  const [activeTab, setActiveTab] = useState("history");
  const [activeAdminTab, setActiveAdminTab] = useState("dashboard");

  // 🔥 Check user on load
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  const getMainTitle = () => {
    if (!user) return "Authentication";

    if (activeSection === "employee") {
      return activeTab === "history"
        ? "Expense History"
        : "Submit Expense";
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

        {/* 🔐 NOT LOGGED IN */}
        {!user ? (
          <div className="menu">
            <div
              className={`menu-item ${authMode === "login" ? "active" : ""}`}
              onClick={() => setAuthMode("login")}
            >
              Login
            </div>

            <div
              className={`menu-item ${authMode === "signup" ? "active" : ""}`}
              onClick={() => setAuthMode("signup")}
            >
              Signup
            </div>
          </div>
        ) : (
          <>
            {/* 👤 USER INFO */}
            <div style={{ marginBottom: "20px" }}>
              <div className="menu-item active">
                Welcome, {user.name} 👋
              </div>

              <div className="menu-item" onClick={logout}>
                <FiLogOut style={{ marginRight: "8px" }} />
                Logout
              </div>
            </div>

            {/* Section Toggle */}
            <div style={{ borderBottom: "1px solid #333", paddingBottom: "15px" }}>
              <div
                className={`menu-item ${
                  activeSection === "employee" ? "active" : ""
                }`}
                onClick={() => {
                  setActiveSection("employee");
                  setActiveTab("history");
                }}
              >
                <FiBarChart2 /> Employee
              </div>

              <div
                className={`menu-item ${
                  activeSection === "admin" ? "active" : ""
                }`}
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
                  className={`menu-item ${
                    activeTab === "history" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("history")}
                >
                  <FiBarChart2 /> History
                </div>

                <div
                  className={`menu-item ${
                    activeTab === "form" ? "active" : ""
                  }`}
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
                  className={`menu-item ${
                    activeAdminTab === "dashboard" ? "active" : ""
                  }`}
                  onClick={() => setActiveAdminTab("dashboard")}
                >
                  <FiBarChart2 /> Dashboard
                </div>

                <div
                  className={`menu-item ${
                    activeAdminTab === "users" ? "active" : ""
                  }`}
                  onClick={() => setActiveAdminTab("users")}
                >
                  <FiUsers /> Users
                </div>

                <div
                  className={`menu-item ${
                    activeAdminTab === "company" ? "active" : ""
                  }`}
                  onClick={() => setActiveAdminTab("company")}
                >
                  <FiHome /> Company
                </div>

                <div
                  className={`menu-item ${
                    activeAdminTab === "rules" ? "active" : ""
                  }`}
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

          {user ? (
            <span className="link-btn">👤 {user.name}</span>
          ) : (
            <span className="link-btn">Please Login</span>
          )}
        </div>

        <div className="content-area">
          {!user ? (
            authMode === "login" ? (
              <Login switchToSignup={() => setAuthMode("signup")} />
            ) : (
              <Signup switchToLogin={() => setAuthMode("login")} />
            )
          ) : activeSection === "employee" ? (
            activeTab === "history" ? (
              <ExpenseHistory />
            ) : (
              <SubmitExpense />
            )
          ) : (
            <>
              {activeAdminTab === "dashboard" && <AdminDashboard />}
              {activeAdminTab === "users" && <UserManagement />}
              {activeAdminTab === "company" && <CompanySettings />}
              {activeAdminTab === "rules" && <ApprovalRules />}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;