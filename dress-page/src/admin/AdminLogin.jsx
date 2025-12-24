import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    // Demo credentials
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin");
    } else {
      setError("Invalid credentials — try admin / admin123");
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          className="border p-2 rounded"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div className="text-red-600">{error}</div>}
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-blue-600 text-white rounded" type="submit">Sign in</button>
          <button
            type="button"
            className="px-3 py-1 bg-gray-200 rounded"
            onClick={() => { setUsername("admin"); setPassword("admin123"); }}
          >
            Fill demo
          </button>
        </div>
      </form>
      <p className="text-sm text-gray-600 mt-4">This is a demo login. Replace with real auth for production.</p>
    </div>
  );
}

export default AdminLogin;