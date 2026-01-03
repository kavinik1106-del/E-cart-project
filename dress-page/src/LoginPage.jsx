import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
import React, { useState } from "react";
import Navbar from "./Navbar.jsx";
import axios from "axios";
import { useCustomers } from "./contexts/useCustomers";


function LoginPage() {
  const { fetchCustomers } = useCustomers(); // access context function

  const [tab, setTab] = useState("login"); // login or register

  /* ---------- LOGIN STATES ---------- */
  const [method, setMethod] = useState("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ---------- REGISTER STATES ---------- */
  const [name, setName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regMobile, setRegMobile] = useState("");
  const [regPassword, setRegPassword] = useState("");

  /* ---------- MESSAGE STATE ---------- */
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"

  /* ---------- LOGIN ---------- */
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/customer/auth/login",
        { email, password }
      );
      localStorage.setItem("token", res.data.token);
      setMessage("Login successful!");
      setMessageType("success");
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  /* ---------- REGISTER ---------- */
  const handleRegister = async (e) => {
  e.preventDefault();
  try {
    await axios.post("http://localhost:5000/api/customer/auth/register", {
      name, email: regEmail, mobile: regMobile, password: regPassword
    });

    alert("Registered successfully!");

    fetchCustomers(); // ✅ refresh the admin panel customers list
  } catch (err) {
    alert(err.response?.data?.error || "Registration failed");
  }
};

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

      {/* LEFT BRAND SECTION */}
      <div className="hidden lg:flex bg-primary text-secondary flex-col items-center justify-center px-16">
        <h1 className="text-6xl font-extrabold mb-6">StyleNest</h1>
        <p className="text-lg text-yellow-200 text-center max-w-lg leading-relaxed">
          Fashion at your fingertips.  
          Shop the latest trends securely & effortlessly.
        </p>
      </div>

      {/* RIGHT LOGIN SECTION */}
      <div className="flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-8">

          {/* TABS */}
          <div className="flex mb-6 border-b text-sm font-medium">
            <button className="flex-1 pb-3 text-primary border-b-2 border-secondary">
              Sign in
            </button>
            <button className="flex-1 pb-3 text-gray-400 cursor-not-allowed">
              Create account
            </button>
          </div>

          {/* EMAIL */}
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-6 relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3 text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* BUTTON */}
          <button className="w-full bg-primary hover:bg-primary text-secondary py-3 rounded-md font-semibold transition">
            Sign in
          </button>
        </div>
      </div>
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* HERO */}
      <section className="bg-pink-600 text-white py-20 text-center">
        <h1 className="text-4xl font-bold">
          {tab === "login" ? "Sign in to StyleNest" : "Register at StyleNest"}
        </h1>
        <p className="text-sm mt-3 opacity-90">
          {tab === "login"
            ? "Secure access to your orders, returns & saved items"
            : "Create your account to start shopping"}
        </p>
      </section>

      {/* MESSAGE */}
      {message && (
        <div
          className={`max-w-4xl mx-auto mt-4 p-4 rounded text-center ${
            messageType === "success"
              ? "bg-green-100 text-green-700 border border-green-400"
              : "bg-red-100 text-red-700 border border-red-400"
          }`}
        >
          {message}
        </div>
      )}

      {/* CONTAINER */}
      <section className="max-w-4xl mx-auto -mt-16 bg-white rounded-2xl shadow-xl p-8">
        {/* TAB SWITCH */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setTab("login")}
            className={`px-6 py-2 text-sm font-semibold rounded-l-lg ${
              tab === "login" ? "bg-pink-500 text-white" : "bg-gray-200"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setTab("register")}
            className={`px-6 py-2 text-sm font-semibold rounded-r-lg ${
              tab === "register" ? "bg-pink-500 text-white" : "bg-gray-200"
            }`}
          >
            Register
          </button>
        </div>

        {/* LOGIN FORM */}
        {tab === "login" ? (
          <form onSubmit={handleLogin} className="space-y-5">
            {/* METHOD SWITCH */}
            <div className="flex justify-center mb-6">
              <button
                onClick={() => setMethod("email")}
                type="button"
                className={`px-6 py-2 text-sm font-semibold rounded-l-lg ${
                  method === "email" ? "bg-pink-500 text-white" : "bg-gray-200"
                }`}
              >
                Email & Password
              </button>
              <button
                onClick={() => setMethod("otp")}
                type="button"
                className={`px-6 py-2 text-sm font-semibold rounded-r-lg ${
                  method === "otp" ? "bg-pink-500 text-white" : "bg-gray-200"
                }`}
              >
                Mobile OTP
              </button>
            </div>

            {method === "email" && (
              <>
                <div>
                  <label className="text-sm font-medium">Email address</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border p-3 rounded-lg mt-1"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full border p-3 rounded-lg mt-1"
                      placeholder="Minimum 8 characters"
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-4 text-xs text-pink-500 cursor-pointer"
                    >
                      {showPassword ? "HIDE" : "SHOW"}
                    </span>
                  </div>
                </div>
              </>
            )}

            {method === "otp" && (
              <>
                <div>
                  <label className="text-sm font-medium">Mobile number</label>
                  <input
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full border p-3 rounded-lg mt-1"
                    placeholder="10-digit mobile number"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">OTP</label>
                  <input
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full border p-3 rounded-lg mt-1"
                    placeholder="Enter OTP"
                  />
                </div>
              </>
            )}

            <button
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold ${
                loading
                  ? "bg-gray-300"
                  : "bg-pink-500 text-white hover:bg-pink-600"
              }`}
            >
              {loading ? "Verifying..." : "Login securely"}
            </button>
          </form>
        ) : (
          /* REGISTER FORM */
          <form onSubmit={handleRegister} className="space-y-5">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="border p-3 w-full rounded-lg"
            />
            <input
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
              placeholder="Email"
              className="border p-3 w-full rounded-lg"
            />
            <input
              value={regMobile}
              onChange={(e) => setRegMobile(e.target.value)}
              placeholder="Mobile"
              className="border p-3 w-full rounded-lg"
            />
            <input
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
              placeholder="Password"
              type="password"
              className="border p-3 w-full rounded-lg"
            />
            <button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold bg-pink-500 text-white hover:bg-pink-600"
            >
              Register
            </button>
          </form>
        )}
      </section>

      {/* FOOTER */}
      <footer className="text-center text-xs text-gray-500 py-10">
        © 2025 StyleNest
      </footer>
    </div>
  );
}
