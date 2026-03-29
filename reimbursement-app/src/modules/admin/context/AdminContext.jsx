import { createContext, useState, useCallback } from 'react';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  // Company Data
  const [company, setCompany] = useState({
    id: 'COMP001',
    name: 'Tech Corp',
    currency: 'USD',
    country: 'United States',
    createdAt: new Date().toISOString(),
  });

  // Users Management
  const [users, setUsers] = useState([
    {
      id: 'USER001',
      firstName: 'John',
      lastName: 'Admin',
      email: 'john@techcorp.com',
      role: 'ADMIN',
      managerId: null,
      department: 'Management',
      status: 'active',
    },
    {
      id: 'USER002',
      firstName: 'Jane',
      lastName: 'Manager',
      email: 'jane@techcorp.com',
      role: 'MANAGER',
      managerId: 'USER001',
      department: 'Finance',
      status: 'active',
    },
    {
      id: 'USER003',
      firstName: 'Bob',
      lastName: 'Employee',
      email: 'bob@techcorp.com',
      role: 'EMPLOYEE',
      managerId: 'USER002',
      department: 'Engineering',
      status: 'active',
    },
  ]);

  // Approval Rules
  const [approvalRules, setApprovalRules] = useState([
    {
      id: 'RULE001',
      name: 'Standard Approval Flow',
      description: 'Default approval process',
      threshold: 0,
      approvalSequence: ['MANAGER', 'FINANCE'],
      conditionalRules: {
        type: 'percentage',
        value: 100,
      },
      isActive: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'RULE002',
      name: 'High Amount Rule',
      description: 'For expenses above 5000',
      threshold: 5000,
      approvalSequence: ['MANAGER', 'FINANCE', 'DIRECTOR'],
      conditionalRules: {
        type: 'specific',
        value: 'CFO',
      },
      isActive: true,
      createdAt: new Date().toISOString(),
    },
  ]);

  // Expenses (for admin to override)
  const [expenses, setExpenses] = useState([
    {
      id: 'EXP001',
      employeeId: 'USER003',
      amount: 250,
      currency: 'USD',
      category: 'Travel',
      description: 'Flight to NYC',
      date: '2026-03-20',
      status: 'PENDING',
      approvedBy: [],
      currentApprover: 'USER002',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'EXP002',
      employeeId: 'USER003',
      amount: 1200,
      currency: 'USD',
      category: 'Accommodation',
      description: 'Hotel stay',
      date: '2026-03-21',
      status: 'APPROVED',
      approvedBy: ['USER002', 'USER001'],
      currentApprover: null,
      createdAt: new Date().toISOString(),
    },
  ]);

  // Add User
  const addUser = useCallback((newUser) => {
    const user = {
      ...newUser,
      id: `USER${Date.now()}`,
      status: 'active',
    };
    setUsers((prev) => [...prev, user]);
    return user;
  }, []);

  // Update User
  const updateUser = useCallback((userId, updatedData) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === userId ? { ...user, ...updatedData } : user))
    );
  }, []);

  // Delete User
  const deleteUser = useCallback((userId) => {
    setUsers((prev) => prev.filter((user) => user.id !== userId));
  }, []);

  // Add Approval Rule
  const addApprovalRule = useCallback((newRule) => {
    const rule = {
      ...newRule,
      id: `RULE${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setApprovalRules((prev) => [...prev, rule]);
    return rule;
  }, []);

  // Update Approval Rule
  const updateApprovalRule = useCallback((ruleId, updatedData) => {
    setApprovalRules((prev) =>
      prev.map((rule) => (rule.id === ruleId ? { ...rule, ...updatedData } : rule))
    );
  }, []);

  // Delete Approval Rule
  const deleteApprovalRule = useCallback((ruleId) => {
    setApprovalRules((prev) => prev.filter((rule) => rule.id !== ruleId));
  }, []);

  // Approve/Reject Expense (Admin Override)
  const overrideExpenseApproval = useCallback((expenseId, status, comment = '') => {
    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id === expenseId
          ? {
              ...expense,
              status,
              approvalComment: comment,
            }
          : expense
      )
    );
  }, []);

  // Update Company Settings
  const updateCompanySettings = useCallback((updatedSettings) => {
    setCompany((prev) => ({ ...prev, ...updatedSettings }));
  }, []);

  const value = {
    company,
    updateCompanySettings,
    users,
    addUser,
    updateUser,
    deleteUser,
    approvalRules,
    addApprovalRule,
    updateApprovalRule,
    deleteApprovalRule,
    expenses,
    overrideExpenseApproval,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};
