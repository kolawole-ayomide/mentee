// src/components/auth/login/PasswordRestSuccessful.js
import React from "react";
import { useNavigate } from "react-router-dom";

export default function PasswordRestSuccessfulPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white font-sans antialiased">
      {/* LEFT SIDE: CELEBRATORY SUCCESS GRAPHIC PANEL */}
      <div className="w-full md:w-[45%] bg-[#F9F9F9] relative flex items-center justify-center min-h-[300px] md:min-h-screen p-6 md:p-12 overflow-hidden">
        {/* Vector Asset matching the "OK" checkmark artwork layout in image_0b44a4.png */}
        <div className="relative w-full max-w-sm sm:max-w-md h-auto flex items-center justify-center z-10">
          <img
            src="/check.png"
            alt="Illustration of character leaning on a giant red checkmark button badge"
            className="max-h-[65vh] max-w-[85%] object-contain"
            onError={(e) => {
              // Reliable crisp fallback image for complete system recovery confirmation visual consistency
              e.target.src =
                "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=600&auto=format&fit=crop";
              e.target.className =
                "w-[75%] max-h-[38vh] object-cover rounded-2xl opacity-60";
            }}
          />
        </div>
      </div>

      {/* RIGHT SIDE: SECURE ACCESS GATEWAY INTERACTION CARD */}
      <div className="w-full md:w-[55%] flex flex-col justify-between relative bg-white">
        {/* Visual system accent alignment bar at top boundary */}
        <div className="w-full h-1.5 bg-[#FDE8E9] absolute top-0 left-0 right-0" />

        {/* Central Component Content Alignment Block */}
        <div className="max-w-md w-full mx-auto px-6 sm:px-12 md:px-6 py-12 my-auto space-y-8 text-center">
          {/* Corporate EKEDC Logo Header branding identity badge */}
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

          {/* Heading Notification Descriptions mirroring image_0b44a4.png text layout content verbatim */}
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">
              Password Reset Successful!
            </h2>
            <p className="text-[11px] sm:text-xs text-gray-500 max-w-xs mx-auto leading-relaxed font-normal">
              Congratulations, your password has been reset successfully. You
              can now log in with your new password.
            </p>
          </div>

          {/* Explicit Navigation Control Route Node Action Trigger */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="w-full bg-[#C11224] hover:bg-[#A00F1E] text-white py-3.5 px-4 rounded-xl font-semibold text-xs sm:text-sm tracking-wide transition-all duration-200 active:scale-[0.99] cursor-pointer shadow-sm"
            >
              Log In Now
            </button>
          </div>
        </div>

        {/* Minimal base system operational footer line */}
        <div className="text-center pb-4 text-[10px] text-gray-400 font-normal">
          © 2026 EXEDC Virtual Mentoring Portal. All rights reserved.
        </div>
      </div>
    </div>
  );
}
