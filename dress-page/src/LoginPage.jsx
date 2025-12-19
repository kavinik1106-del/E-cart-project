import React, { useState } from "react";
import Navbar from "./Navbar.jsx";

function LoginPage() {
  const [method, setMethod] = useState("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);

  /* ---------- VALIDATION ---------- */
  const validateEmail = (v) => {
    if (!v) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))
      return "Enter a valid email address";
    return "";
  };

  const validatePassword = (v) => {
    if (!v) return "Password is required";
    if (v.length < 8)
      return "Password must be at least 8 characters";
    return "";
  };

  const validateMobile = (v) => {
    if (!v) return "Mobile number is required";
    if (!/^[6-9]\d{9}$/.test(v))
      return "Enter a valid 10-digit mobile number";
    return "";
  };

  const passwordStrength = () => {
    if (password.length < 6) return "Weak";
    if (/[A-Z]/.test(password) && /\d/.test(password)) return "Strong";
    return "Medium";
  };

  /* ---------- SUBMIT ---------- */
  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (method === "email") {
      newErrors.email = validateEmail(email);
      newErrors.password = validatePassword(password);
    } else {
      newErrors.mobile = validateMobile(mobile);
      if (!otp) newErrors.otp = "OTP is required";
    }

    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Login successful ✅ (Demo)");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* HERO */}
      <section className="bg-pink-600 text-white py-20 text-center">
        <h1 className="text-4xl font-bold">Sign in to StyleNest</h1>
        <p className="text-sm mt-3 opacity-90">
          Secure access to your orders, returns & saved items
        </p>
      </section>

      {/* LOGIN CONTAINER */}
      <section className="max-w-4xl mx-auto -mt-16 bg-white rounded-2xl shadow-xl p-8">

        {/* METHOD SWITCH */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setMethod("email")}
            className={`px-6 py-2 text-sm font-semibold rounded-l-lg
              ${method === "email" ? "bg-pink-500 text-white" : "bg-gray-200"}`}
          >
            Email & Password
          </button>
          <button
            onClick={() => setMethod("otp")}
            className={`px-6 py-2 text-sm font-semibold rounded-r-lg
              ${method === "otp" ? "bg-pink-500 text-white" : "bg-gray-200"}`}
          >
            Mobile OTP
          </button>
        </div>

        {/* ERROR SUMMARY */}
        {Object.values(errors).some(Boolean) && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded mb-5">
            Please fix the errors below to continue.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* EMAIL LOGIN */}
          {method === "email" && (
            <>
              <div>
                <label className="text-sm font-medium">Email address</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched({ ...touched, email: true })}
                  className="w-full border p-3 rounded-lg mt-1"
                  placeholder="you@example.com"
                />
                {touched.email && errors.email && (
                  <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() =>
                      setTouched({ ...touched, password: true })
                    }
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

                {password && (
                  <p className="text-xs mt-1">
                    Password strength:
                    <span className={`ml-1 font-semibold
                      ${passwordStrength() === "Strong"
                        ? "text-green-600"
                        : passwordStrength() === "Medium"
                        ? "text-yellow-600"
                        : "text-red-600"}`}>
                      {passwordStrength()}
                    </span>
                  </p>
                )}

                {touched.password && errors.password && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.password}
                  </p>
                )}
              </div>
            </>
          )}

          {/* OTP LOGIN */}
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
                {errors.mobile && (
                  <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium">OTP</label>
                <input
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full border p-3 rounded-lg mt-1"
                  placeholder="Enter OTP"
                />
                {errors.otp && (
                  <p className="text-xs text-red-500 mt-1">{errors.otp}</p>
                )}
              </div>
            </>
          )}

          {/* REMEMBER */}
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" className="accent-pink-500" />
            Remember this device
          </label>

          {/* BUTTON */}
          <button
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold
              ${loading
                ? "bg-gray-300"
                : "bg-pink-500 text-white hover:bg-pink-600"}`}
          >
            {loading ? "Verifying..." : "Login securely"}
          </button>

          {/* LEGAL */}
          <p className="text-xs text-gray-500 text-center">
            By continuing, you agree to StyleNest’s Terms of Use & Privacy Policy
          </p>
        </form>
      </section>

      {/* HELP & SECURITY */}
      <section className="max-w-4xl mx-auto mt-12 px-4 text-sm text-gray-600">
        <h3 className="font-semibold text-gray-800 mb-2">Need help logging in?</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Forgot password or email?</li>
          <li>Didn’t receive OTP?</li>
          <li>Account locked for security reasons</li>
        </ul>

        <p className="mt-4">
          🔒 Your login information is protected using industry-standard
          encryption.
        </p>
      </section>

      {/* FOOTER */}
      <footer className="text-center text-xs text-gray-500 py-10">
        © 2025 StyleNest · Secure Login · Trusted by millions
      </footer>
    </div>
  );
}

export default LoginPage;
