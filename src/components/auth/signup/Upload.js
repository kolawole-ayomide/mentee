// src/components/auth/signup/Upload.js
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function UploadPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Form States
  const [profileImage, setProfileImage] = useState(null);
  const [selectedGrowthAreas, setSelectedGrowthAreas] = useState([]);
  const [bio, setBio] = useState(
    "Hello! I'm an aspiring professional eager to grow and excel in my career. My dedication to self-improvement drives me, and I'm excited to collaborate with a mentor who can help me achieve my goals. Let's embark on this journey of growth together!",
  );
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const growthOptions = [
    { id: "personal", label: "Personal Development" },
    { id: "professional", label: "Professional Development" },
    { id: "career", label: "Career Development" },
    { id: "skills", label: "Skills Development" },
  ];

  const handleCheckboxChange = (id) => {
    if (selectedGrowthAreas.includes(id)) {
      setSelectedGrowthAreas(selectedGrowthAreas.filter((item) => item !== id));
    } else {
      setSelectedGrowthAreas([...selectedGrowthAreas, id]);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024) {
      setProfileImage(URL.createObjectURL(file));
    } else {
      alert("Please select an image smaller than 2MB.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password && confirmPassword && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // SUCCESSFUL REDIRECT: Moves straight into your new OTP security file!
    navigate("/verify-otp");
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white font-sans antialiased select-none">
      {/* LEFT COLUMN PANEL: Image hides completely on mobile/tablet screens and expands seamlessly strictly on desktop views (lg:flex) */}
      <div className="hidden lg:flex lg:w-[42%] bg-[#F9F9F9] relative flex-col justify-between overflow-hidden">
        {/* Step Back Action Trigger */}
        <button
          type="button"
          onClick={() => navigate("/signup")}
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

        {/* Full Bleed Portrait Image Layer matching your exact responsive requirements */}
        <img
          src="/finelady.png"
          alt="Mentorship portal user feature portrait"
          className="w-full h-full object-cover absolute inset-0 z-10"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop";
          }}
        />
      </div>

      {/* RIGHT COLUMN PANEL: Handles full text/form space, centering beautifully across devices */}
      <div className="w-full lg:w-[58%] flex flex-col justify-between relative bg-white min-h-screen lg:min-h-0">
        {/* Step Progress Bar Track Component (Filled up to 100% or balanced accordingly) */}
        <div className="w-full h-1.5 bg-[#FDE8E9] absolute top-0 left-0 right-0 flex">
          <div className="w-1/2 h-full bg-[#C11224]" />
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

          {/* Interactive Form Component Layout */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 1. Upload Profile Photo Unit */}
            <div className="space-y-1 text-left">
              <label className="text-[11px] font-bold text-gray-700 block">
                Upload profile photo
              </label>
              <div className="flex items-center gap-4 pt-1">
                <div
                  onClick={() => fileInputRef.current.click()}
                  className="w-14 h-14 rounded-full bg-[#FCE8EA] flex items-center justify-center cursor-pointer hover:bg-[#F9D2D6] transition-colors border border-dashed border-[#C11224]/30 overflow-hidden shrink-0"
                >
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg
                      className="w-5 h-5 text-[#C11224]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </div>
                <div className="text-left">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="text-xs font-bold text-[#C11224] hover:underline block cursor-pointer"
                  >
                    Select a file
                  </button>
                  <span className="text-[10px] text-gray-400 font-normal block mt-0.5">
                    Make sure the file is below 2mb
                  </span>
                </div>
              </div>
            </div>

            {/* 2. Areas of Growth Checkboxes */}
            <div className="space-y-2 text-left">
              <label className="text-[11px] font-bold text-gray-700 block leading-tight">
                What specific areas of growth are you seeking to develop?{" "}
                <span className="text-[#C11224]">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 pt-1">
                {growthOptions.map((option) => (
                  <label
                    key={option.id}
                    className="flex items-center gap-3 cursor-pointer group select-none"
                  >
                    <input
                      type="checkbox"
                      checked={
                        selectedGrowthAreas.includes(option.id) ||
                        option.id === "skills"
                      }
                      onChange={() => handleCheckboxChange(option.id)}
                      className="h-4 w-4 rounded border-gray-300 text-[#C11224] accent-[#C11224]"
                    />
                    <span className="text-xs text-gray-600 font-medium group-hover:text-gray-900 transition-colors">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* 3. Biography Input */}
            <div className="space-y-1 text-left">
              <label className="text-[11px] font-bold text-gray-700 block">
                Bio/Summary <span className="text-[#C11224]">*</span>
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full text-xs p-3 text-gray-600 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 resize-none leading-relaxed font-normal"
                placeholder="Tell us about yourself..."
                required
              />
            </div>

            {/* 4. Password Input */}
            <div className="space-y-1 text-left">
              <label className="text-[11px] font-bold text-gray-700 block">
                Password <span className="text-[#C11224]">*</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create your password"
                className="w-full text-xs p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 bg-white font-normal text-gray-900"
                required
              />
            </div>

            {/* 5. Confirm Password Input */}
            <div className="space-y-1 text-left">
              <label className="text-[11px] font-bold text-gray-700 block">
                Confirm Password <span className="text-[#C11224]">*</span>
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full text-xs p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 bg-white font-normal text-gray-900"
                required
              />
            </div>

            {/* Form Pipeline Execution Control Triggers */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#C11224] hover:bg-[#A00F1E] text-white py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 active:scale-[0.99] cursor-pointer shadow-sm"
              >
                Create account
              </button>
            </div>

            {/* Alternative Login Redirection */}
            <div className="text-center pt-1">
              <p className="text-[11px] sm:text-xs text-gray-500 font-normal">
                Have an account already?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/")}
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
