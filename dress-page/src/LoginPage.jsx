import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

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
    </div>
  );
}
