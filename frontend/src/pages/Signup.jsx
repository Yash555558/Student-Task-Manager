import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await signup(form);
      navigate("/");
    } catch (error) {
      setErr(error?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Sign up</h2>
        {err && <div className="mb-3 text-sm text-red-600">{err}</div>}
        <form onSubmit={onSubmit} className="space-y-3">
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            required
            placeholder="Full Name"
            className="w-full px-3 py-2 border rounded"
          />
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
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </form>
        <div className="mt-4 text-sm">
          Already have an account? <Link to="/login" className="text-primary">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;