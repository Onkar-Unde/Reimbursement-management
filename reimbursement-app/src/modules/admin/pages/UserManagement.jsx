import { useState } from 'react';
import { useAdmin } from '../hooks/useAdmin';
import { FiUsers, FiPlus, FiEdit2, FiTrash2, FiSearch, FiBarChart2 } from 'react-icons/fi';
import '../style/admin.css';

const UserManagement = () => {
  const { users, addUser, updateUser, deleteUser } = useAdmin();
  const [showForm, setShowForm] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('ALL');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'EMPLOYEE',
    managerId: '',
    department: '',
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUser = () => {
    if (!formData.firstName || !formData.lastName || !formData.email) {
      alert('Please fill all required fields');
      return;
    }
    addUser(formData);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      role: 'EMPLOYEE',
      managerId: '',
      department: '',
    });
    setShowForm(false);
  };

  const handleEditUser = (userId) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        managerId: user.managerId || '',
        department: user.department,
      });
      setEditingUserId(userId);
      setShowForm(true);
    }
  };

  const handleUpdateUser = () => {
    if (editingUserId) {
      updateUser(editingUserId, formData);
      setEditingUserId(null);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        role: 'EMPLOYEE',
        managerId: '',
        department: '',
      });
      setShowForm(false);
    }
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(userId);
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterRole === 'ALL' || user.role === filterRole;

    return matchesSearch && matchesFilter;
  });

  const getManagerName = (managerId) => {
    if (!managerId) return 'No Manager';
    const manager = users.find((u) => u.id === managerId);
    return manager ? `${manager.firstName} ${manager.lastName}` : 'Unknown';
  };

  return (
    <div className="users-container">
      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ marginBottom: '15px' }}>
          <FiUsers style={{ marginRight: "8px", display: "inline" }} /> User Management
        </h2>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          <FiPlus style={{ marginRight: "6px", display: "inline" }} /> Add New User
        </button>
      </div>

      {/* Add/Edit User Form */}
      {showForm && (
        <div className="user-form">
          <h3 style={{ marginBottom: '15px' }}>
            {editingUserId ? <FiEdit2 style={{ marginRight: "8px", display: "inline" }} /> : <FiPlus style={{ marginRight: "8px", display: "inline" }} />}
            {editingUserId ? 'Edit User' : 'Add New User'}
          </h3>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">First Name *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleFormChange}
                className="form-input"
                placeholder="John"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleFormChange}
                className="form-input"
                placeholder="Doe"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                className="form-input"
                placeholder="john@company.com"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleFormChange}
                className="form-input"
                placeholder="Engineering"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Role *</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleFormChange}
                className="form-select"
              >
                <option value="EMPLOYEE">Employee</option>
                <option value="MANAGER">Manager</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Manager</label>
              <select
                name="managerId"
                value={formData.managerId}
                onChange={handleFormChange}
                className="form-select"
              >
                <option value="">Select Manager</option>
                {users
                  .filter(
                    (u) =>
                      (u.role === 'MANAGER' || u.role === 'ADMIN') &&
                      u.id !== editingUserId
                  )
                  .map((manager) => (
                    <option key={manager.id} value={manager.id}>
                      {manager.firstName} {manager.lastName}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="button-group">
            <button
              className="btn btn-danger btn-small"
              onClick={() => {
                setShowForm(false);
                setEditingUserId(null);
                setFormData({
                  firstName: '',
                  lastName: '',
                  email: '',
                  role: 'EMPLOYEE',
                  managerId: '',
                  department: '',
                });
              }}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary btn-small"
              onClick={editingUserId ? handleUpdateUser : handleAddUser}
            >
              {editingUserId ? 'Update User' : 'Add User'}
            </button>
          </div>
        </div>
      )}

      {/* Search & Filter */}
      <div className="filter-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="filter-select"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <option value="ALL">All Roles</option>
          <option value="ADMIN">Admin</option>
          <option value="MANAGER">Manager</option>
          <option value="EMPLOYEE">Employee</option>
        </select>
      </div>

      {/* Users List */}
      {filteredUsers.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon"><FiUsers style={{ fontSize: '48px' }} /></div>
          <div className="empty-state-title">No Users Found</div>
          <div className="empty-state-message">
            {searchTerm || filterRole !== 'ALL'
              ? 'Try adjusting your search filters'
              : 'Add your first user to get started'}
          </div>
        </div>
      ) : (
        <div className="users-container">
          {filteredUsers.map((user) => (
            <div key={user.id} className="user-card">
              <div className="user-info">
                <div className="user-name">
                  {user.firstName} {user.lastName}
                </div>
                <div className="user-email">{user.email}</div>
                <div className="user-details">
                  <span className="user-role-badge" style={{
                    background:
                      user.role === 'ADMIN'
                        ? '#8b5cf6'
                        : user.role === 'MANAGER'
                        ? '#3b82f6'
                        : '#10b981',
                  }}>
                    {user.role}
                  </span>
                  <span>
                    <strong>Dept:</strong> {user.department || 'N/A'}
                  </span>
                  <span>
                    <strong>Manager:</strong> {getManagerName(user.managerId)}
                  </span>
                </div>
              </div>
              <div className="user-actions">
                <button
                  className="icon-btn"
                  onClick={() => handleEditUser(user.id)}
                  title="Edit"
                >
                  <FiEdit2 />
                </button>
                <button
                  className="icon-btn"
                  onClick={() => handleDeleteUser(user.id)}
                  title="Delete"
                  style={{ color: '#ef4444' }}
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      <div style={{ marginTop: '30px', borderTop: '1px solid #333', paddingTop: '20px' }}>
        <h3 style={{ marginBottom: '15px' }}>
          <FiBarChart2 style={{ marginRight: "8px", display: "inline" }} /> Statistics
        </h3>
        <div className="admin-dashboard">
          <div className="stat-card">
            <div className="stat-number">{users.length}</div>
            <div className="stat-label">Total Users</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{users.filter((u) => u.role === 'ADMIN').length}</div>
            <div className="stat-label">Admins</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{users.filter((u) => u.role === 'MANAGER').length}</div>
            <div className="stat-label">Managers</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{users.filter((u) => u.role === 'EMPLOYEE').length}</div>
            <div className="stat-label">Employees</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
