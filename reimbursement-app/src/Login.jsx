import { useState } from "react";
import './style/auth.css';
function Login({ switchToSignup }) {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    alert(data.message + " (" + data.role + ")");
  };

  return (
    <div className="auth-bg login-bg">
  <div className="auth-card">
    <h2 className="auth-title">Welcome Back! 👋</h2>

    <form onSubmit={handleSubmit} className="auth-form">
      <input name="email" placeholder="Email" onChange={handleChange} className="auth-input" />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} className="auth-input" />

      <button type="submit" className="auth-btn login-btn">
        Login
      </button>
    </form>

    <p className="auth-footer">
      Don't have an account?{" "}
      <span onClick={switchToSignup} className="auth-link">
        Sign up
      </span>
    </p>
  </div>
</div>
  );
}

export default Login;