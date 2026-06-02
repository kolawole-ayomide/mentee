// src/components/auth/signup/Otp.js
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function OtpPage() {
  const navigate = useNavigate();

  // 4-Digit Array State for individual box manipulation
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  // Generate an automated testing code to output to developer tools console
  const generateAndLogOtp = () => {
    const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
    console.log("-----------------------------------------");
    console.log(`[EKEDC SECURITY] Your One-Time Passcode is: ${randomCode}`);
    console.log("-----------------------------------------");
    return randomCode;
  };

  // Trigger console log immediately when page mounts
  useEffect(() => {
    generateAndLogOtp();
  }, []);

  // Handle number insertions and auto-focus forwarding
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    let newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Auto-focus next box if value is filled
    if (element.value !== "" && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle backspacing keys smoothly
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleResend = () => {
    setOtp(["", "", "", ""]);
    inputRefs.current[0].focus();
    generateAndLogOtp();
    alert(
      "A new 4-digit security code has been sent to your official email and logged to your console.",
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");

    if (enteredOtp.length < 4) {
      alert("Please complete the 4-digit code entries.");
      return;
    }

    // SUCCESSFUL ROUTE TRANSITION: Routes straight to verification success page!
    navigate("/verification-success");
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white font-sans antialiased">
      {/* LEFT SIDE: ILLUSTRATIVE COVER HERO ARTWORK PANEL */}
      <div className="w-full md:w-[45%] bg-[#EAEAEA] relative flex items-end justify-center min-h-[320px] md:min-h-screen p-6 md:p-0 overflow-hidden">
        {/* Back Button -> steps backward safely to profile data assembly screen (Upload.js) */}
        <button
          type="button"
          onClick={() => navigate("/upload")}
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

        {/* Vector Mockup Container matching image parameters */}
        <div className="relative w-full h-[85%] md:h-[80%] flex items-end justify-center z-10 p-4">
          <img
            src="/email.png"
            alt="Secure laptop post mailbox asset layout illustrations"
            className="max-h-full max-w-[85%] md:max-w-[90%] object-contain object-bottom"
            onError={(e) => {
              // Perfect fall-back image mapping directly to style standards
              e.target.src =
                "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&auto=format&fit=crop";
              e.target.className =
                "w-[85%] h-[75%] object-cover rounded-xl shadow-xs opacity-90";
            }}
          />
        </div>
      </div>

      {/* RIGHT SIDE: AUTHENTICATION MATRIX GRID DISPLAY COMPONENT */}
      <div className="w-full md:w-[55%] flex flex-col justify-between relative bg-white">
        {/* Continuous Flow Top Status Progress Bar Indicator (Filled 75% across onboarding) */}
        <div className="w-full h-1.5 bg-[#FDE8E9] flex">
          <div className="w-[75%] h-full bg-[#C11224]"></div>
        </div>

        {/* Main Interface Action Wrapper */}
        <div className="max-w-xl w-full mx-auto px-6 sm:px-12 md:px-16 py-12 my-auto space-y-8 text-center md:text-left">
          {/* Company Brand Logo Header Block */}
          <div className="flex justify-center md:justify-start">
            <img
              src="/companyLogo.png"
              alt="EKEDC Logo"
              className="h-10 w-auto object-contain"
              onError={(e) => {
                e.target.src = "https://placehold.co/140x45?text=EKEDC+Logo";
              }}
            />
          </div>

          {/* Heading Description Text Context Blocks */}
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              Enter OTP Code
            </h2>
            <p className="text-xs text-gray-500 max-w-md leading-relaxed">
              Please enter the 4-digit One-Time Password (OTP) sent{" "}
              <span className="font-semibold text-gray-800">to your email</span>
              . This code is displayed in your browser console for testing
              purposes. Thank you!
            </p>
          </div>

          {/* Central Security Code Matrix Block Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Split Individual Character Entry Node boxes */}
            <div className="flex items-center justify-center md:justify-start gap-3 sm:gap-4 py-2">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  ref={(el) => (inputRefs.current[index] = el)}
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onFocus={(e) => e.target.select()}
                  className="w-14 h-16 sm:w-16 sm:h-20 text-center text-xl font-bold border border-gray-300 rounded-xl bg-white shadow-xs focus:outline-none focus:ring-2 focus:ring-[#C11224] focus:border-[#C11224] transition-all text-gray-900"
                />
              ))}
            </div>

            {/* Alternating Resend Prompt Option Line links */}
            <div className="text-center md:text-left">
              <span className="text-xs text-gray-500 font-normal">
                Didn't receive the code?{" "}
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-[#C11224] font-bold hover:underline bg-transparent border-none p-0 cursor-pointer"
                >
                  Click to Resend!
                </button>
              </span>
            </div>

            {/* Verification Commit CTA Buttons */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#C11224] hover:bg-[#A00F1E] text-white py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm tracking-wide transition-all duration-200 active:scale-[0.99] cursor-pointer shadow-sm"
              >
                Proceed
              </button>
            </div>
          </form>
        </div>

        {/* Global System Platform Minimal Copyright line footer */}
        <div className="text-center pb-4 text-[10px] text-gray-400 font-normal">
          © 2026 EXEDC Virtual Mentoring Portal. All rights reserved.
        </div>
      </div>
    </div>
  );
}
