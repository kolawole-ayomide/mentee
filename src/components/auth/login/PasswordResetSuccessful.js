// src/components/auth/login/PasswordRestSuccessful.js
import React from "react";
import { useNavigate } from "react-router-dom";

export default function PasswordRestSuccessfulPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white font-sans antialiased select-none">
      {/* LEFT COLUMN PANEL: Image hides completely on mobile/tablet screens and expands seamlessly strictly on desktop views (lg:flex) */}
      <div className="hidden lg:flex lg:w-[42%] bg-[#F9F9F9] relative flex-col justify-between overflow-hidden">
        {/* Full Bleed Portrait Image Layer matching your exact responsive requirements */}
        <img
          src="/check.png"
          alt="Illustration of character leaning on a giant red checkmark button badge"
          className="w-full h-full object-cover absolute inset-0 z-10"
          onError={(e) => {
            // Reliable crisp fallback image for complete system recovery confirmation visual consistency
            e.target.src =
              "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=600&auto=format&fit=crop";
          }}
        />
      </div>

      {/* RIGHT COLUMN PANEL: Handles full text/form space, centering beautifully across devices */}
      <div className="w-full lg:w-[58%] flex flex-col justify-between relative bg-white min-h-screen lg:min-h-0">
        {/* Visual system accent alignment bar at top boundary */}
        <div className="w-full h-1.5 bg-[#FDE8E9] absolute top-0 left-0 right-0" />

        {/* Form Inner Content Wrapper */}
        <div className="max-w-xl w-full mx-auto px-6 sm:px-12 lg:px-16 py-12 my-auto space-y-6 text-center">
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

          {/* Heading Notification Descriptions mirroring text layout content verbatim */}
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
          <div className="pt-2 max-w-sm mx-auto w-full">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="w-full bg-[#C11224] hover:bg-[#A00F1E] text-white py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 active:scale-[0.99] cursor-pointer shadow-sm"
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
