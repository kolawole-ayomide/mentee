import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../context/UserContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { saveUser } = useUser();

  const [email, setEmail]               = useState("");
  const [password, setPassword]         = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError]               = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all required credentials.");
      return;
    }

    const stored = localStorage.getItem("vmpUser");
    if (!stored) {
      setError("No account found. Please sign up first.");
      return;
    }

    try {
      const user = JSON.parse(stored);
      if (user.email && user.email.toLowerCase() !== email.toLowerCase()) {
        setError("No account found with this email. Please sign up first.");
        return;
      }

      // ── saves user to context so Dashboard renders name immediately ──
      saveUser(user);

      // ── CHANGED: set session flag so ProtectedRoute knows user is logged in ──
      // ── sessionStorage clears automatically when browser tab is closed ──
      sessionStorage.setItem("vmpSession", "true");

    } catch {
      setError("Something went wrong. Please sign up again.");
      return;
    }

    // ── CHANGED: replace:true so back button cannot return to login after entering dashboard ──
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white font-sans antialiased select-none">
      <div className="hidden lg:flex lg:w-[42%] bg-[#2D2322] relative flex-col justify-between overflow-hidden">
        <img
          src="/logingirl.png"
          alt="Professional working with a tablet device"
          className="w-full h-full object-cover absolute inset-0 z-10"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop";
          }}
        />
        <div className="absolute inset-0 bg-black/5 pointer-events-none z-20" />
      </div>

      <div className="w-full lg:w-[58%] flex flex-col justify-between relative bg-white min-h-screen lg:min-h-0">
        <div className="w-full h-1.5 bg-gray-50 absolute top-0 left-0 right-0" />

        <div className="max-w-xl w-full mx-auto px-6 sm:px-12 lg:px-16 py-12 my-auto space-y-6">
          <div className="flex justify-center">
            <img
              src="/companyLogo.png"
              alt="EKEDC Logo"
              className="h-11 w-auto object-contain"
              onError={(e) => {
                e.target.src = "https://placehold.co/155x50?text=EKEDC+Logo";
              }}
            />
          </div>

          <div className="space-y-2 text-center">
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Login</h2>
            <p className="text-[11px] sm:text-xs text-gray-500 max-w-xs mx-auto leading-relaxed font-normal">
              Your journey to growth and success continues here. Please enter
              your credentials to access your mentoring profile and connect with
              your mentor
            </p>
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-xs text-red-600 font-medium text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1 text-left">
              <label className="text-[11px] font-bold text-gray-700 block">
                Work Email Address <span className="text-[#C11224]">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                placeholder="Enter your official email address"
                className="w-full text-xs p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 bg-white placeholder-gray-300 transition-all text-gray-900 font-normal"
                required
              />
            </div>

            <div className="space-y-1 text-left">
              <label className="text-[11px] font-bold text-gray-700 block">
                Password <span className="text-[#C11224]">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  placeholder="Enter your password"
                  className="w-full text-xs p-3 pr-11 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 bg-white placeholder-gray-300 transition-all text-gray-900 font-normal"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors bg-transparent border-none cursor-pointer select-none"
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="w-full bg-[#C11224] hover:bg-[#A00F1E] text-white py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 active:scale-[0.99] cursor-pointer shadow-sm"
              >
                Login
              </button>
            </div>

            <div className="text-center pt-1">
              <span className="text-[11px] sm:text-xs text-gray-500 font-normal">
                Don't have an account as a Mentee?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/signup")}
                  className="text-[#C11224] font-bold hover:underline bg-transparent border-none p-0 cursor-pointer"
                >
                  Sign up
                </button>
              </span>
            </div>

            <div className="text-center pt-3">
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-xs text-gray-600 font-bold hover:text-[#C11224] transition-colors bg-transparent border-none p-0 cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>
          </form>
        </div>

        <div className="text-center pb-4 text-[10px] text-gray-400 font-normal">
          © 2026 EXEDC Virtual Mentoring Portal. All rights reserved.
        </div>
      </div>
    </div>
  );
}