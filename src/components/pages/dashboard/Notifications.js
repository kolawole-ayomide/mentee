// // src/components/pages/dashboard/Notifications.js
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { FiBell, FiX } from "react-icons/fi";

// const notifications = [
//   {
//     id: 1,
//     title: "Welcome to Virtual Mentoring Portal!",
//     message:
//       "Welcome, Grace Femi, to VMP. We're thrilled to have you on board. Explore our platform, connect with your mentor, and make the most of this valuable opportunity.",
//     to: "/dashboard",
//     unread: true,
//   },
//   {
//     id: 2,
//     title: "You've Been Matched with a Mentor!",
//     message:
//       "Congratulations, Grace Femi! We're excited to inform you that you've been matched with a mentor, Daniel Francis. Check your dashboard for more details and start your mentoring journey today.",
//     to: "/mentors",
//     unread: true,
//   },
//   {
//     id: 3,
//     title: "Reminder: Mentoring Session Tomorrow!",
//     message:
//       "Just a friendly reminder that your mentoring session with Daniel Francis is scheduled for tomorrow at 3:30 pm. Be prepared with your questions and goals.",
//     to: "/meetings",
//     unread: true,
//   },
//   {
//     id: 4,
//     title: "Feedback Request - Tell Us About Your Mentor",
//     message:
//       "We value your feedback! Please share your thoughts on your mentor's performance and your overall mentoring experience.",
//     to: "/profile",
//     unread: false,
//   },
//   {
//     id: 5,
//     title: "Feedback Request - Tell Us About Your Mentor",
//     message:
//       "We value your feedback! Please share your thoughts on your mentor's performance and your overall mentoring experience.",
//     to: "/profile",
//     unread: false,
//   },
//   {
//     id: 6,
//     title: "Feedback Request - Tell Us About Your Mentor",
//     message:
//       "We value your feedback! Please share your thoughts on your mentor's performance and your overall mentoring experience.",
//     to: "/profile",
//     unread: false,
//   },
// ];

// function NotificationItem({ item, onOpen }) {
//   return (
//     <button
//       type="button"
//       onClick={() => onOpen(item.to)}
//       className="flex w-full items-start gap-3 border-b border-[#eceaf6] px-4 py-4 text-left transition hover:bg-slate-50 last:border-b-0"
//     >
//       <div className="relative mt-0.5 shrink-0">
//         <div className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-500">
//           <FiBell className="h-3.5 w-3.5" />
//         </div>
//         {item.unread ? (
//           <span className="absolute -right-0.5 top-0 h-2 w-2 rounded-full bg-rose-500" />
//         ) : null}
//       </div>

//       <div className="min-w-0 flex-1">
//         <h3 className="text-[12px] font-medium text-slate-900 sm:text-[13px]">
//           {item.title}
//         </h3>
//         <p className="mt-1 text-[11px] leading-5 text-slate-500 sm:text-[12px]">
//           {item.message}
//         </p>
//       </div>
//     </button>
//   );
// }

// export default function Notifications() {
//   const navigate = useNavigate();

//   const handleOpen = (path) => {
//     if (path) {
//       navigate(path);
//       return;
//     }
//     navigate(-1);
//   };

//   return (
//     <div className="w-full">
//       <div className="w-full max-w-[360px] overflow-hidden rounded-[10px] border border-slate-200 bg-white shadow-sm">
//         <div className="flex items-center justify-between px-4 py-3">
//           <h2 className="text-[13px] font-semibold text-slate-900">
//             Notifications
//           </h2>

//           <button
//             type="button"
//             onClick={() => navigate(-1)}
//             className="rounded-md p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
//             aria-label="Close notifications"
//           >
//             <FiX className="h-4 w-4" />
//           </button>
//         </div>

//         <div className="h-px bg-[#eceaf6]" />

//         <div className="max-h-[70vh] overflow-y-auto">
//           {notifications.map((item) => (
//             <NotificationItem
//               key={item.id}
//               item={item}
//               onOpen={handleOpen}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// src/components/pages/dashboard/Notifications.js
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FiBell, FiX } from "react-icons/fi";

// ── CHANGED: reads the real user name from localStorage ──
function useStoredName() {
  try {
    const raw = localStorage.getItem("vmpUser");
    const parsed = raw ? JSON.parse(raw) : null;
    return parsed?.name || "there";
  } catch {
    return "there";
  }
}

function NotificationItem({ item, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(item.to)}
      className="flex w-full items-start gap-3 border-b border-[#eceaf6] px-4 py-4 text-left transition hover:bg-slate-50 last:border-b-0"
    >
      <div className="relative mt-0.5 shrink-0">
        <div className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-500">
          <FiBell className="h-3.5 w-3.5" />
        </div>
        {item.unread ? (
          <span className="absolute -right-0.5 top-0 h-2 w-2 rounded-full bg-rose-500" />
        ) : null}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="text-[12px] font-medium text-slate-900 sm:text-[13px]">
          {item.title}
        </h3>
        <p className="mt-1 text-[11px] leading-5 text-slate-500 sm:text-[12px]">
          {item.message}
        </p>
      </div>
    </button>
  );
}

export default function Notifications() {
  const navigate = useNavigate();
  const userName = useStoredName();

  // ── CHANGED: notifications now use the real name instead of hardcoded "Grace Femi" ──
  const notifications = useMemo(() => [
    {
      id: 1,
      title: "Welcome to Virtual Mentoring Portal!",
      message: `Welcome, ${userName}, to VMP. We're thrilled to have you on board. Explore our platform, connect with your mentor, and make the most of this valuable opportunity.`,
      to: "/dashboard",
      unread: true,
    },
    {
      id: 2,
      title: "You've Been Matched with a Mentor!",
      message: `Congratulations, ${userName}! We're excited to inform you that you've been matched with a mentor, Daniel Francis. Check your dashboard for more details and start your mentoring journey today.`,
      to: "/mentors",
      unread: true,
    },
    {
      id: 3,
      title: "Reminder: Mentoring Session Tomorrow!",
      message:
        "Just a friendly reminder that your mentoring session with Daniel Francis is scheduled for tomorrow at 3:30 pm. Be prepared with your questions and goals.",
      to: "/meetings",
      unread: true,
    },
    {
      id: 4,
      title: "Feedback Request - Tell Us About Your Mentor",
      message:
        "We value your feedback! Please share your thoughts on your mentor's performance and your overall mentoring experience.",
      to: "/profile",
      unread: false,
    },
    {
      id: 5,
      title: "Feedback Request - Tell Us About Your Mentor",
      message:
        "We value your feedback! Please share your thoughts on your mentor's performance and your overall mentoring experience.",
      to: "/profile",
      unread: false,
    },
    {
      id: 6,
      title: "Feedback Request - Tell Us About Your Mentor",
      message:
        "We value your feedback! Please share your thoughts on your mentor's performance and your overall mentoring experience.",
      to: "/profile",
      unread: false,
    },
  ], [userName]);

  const handleOpen = (path) => {
    if (path) {
      navigate(path);
      return;
    }
    navigate(-1);
  };

  return (
    <div className="w-full">
      <div className="w-full max-w-[360px] overflow-hidden rounded-[10px] border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <h2 className="text-[13px] font-semibold text-slate-900">
            Notifications
          </h2>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-md p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close notifications"
          >
            <FiX className="h-4 w-4" />
          </button>
        </div>

        <div className="h-px bg-[#eceaf6]" />

        <div className="max-h-[70vh] overflow-y-auto">
          {notifications.map((item) => (
            <NotificationItem
              key={item.id}
              item={item}
              onOpen={handleOpen}
            />
          ))}
        </div>
      </div>
    </div>
  );
}