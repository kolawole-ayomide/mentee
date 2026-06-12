// src/components/auth/signup/Otp.js
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function OtpPage() {
  const navigate = useNavigate();

  // 4-Digit Array State for individual box manipulation
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const inputRefs = useRef([]);

  // Generate an automated testing code to output to developer tools console
  const generateAndLogOtp = () => {
    const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
    console.log("-----------------------------------------");
    console.log(`[EKEDC SECURITY] Your One-Time Passcode is: ${randomCode}`);
    console.log("-----------------------------------------");
    setGeneratedOtp(randomCode);
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
    setErrorMessage("");
    inputRefs.current[0].focus();
    generateAndLogOtp();
    alert(
      "A new 4-digit security code has been sent to your official email and logged to your console.",
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    const enteredOtp = otp.join("");

    if (enteredOtp.length < 4) {
      setErrorMessage("Please complete the 4-digit code entries.");
      return;
    }

    // STRICT VALIDATION GATES: Match entries explicitly with the logged code
    if (enteredOtp !== generatedOtp) {
      setErrorMessage(
        "Incorrect OTP code. Please check your developer console logs.",
      );
      return;
    }

    // SUCCESSFUL ROUTE TRANSITION: Routes straight to verification success page!
    navigate("/verification-success");
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white font-sans antialiased select-none">
      {/* LEFT COLUMN PANEL */}
      <div className="hidden lg:flex lg:w-[42%] bg-[#F9F9F9] relative flex-col justify-between overflow-hidden">
        {/* Step Back Action Trigger */}
        <button
          type="button"
          onClick={() => navigate("/upload")}
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

        {/* Full Bleed Portrait Image Layer */}
        <img
          src="/email.png"
          alt="Secure laptop post mailbox asset layout illustrations"
          className="w-full h-full object-cover absolute inset-0 z-10"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&auto=format&fit=crop";
          }}
        />
      </div>

      {/* RIGHT COLUMN PANEL */}
      <div className="w-full lg:w-[58%] flex flex-col justify-between relative bg-white min-h-screen lg:min-h-0">
        {/* Continuous Flow Top Status Progress Bar Indicator */}
        <div className="w-full h-1.5 bg-[#FDE8E9] absolute top-0 left-0 right-0 flex">
          <div className="w-[75%] h-full bg-[#C11224]" />
        </div>

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
              Enter OTP Code
            </h2>
            <p className="text-[11px] sm:text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
              Please enter the 4-digit One-Time Password (OTP) sent{" "}
              <span className="font-semibold text-gray-800">to your email</span>
              . This code is displayed in your browser console for testing
              purposes. Thank you!
            </p>
          </div>

          {/* Central Security Code Matrix Block Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center justify-center gap-2">
              {/* Split Individual Character Entry Node boxes */}
              <div className="flex items-center justify-center gap-3 sm:gap-4 py-2">
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
                    className={`w-14 h-16 sm:w-16 sm:h-20 text-center text-xl font-bold border rounded-xl bg-white shadow-xs focus:outline-none focus:ring-1 transition-all text-gray-900 ${
                      errorMessage
                        ? "border-[#C11224] focus:ring-[#C11224] focus:border-[#C11224]"
                        : "border-gray-200 focus:ring-[#C11224] focus:border-[#C11224]"
                    }`}
                  />
                ))}
              </div>

              {errorMessage && (
                <div className="flex items-center gap-1.5 pt-1 text-[#C11224]">
                  <svg
                    className="w-3.5 h-3.5 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-[10px] font-semibold tracking-wide text-center">
                    {errorMessage}
                  </span>
                </div>
              )}
            </div>

            {/* Alternating Resend Prompt Option Line links */}
            <div className="text-center">
              <span className="text-[11px] sm:text-xs text-gray-500 font-normal">
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
                className="w-full bg-[#C11224] hover:bg-[#A00F1E] text-white py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 active:scale-[0.99] cursor-pointer shadow-sm"
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
