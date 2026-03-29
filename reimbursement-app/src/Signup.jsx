import { useState, useEffect } from "react";
import './style/auth.css';

function Signup({ switchToLogin }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    companyName: "",
    country: ""
  });

  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);

  // fetch countries
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name")
      .then(res => res.json())
      .then(data => {
        const names = data.map(c => c.name.common);
        setCountries(names);
      });
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;

    setForm({ ...form, [e.target.name]: value });

    if (e.target.name === "country") {
      const filteredList = countries.filter(c =>
        c.toLowerCase().includes(value.toLowerCase())
      );
      setFiltered(filteredList);
    }
  };

  const selectCountry = (country) => {
    setForm({ ...form, country });
    setFiltered([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
   <div className="auth-bg signup-bg">
  <div className="auth-card">
    <h2 className="auth-title">Create Account 🚀</h2>

    <form onSubmit={handleSubmit} className="auth-form">
      <input name="name" placeholder="Full Name" onChange={handleChange} className="auth-input" />
      <input name="companyName" placeholder="Company Name" onChange={handleChange} className="auth-input" />

      <div style={{ position: "relative" }}>
        <input
          name="country"
          placeholder="Type country..."
          value={form.country}
          onChange={handleChange}
          className="auth-input"
        />

        {filtered.length > 0 && (
          <ul className="dropdown">
            {filtered.slice(0, 5).map((c, index) => (
              <li key={index} onClick={() => selectCountry(c)} className="dropdown-item">
                {c}
              </li>
            ))}
          </ul>
        )}
      </div>

      <input name="email" placeholder="Email" onChange={handleChange} className="auth-input" />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} className="auth-input" />

      <button type="submit" className="auth-btn signup-btn">
        Signup
      </button>
    </form>

    <p className="auth-footer">
      Already have an account?{" "}
      <span onClick={switchToLogin} className="auth-link">
        Login
      </span>
    </p>
  </div>
</div>
  );
}

export default Signup;