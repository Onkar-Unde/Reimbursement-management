export const signupUser = (form) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const company = {
    id: Date.now(),
    name: form.companyName,
    country: form.country,
    currency: form.currency,
  };

  const newUser = {
    id: Date.now(),
    name: form.name,
    email: form.email,
    password: form.password,
    role: "ADMIN",
    companyId: company.id,
  };

  localStorage.setItem("company", JSON.stringify(company));
  localStorage.setItem("users", JSON.stringify([...users, newUser]));
  localStorage.setItem("currentUser", JSON.stringify(newUser));
};

// 🔑 Login
export const loginUser = (email, password) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    return true;
  }

  return false;
};

// 🚪 Logout
export const logoutUser = () => {
  localStorage.removeItem("currentUser");
};