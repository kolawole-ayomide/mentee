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
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white font-sans antialiased">
      {/* LEFT SIDE: ILLUSTRATIVE COVER PANEL AREA */}
      <div className="w-full md:w-[45%] bg-[#F9F9F9] relative flex items-center justify-center min-h-[300px] md:min-h-screen p-6 md:p-12 overflow-hidden">
        {/* Step Back Action Trigger -> routes to previous context view (ForgetPassword.js) */}
        <button
          type="button"
          onClick={() => navigate("/forgot-password")}
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

        {/* Vector Mockup Artwork scaling accurately to match image_0bb488.png parameters */}
        <div className="relative w-full max-w-sm sm:max-w-md h-auto flex items-center justify-center z-10">
          <img
            src="/key.png"
            alt="Illustration of character holding safety security key"
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

      {/* RIGHT SIDE: AUTH MATRIX ACTIONS PANEL */}
      <div className="w-full md:w-[55%] flex flex-col justify-between relative bg-white">
        {/* Continuous border alignment element line */}
        <div className="w-full h-1.5 bg-[#FDE8E9] absolute top-0 left-0 right-0" />

        {/* Dynamic Context Block Wrapper */}
        <div className="max-w-md w-full mx-auto px-6 sm:px-12 md:px-6 py-12 my-auto space-y-8 text-center">
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
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">
              Reset Code Sent!
            </h2>
            <p className="text-[11px] sm:text-xs text-gray-500 max-w-xs mx-auto leading-relaxed font-normal">
              We've sent a unique reset code to your email address. Please check
              your inbox (and spam folder) for an email from us.
            </p>
          </div>

          {/* Verification Code Box Entries Matrix Block Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Horizontal Segment Entry Fields Grid block matching image_0bb488.png */}
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
                  className="w-14 h-14 sm:w-16 sm:h-16 text-center text-lg font-bold border border-gray-200 rounded-lg bg-white shadow-xs focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-all text-gray-900"
                />
              ))}
            </div>

            {/* Commit Form Verification CTA Operation Buttons */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#C11224] hover:bg-[#A00F1E] text-white py-3.5 px-4 rounded-xl font-semibold text-xs sm:text-sm tracking-wide transition-all duration-200 active:scale-[0.99] cursor-pointer shadow-sm"
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
