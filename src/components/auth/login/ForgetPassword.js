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
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white font-sans antialiased select-none">
      {/* LEFT COLUMN PANEL: Image hides completely on mobile/tablet screens and expands seamlessly strictly on desktop views (lg:flex) */}
      <div className="hidden lg:flex lg:w-[42%] bg-[#F9F9F9] relative flex-col justify-between overflow-hidden">
        {/* Back Button -> Safely routes back to your login screen */}
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="absolute top-6 left-6 flex items-center gap-2 text-xs font-semibold text-[#1A202C] hover:text-[#C11224] transition-colors cursor-pointer z-20 bg-white/80 backdrop-blur-xs py-1.5 px-3 rounded-md shadow-xs"
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

        {/* Full Bleed Portrait Image Layer matching your exact responsive requirements */}
        <img
          src="/key.png"
          alt="Illustration of character carrying a security key code"
          className="w-full h-full object-cover absolute inset-0 z-10"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop";
          }}
        />
      </div>

      {/* RIGHT COLUMN PANEL: Handles full text/form space, centering beautifully across devices */}
      <div className="w-full lg:w-[58%] flex flex-col justify-between relative bg-white min-h-screen lg:min-h-0">
        {/* Continuous Flow Top Status Progress Bar Indicator */}
        <div className="w-full h-1.5 bg-[#FDE8E9] absolute top-0 left-0 right-0" />

        {/* Form Inner Content Wrapper */}
        <div className="max-w-xl w-full mx-auto px-6 sm:px-12 lg:px-16 py-12 my-auto space-y-6">
          {/* Corporate Brand Identity Badge */}
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

          {/* Heading Header Context Strings */}
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
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Input Node Entry Field */}
            <div className="space-y-1 text-left">
              <label className="text-[11px] font-bold text-gray-700 block">
                Work Email Address <span className="text-[#C11224]">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your official email address"
                className="w-full text-xs p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 bg-white placeholder-gray-300 transition-all text-gray-900 font-normal"
                required
              />
            </div>

            {/* Form CTA Push Submission Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#C11224] hover:bg-[#A00F1E] text-white py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 active:scale-[0.99] cursor-pointer shadow-sm"
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
