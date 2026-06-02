import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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
        <Route
          element={
            <Layout
              logoSrc="/companyLogo.png"
              brandName="EXEDC"
              logoutTo="/"
            />
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/mentors" element={<Mentors />} />
          <Route path="/my-mentors" element={<MyMentors />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/meetings" element={<Meeting />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;