// src/components/auth/login/VerificationSucessful.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VerificationSucessfulPage() {
  const navigate = useNavigate();

  // Input States
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      alert("Please fill in all password verification criteria fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match. Please verify your entries.");
      return;
    }

    // Navigates smoothly forward to your PasswordRestSuccessful confirmation layout view!
    navigate("/password-reset-success");
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white font-sans antialiased">
      {/* LEFT SIDE: GRAPHIC PRESENTATION ILLUSTRATION PANEL */}
      <div className="w-full md:w-[45%] bg-[#F9F9F9] relative flex items-center justify-center min-h-[300px] md:min-h-screen p-6 md:p-12 overflow-hidden">
        {/* Back navigation out to code matrix validation point */}
        <button
          type="button"
          onClick={() => navigate("/reset-code")}
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

        {/* Vector Asset matching image_0ba54a.png */}
        <div className="relative w-full max-w-sm sm:max-w-md h-auto flex items-center justify-center z-10">
          <img
            src="/key.png"
            alt="Illustration of character tracking keys"
            className="max-h-[65vh] max-w-[85%] object-contain"
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop";
              e.target.className =
                "w-[80%] max-h-[40vh] object-cover rounded-xl opacity-70";
            }}
          />
        </div>
      </div>

      {/* RIGHT SIDE: PASSWORD UPDATE ENTRY PANEL */}
      <div className="w-full md:w-[55%] flex flex-col justify-between relative bg-white">
        {/* Fine styling upper element border */}
        <div className="w-full h-1.5 bg-[#FDE8E9] absolute top-0 left-0 right-0" />

        {/* Card Entry Wrapper Layout Frame */}
        <div className="max-w-md w-full mx-auto px-6 sm:px-12 md:px-6 py-12 my-auto space-y-8 text-center md:text-left">
          {/* Corporate Identity Brand Header */}
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

          {/* Heading Description Blocks */}
          <div className="space-y-2 text-center">
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">
              Verification Successful!
            </h2>
            <p className="text-[11px] sm:text-xs text-gray-500 max-w-xs mx-auto leading-relaxed font-normal">
              Your code has been verified successfully. Now, please create a new
              password for your account.
            </p>
          </div>

          {/* New Password Registration Fields */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* New Password Input Field */}
            <div className="space-y-1.5 text-left">
              <label className="text-[11px] font-bold text-gray-700 tracking-wide block">
                New Password <span className="text-[#C11224]">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create your new password"
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
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542 7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Confirm New Password Input Field */}
            <div className="space-y-1.5 text-left">
              <label className="text-[11px] font-bold text-gray-700 tracking-wide block">
                Confirm New Password <span className="text-[#C11224]">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your new password"
                  className="w-full text-xs p-3.5 pr-11 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 bg-white placeholder-gray-300 transition-all text-gray-900 font-normal"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors bg-transparent border-none cursor-pointer select-none"
                >
                  {showConfirmPassword ? (
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

            {/* Form CTA Submission Trigger Button */}
            <div className="pt-3">
              <button
                type="submit"
                className="w-full bg-[#C11224] hover:bg-[#A00F1E] text-white py-3.5 px-4 rounded-xl font-semibold text-xs sm:text-sm tracking-wide transition-all duration-200 active:scale-[0.99] cursor-pointer shadow-sm"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>

        {/* Global base minimal dashboard footer notice */}
        <div className="text-center pb-4 text-[10px] text-gray-400 font-normal">
          © 2026 EXEDC Virtual Mentoring Portal. All rights reserved.
        </div>
      </div>
    </div>
  );
}
