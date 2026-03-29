import { useState } from 'react';
import { useAdmin } from '../hooks/useAdmin';
import { FiBarChart2, FiCheckCircle, FiAlertCircle, FiEye, FiX, FiInbox, FiSettings } from 'react-icons/fi';
import { MdOutlineErrorOutline } from 'react-icons/md';
import '../style/admin.css';

const AdminDashboard = () => {
  const { expenses, users, overrideExpenseApproval } = useAdmin();
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [approvalComment, setApprovalComment] = useState('');
  const [approvalAction, setApprovalAction] = useState('APPROVE');

  const getEmployeeName = (employeeId) => {
    const employee = users.find((u) => u.id === employeeId);
    return employee ? `${employee.firstName} ${employee.lastName}` : 'Unknown';
  };

  const getManagerName = (userId) => {
    const user = users.find((u) => u.id === userId);
    return user ? `${user.firstName} ${user.lastName}` : 'Unknown';
  };

  const filteredExpenses = expenses.filter((expense) => {
    if (filterStatus === 'ALL') return true;
    return expense.status === filterStatus;
  });

  const handleApprovalClick = (expense) => {
    setSelectedExpense(expense);
    setApprovalAction('APPROVE');
    setApprovalComment('');
    setShowApprovalModal(true);
  };

  const handleRejectionClick = (expense) => {
    setSelectedExpense(expense);
    setApprovalAction('REJECT');
    setApprovalComment('');
    setShowApprovalModal(true);
  };

  const handleConfirmAction = () => {
    if (!selectedExpense) return;

    if (approvalAction === 'REJECT' && !approvalComment) {
      alert('Please provide a reason for rejection');
      return;
    }

    overrideExpenseApproval(selectedExpense.id, approvalAction, approvalComment);
    setShowApprovalModal(false);
    setSelectedExpense(null);
    setApprovalComment('');
  };

  // Statistics
  const stats = {
    total: expenses.length,
    pending: expenses.filter((e) => e.status === 'PENDING').length,
    approved: expenses.filter((e) => e.status === 'APPROVED').length,
    rejected: expenses.filter((e) => e.status === 'REJECTED').length,
    totalAmount: expenses.reduce((sum, e) => sum + e.amount, 0),
    approvedAmount: expenses
      .filter((e) => e.status === 'APPROVED')
      .reduce((sum, e) => sum + e.amount, 0),
  };

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>
        <FiBarChart2 style={{ marginRight: "8px", display: "inline" }} /> Admin Dashboard
      </h2>

      {/* Statistics */}
      <div className="admin-dashboard">
        <div className="stat-card">
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">Total Expenses</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.pending}</div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.approved}</div>
          <div className="stat-label">Approved</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.rejected}</div>
          <div className="stat-label">Rejected</div>
        </div>
      </div>

      {/* Amount Statistics */}
      <div className="admin-dashboard" style={{ marginBottom: '30px' }}>
        <div className="stat-card">
          <div className="stat-number">${stats.totalAmount.toFixed(2)}</div>
          <div className="stat-label">Total Value</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">${stats.approvedAmount.toFixed(2)}</div>
          <div className="stat-label">Approved Value</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            {stats.total > 0 ? ((stats.approved / stats.total) * 100).toFixed(1) : 0}%
          </div>
          <div className="stat-label">Approval Rate</div>
        </div>
      </div>

      {/* Expenses Table */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h3><FiCheckCircle style={{ marginRight: "8px", display: "inline" }} /> All Expenses</h3>
          <select
            className="filter-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="ALL">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>

        {filteredExpenses.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon"><FiInbox style={{ fontSize: '48px' }} /></div>
            <div className="empty-state-title">No Expenses</div>
            <div className="empty-state-message">
              {filterStatus === 'ALL' ? 'No expenses submitted yet' : `No ${filterStatus.toLowerCase()} expenses`}
            </div>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="expenses-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Amount</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Current Approver</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses.map((expense) => (
                  <tr key={expense.id}>
                    <td>{getEmployeeName(expense.employeeId)}</td>
                    <td>${expense.amount.toFixed(2)}</td>
                    <td>{expense.category}</td>
                    <td>{new Date(expense.date).toLocaleDateString()}</td>
                    <td style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {expense.description}
                    </td>
                    <td>
                      <span className={`expense-status ${expense.status.toLowerCase()}`}>
                        {expense.status}
                      </span>
                    </td>
                    <td>
                      {expense.currentApprover ? getManagerName(expense.currentApprover) : <FiCheckCircle style={{ display: 'inline' }} />}
                    </td>
                    <td>
                      {expense.status === 'PENDING' && (
                        <div style={{ display: 'flex', gap: '5px' }}>
                          <button
                            className="icon-btn"
                            onClick={() => handleApprovalClick(expense)}
                            title="Approve"
                          >
                            <FiCheckCircle />
                          </button>
                          <button
                            className="icon-btn"
                            onClick={() => handleRejectionClick(expense)}
                            title="Reject"
                            style={{ color: '#ef4444' }}
                          >
                            <FiX />
                          </button>
                        </div>
                      )}
                      {expense.status !== 'PENDING' && (
                        <button
                          className="icon-btn"
                          onClick={() => handleApprovalClick(expense)}
                          title="View Details"
                        >
                          <FiEye />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Approval Modal */}
      {showApprovalModal && selectedExpense && (
        <div className="modal-overlay active">
          <div className="modal-content">
            <h3 className="modal-title">
              {approvalAction === 'APPROVE' ? <FiCheckCircle style={{ marginRight: "8px", display: "inline" }} /> : <FiX style={{ marginRight: "8px", display: "inline" }} />}
              {approvalAction === 'APPROVE' ? ' Approve Expense?' : ' Reject Expense?'}
            </h3>

            <div style={{ marginBottom: '15px', fontSize: '13px', color: '#aaa' }}>
              <p>
                <strong>Employee:</strong> {getEmployeeName(selectedExpense.employeeId)}
              </p>
              <p>
                <strong>Amount:</strong> ${selectedExpense.amount.toFixed(2)} {selectedExpense.currency}
              </p>
              <p>
                <strong>Category:</strong> {selectedExpense.category}
              </p>
              <p>
                <strong>Description:</strong> {selectedExpense.description}
              </p>
            </div>

            {approvalAction === 'REJECT' && (
              <div style={{ marginBottom: '15px' }}>
                <label className="form-label">Reason for Rejection</label>
                <textarea
                  value={approvalComment}
                  onChange={(e) => setApprovalComment(e.target.value)}
                  className="form-input"
                  style={{ height: '80px', resize: 'none' }}
                  placeholder="Please provide a reason..."
                />
              </div>
            )}

            <div className="modal-actions">
              <button
                className="btn btn-secondary btn-small"
                onClick={() => {
                  setShowApprovalModal(false);
                  setSelectedExpense(null);
                }}
              >
                Cancel
              </button>
              <button
                className={`btn ${approvalAction === 'APPROVE' ? 'btn-success' : 'btn-danger'} btn-small`}
                onClick={handleConfirmAction}
              >
                {approvalAction === 'APPROVE' ? 'Approve' : 'Reject'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Info Section */}
      <div style={{ marginTop: '30px', borderTop: '1px solid #333', paddingTop: '20px' }}>
        <h3 style={{ marginBottom: '15px' }}>
          <FiAlertCircle style={{ marginRight: "8px", display: "inline" }} /> Admin Responsibilities
        </h3>
        <div
          style={{
            background: '#111',
            border: '1px solid #333',
            borderRadius: '10px',
            padding: '20px',
          }}
        >
          <div style={{ marginBottom: '15px', fontSize: '13px' }}>
            <strong style={{ color: 'white' }}>
              <FiBarChart2 style={{ marginRight: "6px", display: "inline" }} /> Overview:
            </strong>
            <div style={{ color: '#aaa', marginTop: '5px' }}>
              As admin, you have full visibility and control over all expenses. You can override
              approvals, track approval workflows, and ensure compliance with company policies.
            </div>
          </div>

          <div style={{ marginBottom: '15px', fontSize: '13px' }}>
            <strong style={{ color: 'white' }}>
              <FiCheckCircle style={{ marginRight: "6px", display: "inline" }} /> Approvals:
            </strong>
            <div style={{ color: '#aaa', marginTop: '5px' }}>
              You can approve expenses directly, bypassing the normal approval workflow. This is
              useful for emergency or high-priority expenses.
            </div>
          </div>

          <div style={{ fontSize: '13px' }}>
            <strong style={{ color: 'white' }}>
              <FiSettings style={{ marginRight: "6px", display: "inline" }} /> Configuration:
            </strong>
            <div style={{ color: '#aaa', marginTop: '5px' }}>
              Configure approval workflows, manage users, and set company settings to ensure smooth
              operations.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
