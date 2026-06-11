// src/components/chosen/Chosen.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ChosenPage() {
  const navigate = useNavigate();

  // Selection States
  const [role, setRole] = useState(null); // 'mentor' or 'mentee'
  const [agreed, setAgreed] = useState(false);

  const handleProceed = () => {
    // Strict enforcement requirement: check that role is exactly 'mentee'
    if (role !== "mentee") {
      alert(
        "Access Restricted: Only the Mentee onboarding flow is currently active.",
      );
      return;
    }
    if (!agreed) {
      alert("You must agree to the Mentoring Guide Agreement to continue.");
      return;
    }

    // Safe isolation routing to signup parameters
    navigate("/signup", { state: { selectedRole: "mentee" } });
  };

  // The button is only fully valid and active when 'mentee' is explicitly true AND terms are checked
  const isFormValid = role === "mentee" && agreed;

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white font-sans antialiased select-none">
      {/* LEFT PANEL: Takes full width on mobile, tablet, and medium screens; constraints to 58% on desktop platforms */}
      <div className="w-full lg:w-[58%] flex flex-col justify-between p-6 sm:p-10 md:p-12 lg:p-16 bg-white min-h-screen lg:min-h-0 overflow-y-auto">
        {/* Company Identity Header */}
        <div className="flex justify-start mb-8 md:mb-4">
          <img
            src="/companyLogo.png"
            alt="EKEDC Logo"
            className="h-12 w-auto object-contain"
            onError={(e) => {
              e.target.src = "https://placehold.co/140x45?text=EKEDC+Logo";
            }}
          />
        </div>

        {/* Central Core Action Wrapper */}
        <div className="max-w-xl w-full mx-auto my-auto space-y-8">
          {/* Welcome Text Strings */}
          <div className="space-y-2 text-left">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              Hello! What brings you to Virtual Mentoring Portal
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 font-normal">
              Join our vibrant community of mentors and mentees. Your journey
              begins here!
            </p>
          </div>

          {/* Dual Interactive Grid Layout Panels */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Mentor Role Card Selector */}
            <div
              onClick={() => setRole("mentor")}
              className={`border-2 rounded-2xl p-5 sm:p-6 text-center flex flex-col items-center justify-between cursor-pointer transition-all duration-200 bg-white ${
                role === "mentor"
                  ? "border-amber-500 shadow-md ring-1 ring-amber-500"
                  : "border-gray-100 hover:border-gray-200 shadow-xs"
              }`}
            >
              <div className="h-28 flex items-center justify-center mb-4">
                <img
                  src="/pic.png"
                  alt="Mentor character graphic illustration"
                  className="max-h-28 max-w-[85%] object-contain"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/120x100?text=Mentor";
                  }}
                />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-xs sm:text-sm font-bold text-gray-900">
                  I want to be a mentor
                </h3>
                <p className="text-[10px] sm:text-[11px] leading-relaxed text-gray-400 font-normal">
                  If you're an experienced professional eager to guide and
                  inspire others, select this option. Share your expertise and
                  help others reach their full potential.
                </p>
              </div>
            </div>

            {/* Mentee Role Card Selector */}
            <div
              onClick={() => setRole("mentee")}
              className={`border-2 rounded-2xl p-5 sm:p-6 text-center flex flex-col items-center justify-between cursor-pointer transition-all duration-200 bg-white ${
                role === "mentee"
                  ? "border-[#C11224] shadow-md ring-1 ring-[#C11224]"
                  : "border-gray-100 hover:border-gray-200 shadow-xs"
              }`}
            >
              <div className="h-28 flex items-center justify-center mb-4">
                <img
                  src="/pic1.png"
                  alt="Mentee character graphic illustration"
                  className="max-h-28 max-w-[85%] object-contain"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/120x100?text=Mentee";
                  }}
                />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-xs sm:text-sm font-bold text-gray-900">
                  I want to be a mentee
                </h3>
                <p className="text-[10px] sm:text-[11px] leading-relaxed text-gray-400 font-normal">
                  If you're seeking guidance, knowledge, and personal growth,
                  choose this option. Find a mentor who can support you on your
                  path to success.
                </p>
              </div>
            </div>
          </div>

          {/* Legal Compliance Agreement Controls Section */}
          <div className="space-y-4 pt-2 text-left">
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-gray-900">
                Mentoring Guide Agreement
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed font-normal">
                To continue please read and accept the mentoring guidelines.
                This allows us to maintain a trustworthy experience for all.
              </p>
            </div>

            <label className="flex items-start gap-3 cursor-pointer pt-1 group">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded border-gray-300 text-[#C11224] focus:ring-[#C11224] transition-colors cursor-pointer"
              />
              <span className="text-[11px] sm:text-xs text-gray-600 leading-tight font-normal group-hover:text-gray-900 transition-colors">
                I agree to follow the Virtual Mentorship Portal's{" "}
                <span className="text-[#C11224] font-semibold underline underline-offset-2 hover:text-[#A00F1E]">
                  Mentoring Guide Agreement
                </span>
              </span>
            </label>
          </div>

          {/* Execution Pipeline Navigation Triggers */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleProceed}
              disabled={!isFormValid}
              className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 shadow-sm ${
                isFormValid
                  ? "bg-[#C11224] hover:bg-[#A00F1E] text-white active:scale-[0.99] cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-80"
              }`}
            >
              Proceed
            </button>
          </div>
        </div>

        {/* Global copyright notation signature anchor */}
        <div className="text-center pt-8 md:pt-4 text-[10px] text-gray-400 font-normal">
          © 2026 EXEDC Virtual Mentoring Portal. All rights reserved.
        </div>
      </div>

      {/* RIGHT PANEL: Optimized to hidden status on small, medium screens, and tablets. It mounts explicitly at `lg:flex` desktop widths */}
      <div
        className="hidden lg:flex lg:w-[42%] relative flex-col justify-start pt-[22vh] px-8 sm:px-12 lg:px-12 min-h-screen text-left text-white bg-[#800F1E]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 2400' fill='none'%3E%3Cpath d='M0 0h1440v2400H0V0z' fill='%23800F1E'/%3E%3Cpath d='M0 500c200-80 350 120 600 0s400-180 600-40 240 120 240 120v1820H0V500z' fill='%23CAA126'/%3E%3Cpath d='M0 800c250 100 450-160 700-40s380 200 550 80 190-90 190-90v1650H0V800z' fill='%23A00F1E'/%3E%3Cpath d='M0 1150c300-80 500 120 750 20s420-150 550-20 140 80 140 80v1170H0V1150z' fill='%237D82B8'/%3E%3Cpath d='M0 1550c220 120 480-140 700-20s400 180 580 40 160-80 160-80v910H0V1550z' fill='%2328264A'/%3E%3C/svg%3E")`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* Floating Brand Badge Graphic Element Container */}
        <div className="absolute top-[21.5vh] right-12 flex items-center justify-center bg-[#1A202C]/90 p-2 rounded-full shadow-2xl backdrop-blur-sm border border-gray-700/30 z-20">
          <div className="flex -space-x-1">
            <span className="w-8 h-8 rounded-full bg-[#CAA126] text-gray-900 font-bold text-xs flex items-center justify-center ring-2 ring-[#1A202C]">
              D
            </span>
            <span className="w-8 h-8 rounded-full bg-[#CAA126] text-gray-900 font-bold text-xs flex items-center justify-center ring-2 ring-[#1A202C]">
              M
            </span>
          </div>
        </div>

        {/* Content Panel Body Wrapper */}
        <div className="relative max-w-sm mx-auto md:mx-0 space-y-3 z-10">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold tracking-tight text-white leading-tight">
            Accelerate your career growth
          </h2>
          <p className="text-[11px] sm:text-xs text-white/85 font-medium leading-relaxed">
            Unlock Opportunities, Propel Your Professional Growth, and
            Accelerate Your Career Towards Unprecedented Success
          </p>
        </div>
      </div>
    </div>
  );
}
