// src/components/auth/signup/Verification.js
import React from "react";
import { useNavigate } from "react-router-dom";

export default function VerificationPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white font-sans antialiased">
      {/* LEFT SIDE: GRAPHIC PRESENTATION PANEL */}
      <div className="w-full md:w-[45%] bg-white relative flex items-center justify-center min-h-[300px] md:min-h-screen p-6 md:p-12 overflow-hidden">
        {/* Verification Success Vector Artwork Asset Area */}
        <div className="relative w-full max-w-sm sm:max-w-md md:max-w-full h-auto flex items-center justify-center z-10">
          <img
            src="/email.png"
            alt="Confirmed email message phone illustration"
            className="max-h-[70vh] max-w-full object-contain"
            onError={(e) => {
              // Bulletproof fallback rendering an elegant message confirmation illustration
              e.target.src =
                "https://images.unsplash.com/photo-1557200134-90327ee9fafa?q=80&w=600&auto=format&fit=crop";
              e.target.className =
                "w-[80%] max-h-[45vh] object-cover rounded-xl shadow-xs opacity-80";
            }}
          />
        </div>
      </div>

      {/* RIGHT SIDE: SUCCESS ANNOUNCEMENT FRAME */}
      <div className="w-full md:w-[55%] flex flex-col justify-between relative bg-white">
        {/* Full flow completion status header line (Progress bar is 100% full!) */}
        <div className="w-full h-1.5 bg-[#C11224] absolute top-0 left-0 right-0" />

        {/* Messaging Container */}
        <div className="max-w-md w-full mx-auto px-6 sm:px-12 md:px-6 py-12 my-auto space-y-6 text-center">
          {/* Corporate EKEDC Logo Header */}
          <div className="flex justify-center pb-2">
            <img
              src="/companyLogo.png"
              alt="EKEDC Logo"
              className="h-11 w-auto object-contain"
              onError={(e) => {
                e.target.src = "https://placehold.co/140x45?text=EKEDC+Logo";
              }}
            />
          </div>

          {/* Core Content Messages */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              Verification Successful!
            </h2>
            <p className="text-[11px] sm:text-xs text-gray-500 max-w-sm mx-auto leading-relaxed font-normal">
              Thank you for registering with us. Our team is currently reviewing
              your account, and we will reach out to you via email once it is
              approved.
            </p>
          </div>

          {/* Action Trigger Group */}
          <div className="pt-4">
            <button
              type="button"
              onClick={() => navigate("/login")} // Routes straight to your new login page file component!
              className="w-full bg-[#C11224] hover:bg-[#A00F1E] text-white py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm tracking-wide transition-all duration-200 active:scale-[0.99] cursor-pointer shadow-sm"
            >
              Back to Login
            </button>
          </div>
        </div>

        {/* Minimal branding footer copyright notification */}
        <div className="text-center pb-4 text-[10px] text-gray-400 font-normal">
          © 2026 EXEDC Virtual Mentoring Portal. All rights reserved.
        </div>
      </div>
    </div>
  );
}
