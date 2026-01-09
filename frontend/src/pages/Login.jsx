import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await login(form);
      navigate("/");
    } catch (error) {
      setErr(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        {err && <div className="mb-3 text-sm text-red-600">{err}</div>}
        <form onSubmit={onSubmit} className="space-y-3">
          <input
            name="email"
            value={form.email}
            onChange={onChange}
            required
            placeholder="Email"
            className="w-full px-3 py-2 border rounded"
          />
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={onChange}
            required
            placeholder="Password"
            className="w-full px-3 py-2 border rounded"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-primary text-white rounded"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="mt-4 text-sm">
          Don't have an account? <Link to="/signup" className="text-primary">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;