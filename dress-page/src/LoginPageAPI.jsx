import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { apiCall, API_ENDPOINTS } from "./config/apiConfig.js";

export default function LoginPage() {
  const navigate = useNavigate();

  // ===== STATES =====
  const [activeTab, setActiveTab] = useState("login");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  // ===== VALIDATIONS =====
  const validateEmail = (v) =>
    !v
      ? "Email is required"
      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
      ? "Enter a valid email"
      : "";

  const validatePassword = (v) =>
    !v ? "Password is required" : v.length < 6 ? "Min 6 characters" : "";

  const validateMobile = (v) =>
    !/^[6-9]\d{9}$/.test(v) ? "Enter valid 10-digit number" : "";

  const validateName = (v) => (!v ? "This field is required" : "");

  // ===== LOGIN =====
  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;

    const emailError = validateEmail(loginData.email);
    const passwordError = validatePassword(loginData.password);

    if (emailError || passwordError) {
      setMessageType("error");
      setMessage(emailError || passwordError);
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await apiCall(API_ENDPOINTS.LOGIN, {
        method: "POST",
        body: JSON.stringify(loginData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Invalid credentials");
      }

      localStorage.setItem("token", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data.user));

      setMessageType("success");
      setMessage("Login successful! Redirecting...");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      setMessageType("error");
      setMessage(err.message || "Unable to login");
    } finally {
      setLoading(false);
    }
  };

  // ===== REGISTER =====
  const handleRegister = async (e) => {
    e.preventDefault();
    if (loading) return;

    const errors = [
      validateName(registerData.first_name),
      validateName(registerData.last_name),
      validateEmail(registerData.email),
      validatePassword(registerData.password),
      registerData.password !== registerData.confirmPassword
        ? "Passwords do not match"
        : "",
      validateMobile(registerData.phone),
    ].filter(Boolean);

    if (errors.length) {
      setMessageType("error");
      setMessage(errors[0]);
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await apiCall(API_ENDPOINTS.REGISTER, {
        method: "POST",
        body: JSON.stringify(registerData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Registration failed");
      }

      setMessageType("success");
      setMessage("Account created! Please login.");

      setRegisterData({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
      });

      setTimeout(() => {
        setActiveTab("login");
        setMessage("");
      }, 1500);
    } catch (err) {
      setMessageType("error");
      setMessage(err.message || "Unable to register");
    } finally {
      setLoading(false);
    }
  };

  // ===== UI =====
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* LEFT: Brand + Illustration */}
      <div className="hidden md:flex w-1/2 bg-primary items-center justify-center">
        <div className="text-center px-12 py-24 text-yellow-50 max-w-lg">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">StyleNest</h1>
          <p className="text-sm sm:text-lg opacity-90 mb-6">Discover premium fashion picks — curated collections, fast delivery, and secure checkout.</p>

          <ul className="text-left space-y-3 mt-6">
            <li className="flex items-start gap-3">
              <span className="mt-1 bg-yellow-400 text-indigo-800 rounded-full px-2 py-1 text-xs font-semibold">1</span>
              <span className="text-sm">Handpicked collections from trusted brands</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 bg-yellow-400 text-indigo-800 rounded-full px-2 py-1 text-xs font-semibold">2</span>
              <span className="text-sm">Secure payments & buyer protection</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 bg-yellow-400 text-indigo-800 rounded-full px-2 py-1 text-xs font-semibold">3</span>
              <span className="text-sm">Easy returns within 30 days</span>
            </li>
          </ul>
        </div>
      </div>

      {/* RIGHT: Card */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-6 text-center">
            <div className="mx-auto w-14 h-14 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-lg shadow-md">SN</div>
            <h2 className="text-2xl font-bold mt-4">Welcome back</h2>
            <p className="text-sm text-gray-500 mt-1">Sign in to continue to StyleNest</p>
          </div>

          {/* Tabs */}
          <div className="flex mb-4 bg-gray-50 rounded-lg p-1">
            {['login', 'register'].map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setMessage(''); }}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition ${activeTab === tab ? 'bg-white shadow-sm text-primary' : 'text-gray-500'}`}>
                {tab === 'login' ? 'Sign in' : 'Create account'}
              </button>
            ))}
          </div>

          {message && (
            <p className={`text-center text-sm mb-4 ${messageType === 'success' ? 'text-green-600' : 'text-red-500'}`}>{message}</p>
          )}

          {/* LOGIN */}
          {activeTab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-xs text-gray-600 mb-1 block">Email</label>
                <input
                  name="email"
                  placeholder="you@domain.com"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-blue-200 outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-gray-600 mb-1 block">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    className="w-full border border-gray-200 p-3 rounded-lg pr-10 focus:ring-2 focus:ring-blue-200 outline-none"
                  />
                  <button type="button" className="absolute right-3 top-3 text-gray-400" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff /> : <Eye />}</button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-600">
                  <input type="checkbox" className="h-4 w-4" /> Remember me
                </label>
                <button type="button" className="text-primary font-medium">Forgot?</button>
              </div>

              <button disabled={loading} className="w-full py-3 rounded-lg bg-primary text-white font-semibold shadow-md hover:opacity-95">
                {loading ? 'Signing in...' : 'Sign in'}
              </button>

              <div className="flex items-center gap-3 mt-2">
                <div className="flex-1 h-px bg-gray-200" />
                <div className="text-xs text-gray-400">or continue with</div>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              <div className="flex gap-3 mt-3">
                <button type="button" className="flex-1 py-2 rounded-lg border border-gray-200 text-sm">Continue with Google</button>
                <button type="button" className="py-2 px-3 rounded-lg border border-gray-200 text-sm">Apple</button>
              </div>
            </form>
          )}

          {/* REGISTER */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegister} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="First name" onChange={(e) => setRegisterData({ ...registerData, first_name: e.target.value })} className="w-full border border-gray-200 p-3 rounded-lg" />
                <input placeholder="Last name" onChange={(e) => setRegisterData({ ...registerData, last_name: e.target.value })} className="w-full border border-gray-200 p-3 rounded-lg" />
              </div>
              <input placeholder="Email" onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })} className="w-full border border-gray-200 p-3 rounded-lg" />
              <input placeholder="Phone" onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })} className="w-full border border-gray-200 p-3 rounded-lg" />
              <input type="password" placeholder="Password" onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })} className="w-full border border-gray-200 p-3 rounded-lg" />
              <input type="password" placeholder="Confirm password" onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })} className="w-full border border-gray-200 p-3 rounded-lg" />

              <button disabled={loading} className="w-full py-3 rounded-lg bg-primary text-white font-semibold shadow-md">{loading ? 'Creating...' : 'Create account'}</button>
            </form>
          )}

          <p className="text-center text-xs text-gray-400 mt-6">🔒 Your login information is protected. By continuing you agree to our Terms of Service.</p>
        </div>
      </div>
    </div>
  );
}
