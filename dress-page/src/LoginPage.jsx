import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft, CheckCircle, AlertCircle, Lock, Mail, Phone, User } from "lucide-react";
import { apiCall, API_ENDPOINTS } from './config/apiConfig.js';

// Email validation regex
const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Mobile validation (10 digits)
const isValidMobile = (mobile) => {
  return /^\d{10}$/.test(mobile);
};

export default function LoginPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("login");
  const [method, setMethod] = useState("email");
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regMobile, setRegMobile] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    
    try {
      if (method === "email") {
        // Validation
        if (!email || !password) {
          setMessage("Please enter email and password");
          setMessageType("error");
          setLoading(false);
          return;
        }

        if (!isValidEmail(email)) {
          setMessage("Please enter a valid email address");
          setMessageType("error");
          setLoading(false);
          return;
        }

        if (password.length < 6) {
          setMessage("Password must be at least 6 characters");
          setMessageType("error");
          setLoading(false);
          return;
        }
        
        const data = await apiCall(API_ENDPOINTS.LOGIN, {
          method: "POST",
          body: JSON.stringify({ email, password })
        });

        console.log('Login API Response:', data); // Debug log

        if (data && data.success) {
          localStorage.setItem("user", JSON.stringify(data.data.user));
          localStorage.setItem("token", data.data.token);
          setMessage("Login successful! Redirecting...");
          setMessageType("success");
          window.dispatchEvent(new Event('userUpdated'));
          setTimeout(() => { navigate("/"); }, 800);
        } else {
          setMessage(data?.message || "Login failed. Please check your credentials.");
          setMessageType("error");
        }
      } else {
        if (otpSent) {
          if (!otp || otp.length !== 6) {
            setMessage("Please enter a valid 6-digit OTP");
            setMessageType("error");
          } else {
            setMessage("OTP verified successfully!");
            setMessageType("success");
            setTimeout(() => navigate("/"), 1500);
          }
        } else {
          if (!mobile || !isValidMobile(mobile)) {
            setMessage("Please enter a valid 10-digit mobile number");
            setMessageType("error");
          } else {
            setOtpSent(true);
            setMessage("OTP sent to your phone!");
            setMessageType("success");
          }
        }
      }
    } catch (error) {
      setMessage("Network error. Please try again.");
      setMessageType("error");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    
    try {
      // Validation
      if (!firstName || !regEmail || !regMobile || !regPassword) {
        setMessage("Please fill all required fields");
        setMessageType("error");
        setLoading(false);
        return;
      }

      if (!isValidEmail(regEmail)) {
        setMessage("Please enter a valid email address");
        setMessageType("error");
        setLoading(false);
        return;
      }

      if (!isValidMobile(regMobile)) {
        setMessage("Please enter a valid 10-digit mobile number");
        setMessageType("error");
        setLoading(false);
        return;
      }
      
      if (regPassword.length < 8) {
        setMessage("Password must be at least 8 characters");
        setMessageType("error");
        setLoading(false);
        return;
      }

      if (regPassword !== regConfirmPassword) {
        setMessage("Passwords do not match");
        setMessageType("error");
        setLoading(false);
        return;
      }

      const res = await apiCall(API_ENDPOINTS.REGISTER, {
        method: 'POST',
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: regEmail,
          phone: regMobile,
          password: regPassword,
          confirmPassword: regConfirmPassword
        })
      });

      console.log('Register API Response:', res); // Debug log

      if (res && res.success) {
        setMessage('Registration successful! Please login with your credentials.');
        setMessageType('success');
        setTimeout(() => {
          setTab('login');
          setEmail(regEmail);
          setPassword('');
          setFirstName("");
          setLastName("");
          setRegEmail("");
          setRegMobile("");
          setRegPassword("");
          setRegConfirmPassword("");
          setMessage("");
        }, 2000);
      } else {
        setMessage(res?.message || 'Registration failed. Please try again.');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
      setMessageType('error');
      console.error("Register error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-primary text-white py-3 px-4 flex items-center gap-3 shadow-lg">
        <button onClick={() => navigate("/")} className="flex items-center gap-2 hover:opacity-80 p-1 rounded transition hover:bg-white/10">
          <ArrowLeft size={20} />
          <span className="font-semibold text-sm">Back</span>
        </button>
        <h1 className="text-xl font-bold">StyleNest</h1>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* FORM CARD */}
          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8">
            {/* WELCOME MESSAGE */}
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-primary mb-2">
                {tab === "login" ? "Welcome Back!" : "Join StyleNest"}
              </h2>
              <p className="text-gray-500 text-sm">
                {tab === "login" 
                  ? "Sign in to continue shopping" 
                  : "Create an account to get started"}
              </p>
            </div>

            {/* TAB SWITCH */}
            <div className="flex gap-2 mb-8 bg-gray-100 p-1.5 rounded-xl">
              <button
                onClick={() => { setTab("login"); setMessage(""); setOtpSent(false); }}
                className={`flex-1 py-2.5 px-4 rounded-lg font-bold text-sm transition duration-300 ${
                  tab === "login"
                    ? "bg-primary text-white shadow-lg"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => { setTab("register"); setMessage(""); }}
                className={`flex-1 py-2.5 px-4 rounded-lg font-bold text-sm transition duration-300 ${
                  tab === "register"
                    ? "bg-primary text-white shadow-lg"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                }`}
              >
                Register
              </button>
            </div>

            {/* MESSAGE DISPLAY */}
            {message && (
              <div className={`mb-5 p-4 rounded-xl flex items-start gap-3 text-sm font-medium ${
                messageType === "success"
                  ? "bg-green-50 text-green-800 border-l-4 border-green-500"
                  : "bg-red-50 text-red-800 border-l-4 border-red-500"
              }`}>
                {messageType === "success" ? (
                  <CheckCircle size={18} className="flex-shrink-0 mt-0.5 text-green-600" />
                ) : (
                  <AlertCircle size={18} className="flex-shrink-0 mt-0.5 text-red-600" />
                )}
                <p>{message}</p>
              </div>
            )}

            {/* LOGIN FORM */}
            {tab === "login" ? (
              <form onSubmit={handleLogin} className="space-y-5">
                {/* METHOD SWITCH */}
                <div className="flex gap-2 mb-5 bg-gray-100 p-1.5 rounded-xl">
                  <button
                    type="button"
                    onClick={() => { setMethod("email"); setOtpSent(false); }}
                    className={`flex-1 py-2 px-3 rounded-lg font-semibold text-xs transition duration-300 ${
                      method === "email"
                        ? "bg-primary text-white shadow-md"
                        : "bg-transparent text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Email
                  </button>
                  <button
                    type="button"
                    onClick={() => setMethod("otp")}
                    className={`flex-1 py-2 px-3 rounded-lg font-semibold text-xs transition duration-300 ${
                      method === "otp"
                        ? "bg-primary text-white shadow-md"
                        : "bg-transparent text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Mobile
                  </button>
                </div>

                {/* EMAIL & PASSWORD LOGIN */}
                {method === "email" && (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail size={16} className="absolute left-3 top-3 text-gray-400" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
                        Password
                      </label>
                      <div className="relative">
                        <Lock size={16} className="absolute left-3 top-3 text-gray-400" />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-10 pr-10 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 transition"
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-secondary cursor-pointer"
                        />
                        <span className="text-xs text-gray-600 font-medium">Remember me</span>
                      </label>
                      <a href="#" className="text-xs text-primary font-semibold hover:text-primary/80 transition">
                        Forgot password?
                      </a>
                    </div>
                  </>
                )}

                {/* MOBILE OTP LOGIN */}
                {method === "otp" && (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
                        Mobile Number
                      </label>
                      <div className="relative">
                        <Phone size={16} className="absolute left-3 top-3 text-gray-400" />
                        <input
                          type="tel"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                          placeholder="10-digit number"
                          maxLength="10"
                          disabled={otpSent}
                          className="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                        />
                      </div>
                    </div>

                    {otpSent && (
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
                          Enter OTP
                        </label>
                        <input
                          type="text"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          placeholder="6-digit"
                          maxLength="6"
                          className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent text-center tracking-widest transition"
                        />
                        <p className="text-xs text-gray-500 mt-1.5 text-center">OTP valid for 10 minutes</p>
                      </div>
                    )}
                  </>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 rounded-lg font-bold text-white text-sm transition duration-300 transform hover:scale-105 ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-secondary hover:bg-secondary/90 shadow-lg hover:shadow-xl"
                  }`}
                >
                  {loading ? "Processing..." : otpSent ? "Verify OTP" : method === "otp" ? "Send OTP" : "Login"}
                </button>

                <p className="text-xs text-gray-600 text-center mt-4">
                  By signing in, you agree to our <span className="text-primary font-semibold">Terms</span> and <span className="text-primary font-semibold">Privacy</span>
                </p>
              </form>
            ) : (
              /* REGISTER FORM */
              <form onSubmit={handleRegister} className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Mobile *
                  </label>
                  <input
                    type="tel"
                    value={regMobile}
                    onChange={(e) => setRegMobile(e.target.value)}
                    placeholder="10-digit"
                    maxLength="10"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showRegPassword ? "text" : "password"}
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Min 8 characters"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowRegPassword(!showRegPassword)}
                      className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 transition"
                    >
                      {showRegPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    placeholder="Re-enter"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-2 rounded-lg font-semibold text-white text-sm transition ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-secondary hover:opacity-90"
                  }`}
                >
                  {loading ? "Creating..." : "Register"}
                </button>

                <p className="text-xs text-gray-600 text-center mt-3">
                  By registering, you agree to our <span className="text-primary font-semibold">Terms</span> and <span className="text-primary font-semibold">Privacy</span>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
