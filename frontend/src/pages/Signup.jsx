import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      let data = {};
      try {
        data = await res.json();
      } catch (jsonErr) {
        // If response is not JSON
        setMessage("Invalid server response");
        console.error("Invalid JSON response:", jsonErr);
        return;
      }
      if (res.ok) {
        setMessage("Signup successful! Redirecting...");
        setForm({ username: "", email: "", password: "" });
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setMessage(data.message || "Signup failed");
        console.error("Signup error:", data);
      }
    } catch (err) {
      setMessage("Network or server error");
      console.error("Network/server error:", err);
    }
  };

  return (
    <div className="auth-panel">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>{message}</p>
      <button onClick={() => navigate("/")}>
        Already have an account? Sign In
      </button>
    </div>
  );
}
