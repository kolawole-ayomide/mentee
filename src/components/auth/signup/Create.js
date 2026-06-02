import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateAccount() {
  const navigate = useNavigate();

  // Form input states
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    staffId: "",
    department: "",
    designation: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    console.log("Form submitted: ", formData);

    // SUCCESSFUL ROUTING: Directs seamlessly into your profile upload asset section!
    navigate("/upload");
  };

  // Simple validation to keep button disabled until required * fields have values
  const isFormValid =
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    formData.staffId &&
    formData.department &&
    formData.designation;

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white font-sans antialiased">
      {/* LEFT SIDE: HERO PICTURE COVER */}
      <div className="w-full md:w-[45%] bg-[#EAEAEA] relative flex items-end justify-center min-h-[300px] md:min-h-screen">
        {/* Floating Interactive Back Arrow Element */}
        <button
          type="button"
          onClick={() => navigate("/")} // Steps backward to your chosen role component selection screen
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

        <img
          src="/finelady.png" // Your woman-with-tablet graphic asset here
          alt="Create Account Portal Illustration"
          className="object-cover object-top md:absolute md:inset-0 w-full h-full"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop";
          }}
        />
      </div>

      {/* RIGHT SIDE: CREATE ACCOUNT FORM CONTROL PANEL */}
      <div className="w-full md:w-[55%] flex flex-col justify-between relative bg-white">
        {/* Top Progress Bar Indicator (Red section filled up halfway) */}
        <div className="w-full h-1.5 bg-[#FDE8E9] flex">
          <div className="w-1/2 h-full bg-[#C11224]"></div>
        </div>

        <div className="max-w-xl w-full mx-auto px-6 sm:px-12 py-10 my-auto space-y-6">
          {/* Brand Logo Header */}
          <div className="flex justify-center md:justify-start">
            <img
              src="/companyLogo.png" // Your EXEDC / EKEDC logo asset here
              alt="EKEDC Logo"
              className="h-10 w-auto object-contain"
            />
          </div>

          {/* Heading Description Text */}
          <div className="text-center md:text-left space-y-1">
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">
              Create Account
            </h2>
            <p className="text-[11px] sm:text-xs text-gray-500 max-w-sm leading-normal">
              Take the first step toward your growth. By creating a mentee
              account, you'll gain access to a world of knowledge, guidance, and
              support
            </p>
          </div>

          {/* Registration Input Form Elements */}
          <form onSubmit={handleNext} className="space-y-4">
            {/* Row 1: Name Splitting Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-700">
                  First Name <span className="text-[#C11224]">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-[#FAFBFD] focus:outline-none focus:border-gray-400 focus:bg-white transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-700">
                  Last Name <span className="text-[#C11224]">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-[#FAFBFD] focus:outline-none focus:border-gray-400 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Row 2: Work Email */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-gray-700">
                Work Email Address <span className="text-[#C11224]">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your official email address"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-[#FAFBFD] focus:outline-none focus:border-gray-400 focus:bg-white transition-all"
              />
            </div>

            {/* Row 3: Phone Number */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-[#FAFBFD] focus:outline-none focus:border-gray-400 focus:bg-white transition-all"
              />
            </div>

            {/* Row 4: Staff ID */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-gray-700">
                Staff ID <span className="text-[#C11224]">*</span>
              </label>
              <input
                type="text"
                name="staffId"
                placeholder="Enter your staff ID"
                value={formData.staffId}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-[#FAFBFD] focus:outline-none focus:border-gray-400 focus:bg-white transition-all"
              />
            </div>

            {/* Row 5: Department Selector Dropdown */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-gray-700">
                Department <span className="text-[#C11224]">*</span>
              </label>
              <div className="relative">
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-[#FAFBFD] appearance-none focus:outline-none focus:border-gray-400 focus:bg-white transition-all text-gray-700"
                >
                  <option value="" disabled>
                    Select your department
                  </option>
                  <option value="Distribution">Electricity Distribution</option>
                  <option value="Engineering">Network Engineering</option>
                  <option value="IT">Information Technology</option>
                  <option value="CustomerService">Customer Operations</option>
                </select>
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400 text-[10px]">
                  ▼
                </div>
              </div>
            </div>

            {/* Row 6: Designation Selector Dropdown */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-gray-700">
                Designation <span className="text-[#C11224]">*</span>
              </label>
              <div className="relative">
                <select
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-[#FAFBFD] appearance-none focus:outline-none focus:border-gray-400 focus:bg-white transition-all text-gray-700"
                >
                  <option value="" disabled>
                    Select your designation
                  </option>
                  <option value="Technician">EOD Specialist / Engineer</option>
                  <option value="Lead">Team Lead</option>
                  <option value="Manager">Operations Manager</option>
                  <option value="Associate">Technical Associate</option>
                </select>
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400 text-[10px]">
                  ▼
                </div>
              </div>
            </div>

            {/* Action Buttons Frame Grid */}
            <div className="pt-4 space-y-3">
              <button
                type="submit"
                disabled={!isFormValid}
                className={`w-full py-2.5 px-4 rounded-xl font-semibold text-xs sm:text-sm tracking-wide transition-all duration-200 shadow-xs
                  ${
                    isFormValid
                      ? "bg-[#C11224] text-white hover:bg-[#A00F1E] active:scale-[0.99] cursor-pointer"
                      : "bg-[#C11224]/50 text-white/70 cursor-not-allowed"
                  }`}
              >
                Next
              </button>

              {/* Login Alternate Row */}
              <div className="text-center text-[11px] text-gray-500 font-normal">
                Have an account already?{" "}
                <span
                  onClick={() => navigate("/")}
                  className="text-[#C11224] font-semibold hover:underline cursor-pointer"
                >
                  Login
                </span>
              </div>
            </div>
          </form>
        </div>

        {/* Minimalized branding footer line */}
        <div className="text-center pb-4 text-[10px] text-gray-400 font-normal">
          © 2026 EXEDC Virtual Mentoring Portal. All rights reserved.
        </div>
      </div>
    </div>
  );
}
