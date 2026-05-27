// src/components/Layout.js
import React, { useMemo, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  FiBell,
  FiBookOpen,
  FiGrid,
  FiLogOut,
  FiMenu,
  FiMessageSquare,
  FiUser,
  FiUserCheck,
  FiUsers,
  FiVideo,
  FiX,
} from "react-icons/fi";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: FiGrid },
  { name: "Mentors", path: "/mentors", icon: FiUsers },
  { name: "My Mentors", path: "/my-mentors", icon: FiUserCheck },
  { name: "Courses", path: "/courses", icon: FiBookOpen },
  { name: "Chat", path: "/chat", icon: FiMessageSquare },
  { name: "Meetings", path: "/meetings", icon: FiVideo },
  { name: "Profile", path: "/profile", icon: FiUser },
];

// const pageTitleMap = {
//   dashboard: "Dashboard",
//   mentors: "Mentors",
//   "my-mentors": "My Mentors",
//   courses: "Courses",
//   assessment: "Assessment",
//   chat: "Chat",
//   meetings: "Meetings",
//   meeting: "Meetings",
//   profile: "Profile",
//   notifications: "Notifications",
// };

function getPageTitle(pathname) {
  const segments = pathname.split("/").filter(Boolean);
  const lastSegment = segments[segments.length - 1] || "dashboard";

//   return (
//     pageTitleMap[lastSegment] ||
//     lastSegment
//       .split("-")
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//       .join(" ")
//   );
}

function SidebarLink({ item, onClick }) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      onClick={onClick}
      className={({ isActive }) =>
        [
          "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition",
          isActive
            ? "bg-[#312F61] text-white"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
        ].join(" ")
      }
    >
      <Icon className="h-5 w-5 shrink-0" />
      <span>{item.name}</span>
    </NavLink>
  );
}

function Brand({ logoSrc, brandName }) {
  if (logoSrc) {
    return (
      <div className="flex items-center">
        <img
          src={logoSrc}
          alt={brandName}
          className="h-12 w-auto object-contain"
        />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-900 text-lg font-bold text-white">
        {brandName.charAt(0).toUpperCase()}
      </div>
      <div>
        <p className="text-lg font-bold text-slate-900">{brandName}</p>
        <p className="text-xs text-slate-500">Mentorship Platform</p>
      </div>
    </div>
  );
}

export default function Layout({
  logoSrc = "/companyLogo.png",
  brandName = "EXEDC",
  logoutTo = "/",
  onLogout,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const pageTitle = useMemo(() => getPageTitle(location.pathname), [location.pathname]);

  const handleLogout = () => {
    if (typeof onLogout === "function") {
      onLogout();
      return;
    }
    navigate(logoutTo);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={[
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col  bg-white px-4 py-5 transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0",
        ].join(" ")}
      >
        <div className="flex items-center justify-between px-2">
          <Brand logoSrc={logoSrc} brandName={brandName} />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-8 flex-1 space-y-2">
          {navItems.map((item) => (
            <SidebarLink
              key={item.path}
              item={item}
              onClick={() => setMobileOpen(false)}
            />
          ))}
        </nav>

        <div className=" p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-600"
          >
            <FiLogOut className="h-5 w-5 shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30  bg-white/95 backdrop-blur">
          <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 lg:hidden"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <FiMenu className="h-5 w-5" />
              </button>

              <h1 className="text-xl font-semibold text-slate-900 sm:text-2xl">
                {pageTitle}
              </h1>
            </div>

            <div className="flex items-center space-x-[6rem] sm:gap-3">
              <button
                type="button"
                onClick={() => navigate("/notifications")}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full  bg-white text-slate-700 transition hover:bg-slate-50"
                aria-label="Notifications"
              >
                <FiBell className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={() => navigate("/profile")}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-rose-600 text-white transition hover:opacity-90"
                aria-label="Profile"
              >
                <FiUser className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <div className="min-h-[calc(100vh-8rem)] rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
