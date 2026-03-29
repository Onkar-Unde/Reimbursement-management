import { useState } from 'react';
import { useAdmin } from '../hooks/useAdmin';
import { FiCheck, FiPlus, FiEdit2, FiTrash2, FiAlertCircle, FiX } from 'react-icons/fi';
import '../style/admin.css';

const ApprovalRules = () => {
  const { approvalRules, addApprovalRule, updateApprovalRule, deleteApprovalRule } = useAdmin();
  const [showForm, setShowForm] = useState(false);
  const [editingRuleId, setEditingRuleId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    threshold: 0,
    approvalSequence: ['MANAGER'],
    conditionalRules: {
      type: 'percentage',
      value: 100,
    },
    isActive: true,
  });

  const approverOptions = ['MANAGER', 'FINANCE', 'DIRECTOR', 'CFO', 'CEO'];

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleConditionalChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      conditionalRules: {
        ...prev.conditionalRules,
        [field]: value,
      },
    }));
  };

  const handleAddSequenceStep = () => {
    if (!formData.approvalSequence.includes('FINANCE')) {
      setFormData((prev) => ({
        ...prev,
        approvalSequence: [...prev.approvalSequence, 'FINANCE'],
      }));
    }
  };

  const handleRemoveSequenceStep = (index) => {
    setFormData((prev) => ({
      ...prev,
      approvalSequence: prev.approvalSequence.filter((_, i) => i !== index),
    }));
  };

  const handleChangeSequenceStep = (index, value) => {
    const newSequence = [...formData.approvalSequence];
    newSequence[index] = value;
    setFormData((prev) => ({
      ...prev,
      approvalSequence: newSequence,
    }));
  };

  const handleAddRule = () => {
    if (!formData.name || formData.approvalSequence.length === 0) {
      alert('Please fill all required fields');
      return;
    }
    addApprovalRule(formData);
    resetForm();
  };

  const handleEditRule = (ruleId) => {
    const rule = approvalRules.find((r) => r.id === ruleId);
    if (rule) {
      setFormData({
        name: rule.name,
        description: rule.description,
        threshold: rule.threshold,
        approvalSequence: rule.approvalSequence,
        conditionalRules: rule.conditionalRules,
        isActive: rule.isActive,
      });
      setEditingRuleId(ruleId);
      setShowForm(true);
    }
  };

  const handleUpdateRule = () => {
    if (editingRuleId) {
      updateApprovalRule(editingRuleId, formData);
      resetForm();
    }
  };

  const handleDeleteRule = (ruleId) => {
    if (window.confirm('Are you sure you want to delete this rule?')) {
      deleteApprovalRule(ruleId);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      threshold: 0,
      approvalSequence: ['MANAGER'],
      conditionalRules: {
        type: 'percentage',
        value: 100,
      },
      isActive: true,
    });
    setEditingRuleId(null);
    setShowForm(false);
  };

  return (
    <div className="rules-container">
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ marginBottom: '15px' }}>
          <FiCheck style={{ marginRight: "8px", display: "inline" }} /> Approval Rules & Workflow
        </h2>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          <FiPlus style={{ marginRight: "6px", display: "inline" }} /> Create New Rule
        </button>
      </div>

      {/* Create/Edit Rule Form */}
      {showForm && (
        <div className="rule-form">
          <h3 style={{ marginBottom: '15px' }}>
            {editingRuleId ? <FiEdit2 style={{ marginRight: "8px", display: "inline" }} /> : <FiPlus style={{ marginRight: "8px", display: "inline" }} />}
            {editingRuleId ? 'Edit Approval Rule' : 'Create New Rule'}
          </h3>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Rule Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                className="form-input"
                placeholder="e.g., Standard Approval Flow"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Amount Threshold (₹)</label>
              <input
                type="number"
                name="threshold"
                value={formData.threshold}
                onChange={handleFormChange}
                className="form-input"
                placeholder="0"
              />
            </div>
          </div>

          <div className="form-row full">
            <div className="form-group">
              <label className="form-label">Description</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleFormChange}
                className="form-input"
                placeholder="Brief description of this rule"
              />
            </div>
          </div>

          {/* Approval Sequence */}
          <div className="form-row full">
            <div className="form-group">
              <label className="form-label">Approval Sequence *</label>
              <div className="approval-sequence">
                {formData.approvalSequence.map((approver, index) => (
                  <div key={index} className="sequence-step">
                    <span className="step-number">{index + 1}</span>
                    <select
                      value={approver}
                      onChange={(e) => handleChangeSequenceStep(index, e.target.value)}
                      className="form-select"
                      style={{ flex: 1 }}
                    >
                      {approverOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {formData.approvalSequence.length > 1 && (
                      <button
                        className="icon-btn"
                        onClick={() => handleRemoveSequenceStep(index)}
                        title="Remove step"
                        style={{ marginLeft: '10px' }}
                      >
                        <FiTrash2 />
                      </button>
                    )}
                    {index < formData.approvalSequence.length - 1 && (
                      <span className="step-arrow">→</span>
                    )}
                  </div>
                ))}
              </div>
              <button
                className="btn btn-secondary btn-small"
                onClick={handleAddSequenceStep}
                style={{ marginTop: '10px' }}
              >
                <FiPlus style={{ marginRight: "6px", display: "inline" }} /> Add Step
              </button>
            </div>
          </div>

          {/* Conditional Rules */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Conditional Rule Type</label>
              <select
                value={formData.conditionalRules.type}
                onChange={(e) => handleConditionalChange('type', e.target.value)}
                className="form-select"
              >
                <option value="percentage">Percentage (e.g., 60% must approve)</option>
                <option value="specific">Specific Approver (e.g., CFO approval)</option>
                <option value="hybrid">Hybrid (Combination of both)</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">
                {formData.conditionalRules.type === 'percentage' ? 'Percentage Required' : 'Approver'}
              </label>
              {formData.conditionalRules.type === 'percentage' ? (
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.conditionalRules.value}
                  onChange={(e) => handleConditionalChange('value', parseInt(e.target.value))}
                  className="form-input"
                  placeholder="100"
                />
              ) : (
                <select
                  value={formData.conditionalRules.value}
                  onChange={(e) => handleConditionalChange('value', e.target.value)}
                  className="form-select"
                >
                  <option value="">Select Approver</option>
                  {approverOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          {/* Status */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Status</label>
              <select
                value={formData.isActive ? 'active' : 'inactive'}
                onChange={(e) => handleFormChange({
                  target: {
                    name: 'isActive',
                    value: e.target.value === 'active',
                  },
                }) || setFormData((prev) => ({ ...prev, isActive: e.target.value === 'active' }))}
                className="form-select"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="button-group">
            <button className="btn btn-danger btn-small" onClick={resetForm}>
              Cancel
            </button>
            <button
              className="btn btn-primary btn-small"
              onClick={editingRuleId ? handleUpdateRule : handleAddRule}
            >
              {editingRuleId ? 'Update Rule' : 'Create Rule'}
            </button>
          </div>
        </div>
      )}

      {/* Rules List */}
      {approvalRules.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon"><FiCheck style={{ fontSize: '48px' }} /></div>
          <div className="empty-state-title">No Approval Rules</div>
          <div className="empty-state-message">Create your first approval rule to get started</div>
        </div>
      ) : (
        <div className="rules-container">
          {approvalRules.map((rule) => (
            <div key={rule.id} className="rule-card">
              <div className="rule-header">
                <div>
                  <h3 className="rule-title">{rule.name}</h3>
                  <p className="rule-description">{rule.description}</p>
                </div>
                <span className={`badge-status ${rule.isActive ? 'active' : 'inactive'}`}>
                  {rule.isActive ? <FiCheck style={{ marginRight: "4px", display: "inline" }} /> : <FiX style={{ marginRight: "4px", display: "inline" }} />}
                  {rule.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              <div className="rule-details">
                <div className="rule-detail-item">
                  <div className="rule-detail-label">Threshold Amount</div>
                  <div className="rule-detail-value">
                    {rule.threshold === 0 ? 'All amounts' : `₹ ${rule.threshold.toLocaleString()}`}
                  </div>
                </div>

                <div className="rule-detail-item">
                  <div className="rule-detail-label">Conditional Rule</div>
                  <div className="rule-detail-value">
                    {rule.conditionalRules.type === 'percentage'
                      ? `${rule.conditionalRules.value}% approval`
                      : `${rule.conditionalRules.value} approval`}
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '10px' }}>
                <div style={{ fontSize: '12px', color: '#aaa', marginBottom: '8px' }}>
                  <strong>Approval Sequence:</strong>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                  {rule.approvalSequence.map((approver, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span
                        style={{
                          background: '#3b82f6',
                          color: 'white',
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: '600',
                        }}
                      >
                        {approver}
                      </span>
                      {index < rule.approvalSequence.length - 1 && (
                        <span style={{ color: '#3b82f6', fontSize: '16px' }}>→</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <button
                  className="icon-btn"
                  onClick={() => handleEditRule(rule.id)}
                  title="Edit"
                >
                  <FiEdit2 />
                </button>
                <button
                  className="icon-btn"
                  onClick={() => handleDeleteRule(rule.id)}
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

      {/* Info Section */}
      <div style={{ marginTop: '30px', borderTop: '1px solid #333', paddingTop: '20px' }}>
        <h3 style={{ marginBottom: '15px' }}>
          <FiAlertCircle style={{ marginRight: "8px", display: "inline" }} /> About Approval Rules
        </h3>
        <div
          style={{
            background: '#111',
            border: '1px solid #333',
            borderRadius: '10px',
            padding: '20px',
          }}
        >
          <div style={{ marginBottom: '15px' }}>
            <strong style={{ color: 'white' }}>Sequential Approval:</strong>
            <div style={{ fontSize: '13px', color: '#aaa', marginTop: '5px' }}>
              Expenses move from one approver to the next in sequence. Each approver must approve
              or reject before it moves to the next.
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <strong style={{ color: 'white' }}>Conditional Rules:</strong>
            <div style={{ fontSize: '13px', color: '#aaa', marginTop: '5px' }}>
              <strong>Percentage:</strong> E.g., 60% means the expense is auto-approved if any 3 out
              of 5 approvers approve.
            </div>
            <div style={{ fontSize: '13px', color: '#aaa', marginTop: '5px' }}>
              <strong>Specific:</strong> E.g., if CFO approves, the expense is auto-approved
              regardless of others.
            </div>
          </div>

          <div>
            <strong style={{ color: 'white' }}>Thresholds:</strong>
            <div style={{ fontSize: '13px', color: '#aaa', marginTop: '5px' }}>
              Set different rules for different expense amounts. Rules with higher thresholds apply
              to larger expenses.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovalRules;
