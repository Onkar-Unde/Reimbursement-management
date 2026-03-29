import { useState, useEffect } from "react";

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative">
        
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create Account 🚀
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />

          <input
            name="companyName"
            placeholder="Company Name"
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />

          {/* 🔥 Country Search Input */}
          <div className="relative">
            <input
              name="country"
              placeholder="Type country..."
              value={form.country}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />

            {/* Dropdown */}
            {filtered.length > 0 && (
              <ul className="absolute w-full bg-white border rounded-lg mt-1 max-h-40 overflow-y-auto z-10">
                {filtered.slice(0, 5).map((c, index) => (
                  <li
                    key={index}
                    onClick={() => selectCountry(c)}
                    className="p-2 hover:bg-blue-100 cursor-pointer"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Signup
          </button>

        </form>

        <p className="text-center text-sm mt-4 text-gray-600">
          Already have an account?{" "}
          <span onClick={switchToLogin} className="text-blue-500 cursor-pointer hover:underline">
            Login
          </span>
        </p>

      </div>
    </div>
  );
}

export default Signup;