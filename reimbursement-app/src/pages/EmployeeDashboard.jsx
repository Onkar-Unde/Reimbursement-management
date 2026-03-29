import SubmitExpense from "./Expense/SubmitExpense";
import ExpenseHistory from "./Expense/ExpenseHistory";
import "../style/expense.css";

const EmployeeDashboard = () => {
  return (
    <div className="page-bg">

      {/* 🔷 Header */}
      <div className="header">
        <h1 className="header-title">Expense Dashboard</h1>

        <div className="header-actions">
          <span className="link-btn">Welcome, Employee 👋</span>
        </div>
      </div>

      {/* 🔷 Content */}
      <div className="dashboard-container">

        <div className="dashboard-grid">
          {/* Left - History */}
          <div className="dashboard-item">
            <ExpenseHistory />
          </div>

          {/* Right - Form */}
          <div className="dashboard-item">
            <SubmitExpense />
          </div>
        </div>

      </div>
    </div>
  );
};

export default EmployeeDashboard;