import React, { useState } from "react";
import './SignLogPage.css';
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    workEmail: "",
    password: "",
  });
  const [notification, setNotification] = useState(""); // State for notification message

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Placeholder: handle login validation and API call
    if (form.workEmail === "" || form.password === "") {
      setNotification("Please fill in all fields!"); // Error message
      return;
    }

    console.log("Logging in:", form);
    setNotification("Logged in successfully!"); // Success message
    setTimeout(() => navigate("/Workplace"), 2000); // Redirect after 2 seconds to see notification
  };

  return (
    <div className="login-container">
      <h2>Welcome Back!</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="workEmail"
          placeholder="Work Email Address"
          value={form.workEmail}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p className="redirect">
        Don't have an account?{" "}
        <span onClick={() => navigate("/signup")}>Sign Up</span>
      </p>

      {/* Notification Box */}
      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}
    </div>
  );
}

export default LoginPage;
