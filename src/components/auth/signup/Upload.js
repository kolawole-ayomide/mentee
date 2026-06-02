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
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white font-sans antialiased">
      {/* LEFT SIDE: DESIGN PICTURE COVER PANEL */}
      <div className="w-full md:w-[45%] bg-[#D9D9D9] relative flex items-end justify-center min-h-[400px] md:min-h-screen p-6 md:p-0 overflow-hidden">
        {/* Back Arrow Button -> Returns back to initial Create.js signup page */}
        <button
          type="button"
          onClick={() => navigate("/signup")}
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

        {/* Fine Lady Image Viewport Mock */}
        <div className="relative w-full h-[90%] md:h-[85%] flex items-end justify-center z-10">
          <img
            src="/finelady.png"
            alt="Mentee Illustration Profile"
            className="max-h-full max-w-[90%] md:max-w-full object-contain object-bottom"
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop";
              e.target.className = "w-full h-full object-cover";
            }}
          />
        </div>
      </div>

      {/* RIGHT SIDE: SCROLLABLE MAIN DATA FIELDS PANEL */}
      <div className="w-full md:w-[55%] flex flex-col relative bg-white">
        {/* Top Progress Bar Indicator Section (Filled up to 50% for step 2) */}
        <div className="w-full h-1.5 bg-[#FDE8E9] flex">
          <div className="w-1/2 h-full bg-[#C11224]"></div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl mx-auto flex flex-col justify-between flex-1 p-6 sm:p-10 md:p-12 lg:p-16 pt-12 md:pt-16 space-y-8"
        >
          {/* Top Branding Section */}
          <div className="flex justify-center md:justify-start">
            <img
              src="/companyLogo.png"
              alt="EKEDC Logo"
              className="h-10 w-auto object-contain"
              onError={(e) => {
                e.target.src = "https://placehold.co/140x45?text=EKEDC+Logo";
              }}
            />
          </div>

          <div className="space-y-6">
            {/* 1. Upload Profile Photo Unit */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-800 tracking-wide block">
                Upload profile photo
              </label>
              <div className="flex items-center gap-4 pt-1">
                <div
                  onClick={() => fileInputRef.current.click()}
                  className="w-14 h-14 rounded-full bg-[#FCE8EA] flex items-center justify-center cursor-pointer hover:bg-[#F9D2D6] transition-colors border border-dashed border-[#C11224]/30 overflow-hidden"
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
                    className="text-xs font-semibold text-[#C11224] hover:underline block cursor-pointer"
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
            <div className="space-y-3">
              <label className="text-xs font-bold text-gray-800 tracking-wide block">
                What specific areas of growth are you seeking to develop?{" "}
                <span className="text-[#C11224]">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
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
                    <span className="text-xs text-gray-700 font-medium group-hover:text-gray-900 transition-colors">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* 3. Biography Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-800 tracking-wide block">
                Bio/Summary <span className="text-[#C11224]">*</span>
              </label>
              <textarea
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full text-xs p-3 text-gray-600 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 resize-none leading-relaxed shadow-sm font-normal"
                placeholder="Tell us about yourself..."
                required
              />
            </div>

            {/* 4. Password Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-800 tracking-wide block">
                Password <span className="text-[#C11224]">*</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create your password"
                className="w-full text-xs p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 bg-white font-normal"
                required
              />
            </div>

            {/* 5. Confirm Password Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-800 tracking-wide block">
                Confirm Password <span className="text-[#C11224]">*</span>
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full text-xs p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 bg-white font-normal"
                required
              />
            </div>
          </div>

          {/* Action Button Section */}
          <div className="space-y-4 pt-2">
            <button
              type="submit"
              className="w-full bg-[#C11224] hover:bg-[#A00F1E] text-white py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm tracking-wide transition-all duration-200 active:scale-[0.99] cursor-pointer shadow-sm"
            >
              Create account
            </button>

            <div className="text-center text-[11px] sm:text-xs text-gray-500 font-normal">
              Have an account already?{" "}
              <button
                type="button"
                onClick={() => navigate("/")}
                className="text-[#C11224] font-semibold hover:underline bg-transparent border-none p-0 cursor-pointer"
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
