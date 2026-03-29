import { useEffect, useState } from "react";
import "../../style/expense.css";

const ExpenseHistory = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(data);
  }, []);

  return (
    <div className="history-container">

      <div className="history-card">

        {/* Header */}
        <div className="history-header">
          <h2 className="history-title">Expense History</h2>
          <span className="history-count">
            Total: {expenses.length}
          </span>
        </div>

        {/* Table */}
        <div className="table-wrapper">
          <table className="table">

            <thead>
              <tr>
                <th>Description</th>
                <th>Category</th>
                <th>Amount</th>
                <th style={{ textAlign: "center" }}>Status</th>
              </tr>
            </thead>

            <tbody>
              {expenses.length > 0 ? (
                expenses.map((exp) => (
                  <tr key={exp.id} className="table-row">
                    <td>{exp.description || "-"}</td>
                    <td>{exp.category || "-"}</td>
                    <td className="amount">₹{exp.amount}</td>
                    <td style={{ textAlign: "center" }}>
                      <span
                        className={`badge ${
                          exp.status === "Approved"
                            ? "badge-approved"
                            : exp.status === "Rejected"
                            ? "badge-rejected"
                            : "badge-pending"
                        }`}
                      >
                        {exp.status || "Pending"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="empty">
                    No expenses found 🚫
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
};

export default ExpenseHistory;