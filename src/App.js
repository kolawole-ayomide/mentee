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

// ── Guards dashboard routes — if no vmpUser in localStorage, redirect to "/" ──
function ProtectedRoute({ children }) {
  const user = localStorage.getItem("vmpUser");
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
}

// ── Guards auth routes — if already logged in, redirect to dashboard ──
function PublicRoute({ children }) {
  const user = localStorage.getItem("vmpUser");
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          {/* ── Public / Auth routes ── */}
          <Route path="/" element={<PublicRoute><ChosenPage /></PublicRoute>} />
          <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
          <Route path="/forgot-password" element={<ForgetPasswordPage />} />
          <Route path="/reset-code" element={<ResetCodePage />} />
          <Route path="/password-reset-entry" element={<VerificationSucessfulPage />} />
          <Route path="/password-reset-success" element={<PasswordRestSuccessfulPage />} />
          <Route path="/signup" element={<PublicRoute><CreatePage /></PublicRoute>} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/verify-otp" element={<OtpPage />} />
          <Route path="/verification-success" element={<VerificationPage />} />

          {/* ── Protected Dashboard routes ── */}
          <Route
            element={
              <ProtectedRoute>
                <Layout
                  logoSrc="/companyLogo.png"
                  brandName="EXEDC"
                  logoutTo="/"
                />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/mentors" element={<Mentors />} />
            <Route path="/my-mentors" element={<MyMentors />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/meetings" element={<Meeting />} />
            <Route path="/profile" element={<Profile />} />

            {/* Fallback inside protected */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;