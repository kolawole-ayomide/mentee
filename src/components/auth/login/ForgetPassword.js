// src/components/auth/login/ForgetPassword.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgetPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email) {
      setErrorMessage("Please enter a valid work email address.");
      return;
    }

    try {
      // 1. Recover the database data string
      const localStorageData = localStorage.getItem("vmpUser");

      if (!localStorageData) {
        setErrorMessage("Account not found. Please register an account first.");
        return;
      }

      const registeredUser = JSON.parse(localStorageData);

      // 2. Perform error-insulated case-insensitive matching
      const inputEmail = email.trim().toLowerCase();
      const savedEmail = registeredUser.email
        ? registeredUser.email.trim().toLowerCase()
        : "";

      if (!savedEmail || inputEmail !== savedEmail) {
        setErrorMessage(
          "Account not found. Please check the email address and try again.",
        );
        return;
      }

      // 3. Generate a secure random 4-digit code
      const generatedCode = Math.floor(1000 + Math.random() * 9000).toString();

      // 4. Output validation logs cleanly to console window
      console.log("==========================================");
      console.log(
        `[EKEDC Security] Reset code for ${inputEmail}: ${generatedCode}`,
      );
      console.log("==========================================");

      // 5. Store code context momentarily so next screen can compare input values
      localStorage.setItem(
        "vmpResetContext",
        JSON.stringify({
          email: savedEmail,
          validCode: generatedCode,
          timestamp: Date.now(),
        }),
      );

      // 6. Router handoff redirection
      navigate("/reset-code");
    } catch (error) {
      setErrorMessage(
        "An unexpected data parsing issue occurred. Please re-register.",
      );
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white font-sans antialiased select-none">
      {/* LEFT COLUMN PANEL */}
      <div className="hidden lg:flex lg:w-[42%] bg-[#F9F9F9] relative flex-col justify-between overflow-hidden">
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

      {/* RIGHT COLUMN PANEL */}
      <div className="w-full lg:w-[58%] flex flex-col justify-between relative bg-white min-h-screen lg:min-h-0">
        <div className="w-full h-1.5 bg-[#FDE8E9] absolute top-0 left-0 right-0" />

        <div className="max-w-xl w-full mx-auto px-6 sm:px-12 lg:px-16 py-12 my-auto space-y-6">
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

          <div className="space-y-2 text-center">
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">
              Forgot your password?
            </h2>
            <p className="text-[11px] sm:text-xs text-gray-500 max-w-xs mx-auto leading-relaxed font-normal">
              No worries! We'll help you reset your password securely. Please
              provide the email address associated with your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1 text-left">
              <label className="text-[11px] font-bold text-gray-700 block">
                Work Email Address <span className="text-[#C11224]">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your official email address"
                className={`w-full text-xs p-3 border rounded-lg focus:outline-none focus:ring-1 bg-white placeholder-gray-300 transition-all text-gray-900 font-normal ${
                  errorMessage
                    ? "border-[#C11224] focus:border-[#C11224] focus:ring-[#C11224]"
                    : "border-gray-200 focus:border-gray-400 focus:ring-gray-400"
                }`}
                required
              />

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
                  <span className="text-[10px] font-semibold tracking-wide">
                    {errorMessage}
                  </span>
                </div>
              )}
            </div>

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

        <div className="text-center pb-4 text-[10px] text-gray-400 font-normal">
          © 2026 EXEDC Virtual Mentoring Portal. All rights reserved.
        </div>
      </div>
    </div>
  );
}
