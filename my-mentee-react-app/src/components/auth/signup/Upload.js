// src/components/auth/signup/Upload.js
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function UploadPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [profileImage, setProfileImage] = useState(null);
  const [selectedGrowthAreas, setSelectedGrowthAreas] = useState([]);
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const growthOptions = [
    { id: "personal",     label: "Personal Development" },
    { id: "professional", label: "Professional Development" },
    { id: "career",       label: "Career Development" },
    { id: "skills",       label: "Skills Development" },
  ];

  const handleCheckboxChange = (id) => {
    setSelectedGrowthAreas((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Please select an image smaller than 2MB.");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedGrowthAreas.length) {
      alert("Please select at least one area of growth.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const existing = JSON.parse(localStorage.getItem("vmpUser") || "{}");
      localStorage.setItem(
        "vmpUser",
        JSON.stringify({
          ...existing,
          avatar: profileImage || null,
          bio: bio,
          password: password,          // ✅ now saved
          areasOfImprovement: selectedGrowthAreas.map((id) => {
            const found = growthOptions.find((o) => o.id === id);
            return found ? found.label : id;
          }),
        })
      );
    } catch {
      // fail silently
    }

    navigate("/verify-otp");
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white font-sans antialiased select-none">
      {/* LEFT COLUMN PANEL */}
      <div className="hidden lg:flex lg:w-[42%] bg-[#F9F9F9] relative flex-col justify-between overflow-hidden">
        <button
          type="button"
          onClick={() => navigate("/signup")}
          className="absolute top-6 left-6 flex items-center gap-2 text-xs font-semibold text-[#1A202C] hover:text-[#C11224] transition-colors cursor-pointer z-20 bg-white/80 backdrop-blur-xs py-1.5 px-3 rounded-md shadow-xs"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>

        <img
          src="/finelady.png"
          alt="Mentorship portal user feature portrait"
          className="w-full h-full object-cover absolute inset-0 z-10"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop";
          }}
        />
      </div>

      {/* RIGHT COLUMN PANEL */}
      <div className="w-full lg:w-[58%] flex flex-col justify-between relative bg-white min-h-screen lg:min-h-0 px-6 sm:px-12 lg:px-16 py-12">
        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-[#FDE8E9] absolute top-0 left-0 right-0 flex m-5 rounded-full overflow-hidden">
          <div className="w-full h-full bg-[#C11224]" />
        </div>

        <div className="max-w-xl w-full mx-auto px-6 sm:px-12 lg:px-16 py-12 my-auto space-y-6">
          {/* Logo */}
          <div className="flex justify-center">
            <img
              src="/companyLogo.png"
              alt="EKEDC Logo"
              className="h-11 w-auto object-contain"
              onError={(e) => { e.target.src = "https://placehold.co/140x45?text=EKEDC+Logo"; }}
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 1. Profile Photo */}
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
                    <img src={profileImage} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <svg className="w-5 h-5 text-[#C11224]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
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

            {/* 2. Areas of Growth */}
            <div className="space-y-2 text-left">
              <label className="text-[11px] font-bold text-gray-700 block leading-tight">
                What specific areas of growth are you seeking to develop?{" "}
                <span className="text-[#C11224]">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 pt-1">
                {growthOptions.map((option) => (
                  <label key={option.id} className="flex items-center gap-3 cursor-pointer group select-none">
                    <input
                      type="checkbox"
                      checked={selectedGrowthAreas.includes(option.id)}
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

            {/* 3. Bio */}
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

            {/* 4. Password */}
            <div className="space-y-1 text-left">
              <label className="text-[11px] font-bold text-gray-700 block">
                Password <span className="text-[#C11224]">*</span>
              </label>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create your password"
                  className="w-full text-xs p-3 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 bg-white font-normal text-gray-900"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* 5. Confirm Password */}
            <div className="space-y-1 text-left">
              <label className="text-[11px] font-bold text-gray-700 block">
                Confirm Password <span className="text-[#C11224]">*</span>
              </label>
              <div className="relative w-full">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full text-xs p-3 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 bg-white font-normal text-gray-900"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#C11224] hover:bg-[#A00F1E] text-white py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 active:scale-[0.99] cursor-pointer shadow-sm"
              >
                Create account
              </button>
            </div>

            <div className="text-center pt-1">
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

        <div className="text-center pb-4 text-[10px] text-gray-400 font-normal">
          © 2026 EXEDC Virtual Mentoring Portal. All rights reserved.
        </div>
      </div>
    </div>
  );
}