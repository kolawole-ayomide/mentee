// src/components/auth/signup/Create.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatePage() {
  const navigate = useNavigate();

  // Onboarding Form States
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [staffId, setStaffId] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    // Only allow numbers and restrict length to a maximum of 11 characters
    if (/^\d*$/.test(value) && value.length <= 11) {
      setPhoneNumber(value);
    }
  };

  const handleNextSubmit = (e) => {
    e.preventDefault();

    if (
      !firstName ||
      !lastName ||
      !workEmail ||
      !staffId ||
      !department ||
      !designation
    ) {
      alert("Please fill in all mandatory account creation fields.");
      return;
    }

    if (phoneNumber && phoneNumber.length < 11) {
      alert("Please enter a valid 11-digit phone number.");
      return;
    }

    // Move smoothly forward to the next onboarding phase
    navigate("/upload");
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white font-sans antialiased select-none">
      {/* LEFT COLUMN PANEL: Image hides completely on mobile/tablet screens and expands seamlessly strictly on desktop views (lg:flex) */}
      <div className="hidden lg:flex lg:w-[42%] bg-[#F9F9F9] relative flex-col justify-between overflow-hidden">
        {/* Step Back Action Trigger */}
        <button
          type="button"
          onClick={() => navigate("/")}
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
          src="/finelady.png"
          alt="Mentorship portal user feature portrait"
          className="w-full h-full object-cover absolute inset-0 z-10"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600&auto=format&fit=crop";
          }}
        />
      </div>

      {/* RIGHT COLUMN PANEL: Handles full text/form space, centering beautifully across devices */}
      <div className="w-full lg:w-[58%] flex flex-col justify-between relative bg-white min-h-screen lg:min-h-0">
        {/* Step Progress Bar Track Component */}
        <div className="w-full h-1.5 bg-[#FDE8E9] absolute top-0 left-0 right-0 flex">
          <div className="w-[45%] h-full bg-[#C11224]" />
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
              Create an Account
            </h2>
            <p className="text-[11px] sm:text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
              Take the first step toward your growth. By creating a mentee
              account, you'll gain access to a world of knowledge, guidance, and
              support
            </p>
          </div>

          {/* Interactive Form Component Layout */}
          <form onSubmit={handleNextSubmit} className="space-y-4">
            {/* Dual Inline Columns Grid layout for First Name and Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1 text-left">
                <label className="text-[11px] font-bold text-gray-700 block">
                  First Name <span className="text-[#C11224]">*</span>
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter your first name"
                  className="w-full text-xs p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 bg-white placeholder-gray-300 transition-all text-gray-900"
                  required
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="text-[11px] font-bold text-gray-700 block">
                  Last Name <span className="text-[#C11224]">*</span>
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter your last name"
                  className="w-full text-xs p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 bg-white placeholder-gray-300 transition-all text-gray-900"
                  required
                />
              </div>
            </div>

            {/* Work Email Input Block */}
            <div className="space-y-1 text-left">
              <label className="text-[11px] font-bold text-gray-700 block">
                Work Email Address <span className="text-[#C11224]">*</span>
              </label>
              <input
                type="email"
                value={workEmail}
                onChange={(e) => setWorkEmail(e.target.value)}
                placeholder="Enter your official email address"
                className="w-full text-xs p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 bg-white placeholder-gray-300 transition-all text-gray-900"
                required
              />
            </div>

            {/* Phone Number Input Block — restricted strictly up to 11 digits */}
            <div className="space-y-1 text-left">
              <label className="text-[11px] font-bold text-gray-700 block">
                Phone Number
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                placeholder="Enter your 11-digit phone number"
                className="w-full text-xs p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 bg-white placeholder-gray-300 transition-all text-gray-900"
              />
            </div>

            {/* Staff ID Input Block */}
            <div className="space-y-1 text-left">
              <label className="text-[11px] font-bold text-gray-700 block">
                Staff ID <span className="text-[#C11224]">*</span>
              </label>
              <input
                type="text"
                value={staffId}
                onChange={(e) => setStaffId(e.target.value)}
                placeholder="Enter your staff ID"
                className="w-full text-xs p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 bg-white placeholder-gray-300 transition-all text-gray-900"
                required
              />
            </div>

            {/* Department Select Input Dropdown Container */}
            <div className="space-y-1 text-left">
              <label className="text-[11px] font-bold text-gray-700 block">
                Department <span className="text-[#C11224]">*</span>
              </label>
              <div className="relative">
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full text-xs p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 bg-white text-gray-900 appearance-none cursor-pointer"
                  required
                >
                  <option value="" disabled hidden>
                    Select your department
                  </option>
                  <option value="Information Technology">
                    Information Technology
                  </option>
                  <option value="Human Resources">Human Resources</option>
                  <option value="Engineering & Operations">
                    Engineering & Operations
                  </option>
                  <option value="Customer Service">Customer Service</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Designation Select Input Dropdown Container */}
            <div className="space-y-1 text-left">
              <label className="text-[11px] font-bold text-gray-700 block">
                Designation <span className="text-[#C11224]">*</span>
              </label>
              <div className="relative">
                <select
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  className="w-full text-xs p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 bg-white text-gray-900 appearance-none cursor-pointer"
                  required
                >
                  <option value="" disabled hidden>
                    Select your designation
                  </option>
                  <option value="Team Lead">Team Lead</option>
                  <option value="Specialist">Specialist</option>
                  <option value="Officer">Officer</option>
                  <option value="Associate">Associate</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Form Pipeline Execution Control Triggers */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-[#C11224] hover:bg-[#A00F1E] text-white py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 active:scale-[0.99] cursor-pointer shadow-sm"
              >
                Next
              </button>
            </div>

            {/* Alternative Login Redirection */}
            <div className="text-center pt-2">
              <p className="text-[11px] sm:text-xs text-gray-500 font-normal">
                Have an account already?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-[#C11224] font-bold hover:underline bg-transparent border-none p-0 cursor-pointer"
                >
                  Login
                </button>
              </p>
            </div>
          </form>
        </div>

        {/* Global dashboard copyright notations metadata */}
        <div className="text-center pb-4 text-[10px] text-gray-400 font-normal">
          © 2026 EXEDC Virtual Mentoring Portal. All rights reserved.
        </div>
      </div>
    </div>
  );
}
