import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FiBell, FiBookOpen, FiGrid, FiLogOut, FiMenu,
  FiMessageSquare, FiUser, FiUserCheck, FiUsers, FiVideo, FiX,
} from "react-icons/fi";
import { useUser } from "../context/UserContext";
import { clearAllFiles } from "./pages/chat/utils/fileStorage";

const navItems = [
  { name: "Dashboard",  path: "/dashboard",  icon: FiGrid        },
  { name: "Mentors",    path: "/mentors",     icon: FiUsers       },
  { name: "My Mentors", path: "/my-mentors",  icon: FiUserCheck   },
  { name: "Courses",    path: "/courses",     icon: FiBookOpen    },
  { name: "Chat",       path: "/chat",        icon: FiMessageSquare },
  { name: "Meetings",   path: "/meetings",    icon: FiVideo       },
  { name: "Profile",    path: "/profile",     icon: FiUser        },
];

function SidebarLink({ item, onClick }) {
  const Icon = item.icon;
  return (
    <NavLink
      to={item.path}
      onClick={onClick}
      className={({ isActive }) =>
        [
          "flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition",
          isActive
            ? "bg-[#312F61] text-white"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
        ].join(" ")
      }
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span>{item.name}</span>
    </NavLink>
  );
}

function Brand({ logoSrc, brandName }) {
  if (logoSrc) {
    return (
      <div className="flex items-center">
        <img src={logoSrc} alt={brandName} className="h-9 w-auto object-contain" />
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-900 text-sm font-bold text-white">
        {brandName.charAt(0).toUpperCase()}
      </div>
      <div>
        <p className="text-sm font-bold text-slate-900">{brandName}</p>
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
  const [avatarErr,  setAvatarErr]  = useState(false);
  const navigate = useNavigate();
  const { user, clearUser } = useUser();

  // ── derive avatar and initials from context ──
  const avatar = user?.avatar || null;
  const initials = user?.name
    ? user.name.trim().split(" ").filter(Boolean)
        .slice(0, 2).map((p) => p[0].toUpperCase()).join("")
    : "U";

const handleLogout = async () => {
  await clearAllFiles().catch(() => {});  // ← clear IndexedDB files
  clearUser();
  if (typeof onLogout === "function") { onLogout(); return; }
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
          "fixed inset-y-0 left-0 z-50 flex w-56 flex-col bg-white px-3 py-4 transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0",
        ].join(" ")}
      >
        <div className="flex items-center justify-between px-1 mb-6">
          <Brand logoSrc={logoSrc} brandName={brandName} />
          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <FiX className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <SidebarLink
              key={item.path}
              item={item}
              onClick={() => setMobileOpen(false)}
            />
          ))}
        </nav>

        <div className="p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-600"
          >
            <FiLogOut className="h-4 w-4 shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <div className="lg:pl-56">
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-100">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 lg:hidden"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <FiMenu className="h-4 w-4" />
              </button>
            </div>

            <div className="flex items-center space-x-[5rem]">
              {/* Bell */}
              <button
                type="button"
                onClick={() => navigate("/notifications")}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-black transition hover:bg-slate-50"
                aria-label="Notifications"
              >
                <FiBell className="h-4 w-4" />
              </button>

              {/* ── Avatar — shows profile pic or initials ── */}
              <button
                type="button"
                onClick={() => navigate("/profile")}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full overflow-hidden bg-rose-600 text-white transition hover:opacity-90"
                aria-label="Profile"
              >
                {avatar && !avatarErr ? (
                  <img
                    src={avatar}
                    alt="Profile"
                    className="h-full w-full object-cover rounded-full"
                    onError={() => setAvatarErr(true)}
                  />
                ) : (
                  <span className="text-xs font-bold">{initials}</span>
                )}
              </button>
            </div>
          </div>
        </header>

        <main>
          <div className="min-h-[calc(100vh-8rem)] rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}