import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft, CheckCircle } from "lucide-react";
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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-primary text-white py-4 px-4 flex items-center gap-4 shadow-md">
        <button onClick={() => navigate("/")} className="flex items-center gap-2 hover:opacity-80 p-2 rounded">
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <h1 className="text-2xl font-bold">StyleNest</h1>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* LEFT SIDE - BENEFITS */}
          <div className="hidden md:flex flex-col justify-center space-y-6 bg-gradient-to-br from-primary via-primary to-primary text-white p-8 rounded-lg shadow-lg">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Your StyleNest Account</h2>
              <p className="text-white/80">Sign in to manage your shopping experience</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-3">
                <CheckCircle size={24} className="flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold">Track Your Orders</h3>
                  <p className="text-sm text-white/80">Get real-time updates on your purchases</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle size={24} className="flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold">Easy Returns</h3>
                  <p className="text-sm text-white/80">Hassle-free return process</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle size={24} className="flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold">Wishlist & Saved Items</h3>
                  <p className="text-sm text-white/80">Keep your favorite products in one place</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle size={24} className="flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold">Exclusive Deals</h3>
                  <p className="text-sm text-white/80">Get personalized offers</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - FORM */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* TAB SWITCH */}
            <div className="flex gap-4 mb-8 border-b">
              <button
                onClick={() => { setTab("login"); setMessage(""); setOtpSent(false); }}
                className={`pb-4 font-semibold text-lg transition ${
                  tab === "login"
                    ? "border-b-2 border-primary text-primary"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => { setTab("register"); setMessage(""); }}
                className={`pb-4 font-semibold text-lg transition ${
                  tab === "register"
                    ? "border-b-2 border-primary text-primary"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                Register
              </button>
            </div>

            {/* MESSAGE DISPLAY */}
            {message && (
              <div className={`mb-4 p-4 rounded-lg ${
                messageType === "success"
                  ? "bg-green-100 text-green-800 border border-green-300"
                  : "bg-red-100 text-red-800 border border-red-300"
              }`}>
                {message}
              </div>
            )}

            {/* LOGIN FORM */}
            {tab === "login" ? (
              <form onSubmit={handleLogin} className="space-y-4">
                {/* METHOD SWITCH */}
                <div className="flex gap-4 mb-6">
                  <button
                    type="button"
                    onClick={() => { setMethod("email"); setOtpSent(false); }}
                    className={`flex-1 py-3 rounded-lg font-semibold transition ${
                      method === "email"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Email & Password
                  </button>
                  <button
                    type="button"
                    onClick={() => setMethod("otp")}
                    className={`flex-1 py-3 rounded-lg font-semibold transition ${
                      method === "otp"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Mobile OTP
                  </button>
                </div>

                {/* EMAIL & PASSWORD LOGIN */}
                {method === "email" && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter password (min 8 characters)"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {/* MOBILE OTP LOGIN */}
                {method === "otp" && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="Enter 10-digit mobile number"
                        maxLength="10"
                        disabled={otpSent}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
                      />
                    </div>

                    {otpSent && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Enter OTP
                        </label>
                        <input
                          type="text"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          placeholder="6-digit OTP"
                          maxLength="6"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-center text-lg tracking-widest"
                        />
                        <p className="text-xs text-gray-500 mt-2">OTP valid for 10 minutes</p>
                      </div>
                    )}
                  </>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 rounded-lg font-semibold text-white transition ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-primary hover:opacity-90"
                  }`}
                >
                  {loading ? "Processing..." : otpSent ? "Verify OTP" : method === "otp" ? "Send OTP" : "Login"}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  By signing in, you agree to our Terms & Conditions and Privacy Policy
                </p>
              </form>
            ) : (
              /* REGISTER FORM */
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    value={regMobile}
                    onChange={(e) => setRegMobile(e.target.value)}
                    placeholder="10-digit mobile number"
                    maxLength="10"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showRegPassword ? "text" : "password"}
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Min 8 characters"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => setShowRegPassword(!showRegPassword)}
                      className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                    >
                      {showRegPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 rounded-lg font-semibold text-white transition ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-primary hover:opacity-90"
                  }`}
                >
                  {loading ? "Creating Account..." : "Register"}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  By registering, you agree to our Terms & Conditions and Privacy Policy
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}