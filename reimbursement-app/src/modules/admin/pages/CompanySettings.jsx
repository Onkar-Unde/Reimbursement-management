import { useState } from 'react';
import { useAdmin } from '../hooks/useAdmin';
import { FiHome, FiEdit2, FiGlobe, FiCreditCard, FiAlertCircle, FiUsers, FiCheck } from 'react-icons/fi';
import '../style/admin.css';

const CompanySettings = () => {
  const { company, updateCompanySettings } = useAdmin();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: company.name,
    country: company.country,
    currency: company.currency,
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!formData.name || !formData.country || !formData.currency) {
      alert('Please fill all required fields');
      return;
    }
    updateCompanySettings(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: company.name,
      country: company.country,
      currency: company.currency,
    });
    setIsEditing(false);
  };

  const countries = [
    { code: 'USD', name: 'United States' },
    { code: 'EUR', name: 'European Union' },
    { code: 'GBP', name: 'United Kingdom' },
    { code: 'INR', name: 'India' },
    { code: 'JPY', name: 'Japan' },
    { code: 'CAD', name: 'Canada' },
    { code: 'AUD', name: 'Australia' },
  ];

  const currencyMap = {
    'United States': 'USD',
    'European Union': 'EUR',
    'United Kingdom': 'GBP',
    'India': 'INR',
    'Japan': 'JPY',
    'Canada': 'CAD',
    'Australia': 'AUD',
  };

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setFormData((prev) => ({
      ...prev,
      country,
      currency: currencyMap[country] || prev.currency,
    }));
  };

  return (
    <div>
      <h2 style={{ marginBottom: '20px' }}>
        <FiHome style={{ marginRight: "8px", display: "inline" }} /> Company Settings
      </h2>

      {!isEditing ? (
        <>
          {/* Display Mode */}
          <div className="settings-form">
            <div className="setting-group">
              <span className="setting-label">Company Name</span>
              <div className="setting-value">{company.name}</div>
            </div>

            <div className="setting-group">
              <span className="setting-label">Country</span>
              <div className="setting-value">{company.country}</div>
            </div>

            <div className="setting-group">
              <span className="setting-label">Base Currency</span>
              <div className="setting-value">{company.currency}</div>
            </div>

            <div className="setting-group">
              <span className="setting-label">Company Created</span>
              <div className="setting-value">
                {new Date(company.createdAt).toLocaleDateString()}
              </div>
            </div>

            <button
              className="btn btn-primary"
              style={{ marginTop: '20px' }}
              onClick={() => setIsEditing(true)}
            >
              <FiEdit2 style={{ marginRight: "6px", display: "inline" }} /> Edit Settings
            </button>
          </div>

          {/* Additional Info */}
          <div style={{ marginTop: '30px', borderTop: '1px solid #333', paddingTop: '20px' }}>
            <h3 style={{ marginBottom: '15px' }}>
              <FiAlertCircle style={{ marginRight: "8px", display: "inline" }} /> Information
            </h3>
            <div
              style={{
                background: '#111',
                border: '1px solid #333',
                borderRadius: '10px',
                padding: '20px',
              }}
            >
              <p style={{ marginBottom: '15px', color: '#aaa', fontSize: '13px' }}>
                <strong>Company ID:</strong> {company.id}
              </p>
              <p style={{ marginBottom: '15px', color: '#aaa', fontSize: '13px' }}>
                <strong>Base Currency:</strong> All expense amounts will be converted and displayed
                in {company.currency} for approval workflows.
              </p>
              <p style={{ color: '#aaa', fontSize: '13px' }}>
                <strong>Note:</strong> Employees can submit expenses in their local currency,
                which will be automatically converted using current exchange rates.
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Edit Mode */}
          <div className="settings-form">
            <h3 style={{ marginBottom: '20px' }}>
              <FiEdit2 style={{ marginRight: "8px", display: "inline" }} /> Edit Company Settings
            </h3>

            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label className="form-label">Company Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                className="form-input"
              />
            </div>

            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label className="form-label">Country *</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleCountryChange}
                className="form-select"
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.name} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label className="form-label">Base Currency *</label>
              <input
                type="text"
                name="currency"
                value={formData.currency}
                onChange={handleFormChange}
                className="form-input"
                placeholder="USD"
                readOnly
                style={{ backgroundColor: '#0a0a0a' }}
              />
              <small style={{ color: '#888', marginTop: '6px' }}>
                Auto-selected based on country
              </small>
            </div>

            <div className="button-group">
              <button className="btn btn-danger btn-small" onClick={handleCancel}>
                Cancel
              </button>
              <button className="btn btn-primary btn-small" onClick={handleSave}>
                Save Changes
              </button>
            </div>
          </div>
        </>
      )}

      {/* Quick Settings Info */}
      <div style={{ marginTop: '30px', borderTop: '1px solid #333', paddingTop: '20px' }}>
        <h3 style={{ marginBottom: '15px' }}>
          <FiAlertCircle style={{ marginRight: "8px", display: "inline" }} /> What You Can Configure
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          <div
            style={{
              background: '#0a0a0a',
              border: '1px solid #333',
              borderRadius: '8px',
              padding: '15px',
            }}
          >
            <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '5px' }}>
              <FiGlobe style={{ marginRight: "6px", display: "inline" }} /> Country & Currency
            </div>
            <div style={{ fontSize: '12px', color: '#888' }}>
              Set your company's home country and base currency for expense conversions
            </div>
          </div>

          <div
            style={{
              background: '#0a0a0a',
              border: '1px solid #333',
              borderRadius: '8px',
              padding: '15px',
            }}
          >
            <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '5px' }}>
              <FiUsers style={{ marginRight: "6px", display: "inline" }} /> User Management
            </div>
            <div style={{ fontSize: '12px', color: '#888' }}>
              Create and manage employees, managers, and assign roles from the User Management tab
            </div>
          </div>

          <div
            style={{
              background: '#0a0a0a',
              border: '1px solid #333',
              borderRadius: '8px',
              padding: '15px',
            }}
          >
            <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '5px' }}>
              <FiCheck style={{ marginRight: "6px", display: "inline" }} /> Approval Rules
            </div>
            <div style={{ fontSize: '12px', color: '#888' }}>
              Define approval workflows and conditional rules for expense approvals
            </div>
          </div>

          <div
            style={{
              background: '#0a0a0a',
              border: '1px solid #333',
              borderRadius: '8px',
              padding: '15px',
            }}
          >
            <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '5px' }}>
              <FiCreditCard style={{ marginRight: "6px", display: "inline" }} /> Expense Management
            </div>
            <div style={{ fontSize: '12px', color: '#888' }}>
              View all expenses, override approvals, and monitor company spending
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanySettings;
