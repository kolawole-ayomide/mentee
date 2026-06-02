// src/components/auth/login/ForgetPassword.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgetPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter a valid work email address.");
      return;
    }

    // Routes perfectly to your 4-digit layout screen inside your ResetCode file component
    navigate("/reset-code");
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white font-sans antialiased">
      {/* LEFT SIDE: ILLUSTRATIVE ART PANEL */}
      <div className="w-full md:w-[45%] bg-[#F9F9F9] relative flex items-center justify-center min-h-[300px] md:min-h-screen p-6 md:p-12 overflow-hidden">
        {/* Back Button -> Safely routes back to your login screen */}
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="absolute top-6 left-6 flex items-center gap-2 text-xs font-semibold text-[#1A202C] hover:text-[#C11224] transition-colors cursor-pointer select-none z-20"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back
        </button>

        {/* Vector Artwork matching image_0c0ec2.png */}
        <div className="relative w-full max-w-sm sm:max-w-md h-auto flex items-center justify-center z-10">
          <img
            src="/key.png"
            alt="Illustration of character carrying a security key code"
            className="max-h-[65vh] max-w-[85%] object-contain"
            onError={(e) => {
              // Reliable crisp fallback image for recovery representation
              e.target.src =
                "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop";
              e.target.className =
                "w-[80%] max-h-[40vh] object-cover rounded-xl opacity-70";
            }}
          />
        </div>
      </div>

      {/* RIGHT SIDE: PASSWORD RECOVERY ACTION COMPONENT */}
      <div className="w-full md:w-[55%] flex flex-col justify-between relative bg-white">
        {/* Fine top styling alignment line */}
        <div className="w-full h-1.5 bg-[#FDE8E9] absolute top-0 left-0 right-0" />

        {/* Central Card Wrapper */}
        <div className="max-w-md w-full mx-auto px-6 sm:px-12 md:px-6 py-12 my-auto space-y-8 text-center md:text-left">
          {/* Corporate EKEDC Logo Header */}
          <div className="flex justify-center">
            <img
              src="/companyLogo.png"
              alt="EKEDC Logo"
              className="h-11 w-auto object-contain"
              onError={(e) => {
                e.target.src = "https://placehold.co/140x45?text=EKEDC+Logo";
              }}
            />
          </div>

          {/* Heading Information Texts */}
          <div className="space-y-2 text-center">
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">
              Forgot your password?
            </h2>
            <p className="text-[11px] sm:text-xs text-gray-500 max-w-xs mx-auto leading-relaxed font-normal">
              No worries! We'll help you reset your password securely. Please
              provide the email address associated with your account
            </p>
          </div>

          {/* Request Submission Input Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Input Node Entry Field */}
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

            {/* Form CTA Push Submission Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#C11224] hover:bg-[#A00F1E] text-white py-3.5 px-4 rounded-xl font-semibold text-xs sm:text-sm tracking-wide transition-all duration-200 active:scale-[0.99] cursor-pointer shadow-sm"
              >
                Send Reset Code
              </button>
            </div>
          </form>
        </div>

        {/* Global base system footer notice */}
        <div className="text-center pb-4 text-[10px] text-gray-400 font-normal">
          © 2026 EXEDC Virtual Mentoring Portal. All rights reserved.
        </div>
      </div>
    </div>
  );
}
