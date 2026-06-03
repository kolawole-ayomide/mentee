import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// Auth Pages
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

// Dashboard / Layout
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

// Context
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          {/* Public / Auth routes */}
          <Route path="/" element={<ChosenPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgetPasswordPage />} />
          <Route path="/reset-code" element={<ResetCodePage />} />
          <Route path="/password-reset-entry" element={<VerificationSucessfulPage />} />
          <Route path="/password-reset-success" element={<PasswordRestSuccessfulPage />} />
          <Route path="/signup" element={<CreatePage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/verify-otp" element={<OtpPage />} />
          <Route path="/verification-success" element={<VerificationPage />} />

          {/* Protected Dashboard */}
          <Route element={<Layout logoSrc="/companyLogo.png" brandName="EXEDC" logoutTo="/login" />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/mentors" element={<Mentors />} />
            <Route path="/my-mentors" element={<MyMentors />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/meeting" element={<Meeting />} />
            <Route path="/profile" element={<Profile />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;