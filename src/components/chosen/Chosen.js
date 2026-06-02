import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ChosenPage() {
  // Tracking selected role ('mentor' or 'mentee') and agreement checkbox state
  const [selectedRole, setSelectedRole] = useState(null);
  const [agreed, setAgreed] = useState(false);

  const navigate = useNavigate();

  const handleProceed = () => {
    if (selectedRole && agreed) {
      navigate("/signup"); // Triggers the transition to your Create.js page
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white font-sans antialiased">
      {/* LEFT SIDE: PANEL */}
      <div className="w-full md:w-[55%] flex flex-col justify-between p-6 sm:p-10 md:p-14 lg:p-20">
        <div>
          <img
            src="/companyLogo.png"
            alt="EKEDC Logo"
            className="h-12 w-auto object-contain"
          />
        </div>

        <div className="max-w-xl w-full mx-auto my-auto py-6 space-y-8">
          <div className="space-y-2">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              Hello! What brings you to Virtual Mentoring Portal
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              Join our vibrant community of mentors and mentees. Your journey
              begins here!
            </p>
          </div>

          {/* GRID: CRUCIAL MOUSE CLICK HANDLERS ARE HERE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Mentor Card Option */}
            <div
              onClick={() => setSelectedRole("mentor")} // <-- Sets state to 'mentor' when clicked
              className={`bg-white rounded-xl p-5 border flex flex-col items-center text-center cursor-pointer transition-all duration-200 select-none
                ${
                  selectedRole === "mentor"
                    ? "border-[#C11224] ring-1 ring-[#C11224]" // The Red focus style
                    : "border-gray-200 hover:border-gray-300"
                }`}
            >
              <div className="h-28 flex items-center justify-center mb-4">
                <img
                  src="/pic.png"
                  alt="Mentor"
                  className="max-h-full object-contain"
                />
              </div>
              <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2">
                I want to be a mentor
              </h3>
              <p className="text-[11px] leading-relaxed text-gray-400">
                If you're an experienced professional eager to guide and inspire
                others, select this option.
              </p>
            </div>

            {/* Mentee Card Option */}
            <div
              onClick={() => setSelectedRole("mentee")} // <-- Sets state to 'mentee' when clicked
              className={`bg-white rounded-xl p-5 border flex flex-col items-center text-center cursor-pointer transition-all duration-200 select-none
                ${
                  selectedRole === "mentee"
                    ? "border-[#C11224] ring-1 ring-[#C11224]" // The Red focus style
                    : "border-gray-200 hover:border-gray-300"
                }`}
            >
              <div className="h-28 flex items-center justify-center mb-4">
                <img
                  src="/pic1.png"
                  alt="Mentee"
                  className="max-h-full object-contain"
                />
              </div>
              <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2">
                I want to be a mentee
              </h3>
              <p className="text-[11px] leading-relaxed text-gray-400">
                If you're seeking guidance, knowledge, and personal growth,
                choose this option.
              </p>
            </div>
          </div>

          {/* Agreement and Action Module */}
          <div className="space-y-5 pt-2">
            <div className="space-y-1.5">
              <h4 className="text-xs sm:text-sm font-bold text-gray-900">
                Mentoring Guide Agreement
              </h4>
              <p className="text-[11px] sm:text-xs text-gray-500 leading-normal">
                To continue please read and accept the mentoring guidelines.
              </p>
            </div>

            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-[#C11224]"
              />
              <span className="text-[11px] sm:text-xs text-gray-600 leading-tight">
                I agree to follow the Virtual Mentorship Portal's{" "}
                <span className="text-[#C11224] font-medium underline">
                  Mentoring Guide Agreement
                </span>
              </span>
            </label>

            {/* Proceed Button */}
            <button
              disabled={!selectedRole || !agreed}
              onClick={handleProceed} // <-- Make sure onClick is pointing to handleProceed
              className={`w-full py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 tracking-wide
                ${
                  selectedRole && agreed
                    ? "bg-[#C11224] text-white hover:bg-[#A00F1E] cursor-pointer"
                    : "bg-gray-300 text-gray-400 cursor-not-allowed"
                }`}
            >
              Proceed
            </button>
          </div>
        </div>

        <div className="hidden md:block text-[10px] text-gray-400">
          © 2026 EXEDC Virtual Mentoring Portal. All rights reserved.
        </div>
      </div>

      {/* RIGHT SIDE HERO BRANDING */}
      <div className="w-full md:w-[45%] bg-[#801429] relative overflow-hidden flex flex-col justify-center px-8 py-16 text-white text-center md:text-left min-h-[340px] md:min-h-screen">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-95">
          <img
            src="/images/auth-wave-bg.png"
            alt="Waves"
            className="w-full h-full object-cover object-right"
          />
        </div>
        <div className="relative z-10 max-w-sm mx-auto md:mx-0 space-y-3">
          <h2 className="text-base sm:text-lg lg:text-xl font-bold tracking-tight">
            Accelerate your career growth
          </h2>
          <p className="text-xs lg:text-sm text-white/80 leading-relaxed">
            Unlock Opportunities, Propel Your Professional Growth, and
            Accelerate Your Career Towards Unprecedented Success
          </p>
        </div>
      </div>
    </div>
  );
}
