import { useEffect, useState } from "react";
import "../../style/expense.css";

const ExpenseHistory = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("expenses"));

    if (!stored || stored.length === 0) {
      const demo = [
        {
          id: 1,
          description: "Lunch",
          category: "Food",
          amountINR: 500,
          status: "Approved",
        },
        {
          id: 2,
          description: "Taxi",
          category: "Travel",
          amountINR: 300,
          status: "Pending",
        },
      ];
      localStorage.setItem("expenses", JSON.stringify(demo));
      setExpenses(demo);
    } else {
      setExpenses(stored);
    }
  }, []);

  return (
    <div>
      <h2 className="header-title">Expense History</h2>

      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {expenses.map((exp) => (
              <tr key={exp.id} className="table-row">
                <td>{exp.description}</td>
                <td>{exp.category}</td>
                <td className="amount">₹{exp.amountINR}</td>
                <td>
                  <span
                    className={`badge ${
                      exp.status === "Approved"
                        ? "badge-approved"
                        : exp.status === "Rejected"
                        ? "badge-rejected"
                        : "badge-pending"
                    }`}
                  >
                    {exp.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseHistory;