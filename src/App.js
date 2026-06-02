import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// Auth Flow Pages
import ChosenPage from "./components/chosen/Chosen";
import LoginPage from "./components/auth/login/Login";
import ForgetPasswordPage from "./components/auth/login/ForgetPassword";
import ResetCodePage from "./components/auth/login/ResetCode";
import VerificationSucessfulPage from "./components/auth/login/VerificationSucessful";
import PasswordRestSuccessfulPage from "./components/auth/login/PasswordResetSuccessful";
import CreatePage from "./components/auth/signup/Create";
import UploadPage from "./components/auth/signup/Upload";
import OtpPage from "./components/auth/signup/Otp";
import VerificationPage from "./components/auth/signup/Verification";

// Dashboard Layout and Ecosystem Pages
import Layout from "./components/Layout";
import Dashboard from "./components/pages/dashboard/Dashboard";
import Notifications from "./components/pages/dashboard/Notifications";
import Mentors from "./components/pages/mentorspages/Mentors";
import MyMentors from "./components/pages/mentorspages/MyMentors";
import Courses from "./components/pages/courses/Courses";
import Assessment from "./components/pages/courses/Assessment";
import Chat from "./components/pages/chat/Chat";
import Meeting from "./components/pages/meetings/Meeting";
import Profile from "./components/pages/profile/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* STEP 1: Role entry selection page */}
        <Route path="/" element={<ChosenPage />} />

        {/* STEP 1b: Login gateway component */}
        <Route path="/login" element={<LoginPage />} />

        {/* PASSWORD RECOVERY CHAIN */}
        <Route path="/forgot-password" element={<ForgetPasswordPage />} />
        <Route path="/reset-code" element={<ResetCodePage />} />
        <Route
          path="/password-reset-entry"
          element={<VerificationSucessfulPage />}
        />
        <Route
          path="/password-reset-success"
          element={<PasswordRestSuccessfulPage />}
        />

        {/* STEP 2: Registration credentials creation page */}
        <Route path="/signup" element={<CreatePage />} />

        {/* STEP 3: Profile biography & photo upload page */}
        <Route path="/upload" element={<UploadPage />} />

        {/* STEP 4: 4-digit security passcode validation page */}
        <Route path="/verify-otp" element={<OtpPage />} />

        {/* STEP 5: Final successful verification acknowledgment window */}
        <Route path="/verification-success" element={<VerificationPage />} />

        {/* PROTECTED SYSTEM APP DASHBOARD */}
        <Route
          element={
            <Layout
              logoSrc="/companyLogo.png"
              brandName="EXEDC"
              logoutTo="/login"
            />
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/mentors" element={<Mentors />} />
          <Route path="/my-mentors" element={<MyMentors />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/meeting" element={<Meeting />} />
          <Route path="/profile" element={<Profile />} />

          {/* Fallback Catch-All Redirect Router */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
