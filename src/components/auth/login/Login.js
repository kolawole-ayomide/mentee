// src/components/auth/login/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  // Input states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in all required credentials.");
      return;
    }

    // Direct entry straight to dashboard ecosystem upon successful form post
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white font-sans antialiased">
      {/* LEFT SIDE: ILLUSTRATIVE ART PANEL / BRAND IMAGE */}
      <div className="w-full md:w-[47%] relative min-h-[350px] md:min-h-screen overflow-hidden bg-[#2D2322]">
        <img
          src="/logingirl.png"
          alt="Professional working with a tablet device"
          className="w-full h-full object-cover object-center"
          onError={(e) => {
            // Graceful high-quality fallback mapping to image_0c82e0.jpg layout parameters
            e.target.src =
              "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop";
          }}
        />
        {/* Subtle overlay shading to ensure uniform depth match */}
        <div className="absolute inset-0 bg-black/5 pointer-events-none" />
      </div>

      {/* RIGHT SIDE: INTERACTIVE LOGIN CONTROL BLOCK */}
      <div className="w-full md:w-[53%] flex flex-col justify-between relative bg-[#FAFAFA] md:bg-white">
        {/* Top visual continuity element spacer */}
        <div className="w-full h-1 bg-gray-100 md:hidden" />

        {/* Form Container Wrapper */}
        <div className="max-w-md w-full mx-auto px-6 sm:px-12 md:px-10 lg:px-16 py-12 md:py-16 my-auto space-y-8 text-center md:text-left">
          {/* Corporate Identity Brand Header */}
          <div className="flex justify-center">
            <img
              src="/companyLogo.png"
              alt="EKEDC Logo"
              className="h-12 w-auto object-contain"
              onError={(e) => {
                e.target.src = "https://placehold.co/155x50?text=EKEDC+Logo";
              }}
            />
          </div>

          {/* Heading Context Description Labels */}
          <div className="space-y-2 text-center">
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">
              Login
            </h2>
            <p className="text-[11px] sm:text-xs text-gray-500 max-w-xs mx-auto leading-relaxed font-normal">
              Your journey to growth and success continues here. Please enter
              your credentials to access your mentoring profile and connect with
              your mentor
            </p>
          </div>

          {/* Core Login Information Input Fields */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Address Block Node */}
            <div className="space-y-1.5 text-left">
              <label className="text-[11px] font-bold text-gray-700 tracking-wide block">
                Work Email Address <span className="text-[#C11224]">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your official email address"
                className="w-full text-xs p-3.5 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 bg-white placeholder-gray-300 transition-all text-gray-900 font-normal"
                required
              />
            </div>

            {/* Password Entry Block with integrated toggle element eye button */}
            <div className="space-y-1.5 text-left">
              <label className="text-[11px] font-bold text-gray-700 tracking-wide block">
                Password <span className="text-[#C11224]">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full text-xs p-3.5 pr-11 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 bg-white placeholder-gray-300 transition-all text-gray-900 font-normal"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors bg-transparent border-none cursor-pointer select-none"
                >
                  {showPassword ? (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.8"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.8"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.8"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Commit Login Operation Action Trigger */}
            <div className="pt-3">
              <button
                type="submit"
                className="w-full bg-[#C11224] hover:bg-[#A00F1E] text-white py-3.5 px-4 rounded-xl font-semibold text-xs sm:text-sm tracking-wide transition-all duration-200 active:scale-[0.99] cursor-pointer shadow-sm"
              >
                Login
              </button>
            </div>

            {/* Alternating Sign Up Switch Hyperlink Option */}
            <div className="text-center pt-2">
              <span className="text-[11px] text-gray-500 font-normal">
                Don't have an account as a Mentee?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/signup")}
                  className="text-[#C11224] font-semibold hover:underline bg-transparent border-none p-0 cursor-pointer"
                >
                  Sign up
                </button>
              </span>
            </div>

            {/* Password Retrieval Node Link */}
            <div className="text-center pt-4">
              <button
                type="button"
                onClick={() => navigate("/forgot-password")} // <-- NAVIGATES PERFECTLY TO YOUR FORGOT PASSWORD FILE
                className="text-xs text-gray-700 font-semibold hover:text-[#C11224] transition-colors bg-transparent border-none p-0 cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>
          </form>
        </div>

        {/* Global base dashboard layout minimal system line */}
        <div className="text-center pb-4 text-[10px] text-gray-400 font-normal">
          © 2026 EXEDC Virtual Mentoring Portal. All rights reserved.
        </div>
      </div>
    </div>
  );
}
