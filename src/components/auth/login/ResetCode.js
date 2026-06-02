// src/components/auth/login/ResetCode.js
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function ResetCodePage() {
  const navigate = useNavigate();

  // 4-Digit entry management state arrays
  const [code, setCode] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  // Outputs a simulated testing verification code directly to developer terminal logs
  useEffect(() => {
    const testResetCode = Math.floor(1000 + Math.random() * 9000).toString();
    console.log("-----------------------------------------");
    console.log(
      `[EKEDC SECURITY] Your Password Reset Code is: ${testResetCode}`,
    );
    console.log("-----------------------------------------");
  }, []);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    let newCode = [...code];
    newCode[index] = element.value;
    setCode(newCode);

    // Auto-focus move forward to next contiguous block node box
    if (element.value !== "" && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Delete handling: shifts emphasis backward cleanly
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredCode = code.join("");

    if (enteredCode.length < 4) {
      alert("Please complete the 4-digit reset verification code inputs.");
      return;
    }

    // Direct entry path forward into your responsive password input view
    navigate("/password-reset-entry");
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white font-sans antialiased select-none">
      {/* LEFT COLUMN PANEL: Image hides completely on mobile/tablet screens and expands seamlessly strictly on desktop views (lg:flex) */}
      <div className="hidden lg:flex lg:w-[42%] bg-[#F9F9F9] relative flex-col justify-between overflow-hidden">
        {/* Step Back Action Trigger -> routes to previous context view (ForgetPassword.js) */}
        <button
          type="button"
          onClick={() => navigate("/forgot-password")}
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
          alt="Illustration of character holding safety security key"
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
          {/* Corporate Header Identity Identity Brand Logo */}
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

          {/* Heading Text Content Notification Labels */}
          <div className="space-y-2 text-center">
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">
              Reset Code Sent!
            </h2>
            <p className="text-[11px] sm:text-xs text-gray-500 max-w-xs mx-auto leading-relaxed font-normal">
              We've sent a unique reset code to your email address. Please check
              your inbox (and spam folder) for an email from us.
            </p>
          </div>

          {/* Verification Code Box Entries Matrix Block Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Horizontal Segment Entry Fields Grid block matching global styling criteria */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 py-2">
              {code.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  ref={(el) => (inputRefs.current[index] = el)}
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onFocus={(e) => e.target.select()}
                  className="w-14 h-16 sm:w-16 sm:h-20 text-center text-xl font-bold border border-gray-200 rounded-xl bg-white shadow-xs focus:outline-none focus:ring-1 focus:ring-[#C11224] focus:border-[#C11224] transition-all text-gray-900"
                />
              ))}
            </div>

            {/* Commit Form Verification CTA Operation Buttons */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#C11224] hover:bg-[#A00F1E] text-white py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 active:scale-[0.99] cursor-pointer shadow-sm"
              >
                Verify Code
              </button>
            </div>
          </form>
        </div>

        {/* Global minimal base system copyright line */}
        <div className="text-center pb-4 text-[10px] text-gray-400 font-normal">
          © 2026 EXEDC Virtual Mentoring Portal. All rights reserved.
        </div>
      </div>
    </div>
  );
}
