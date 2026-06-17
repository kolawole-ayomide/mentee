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
// src/components/pages/dashboard/Notifications.js
import React, { useMemo, useState } from "react";
import { FiBell, FiX, FiArrowLeft } from "react-icons/fi";

function useStoredName() {
  try {
    const raw = localStorage.getItem("vmpUser");
    const parsed = raw ? JSON.parse(raw) : null;
    return parsed?.name || "there";
  } catch {
    return "there";
  }
}

function NotificationItem({ item, onOpen, isRead }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className="flex w-full items-start gap-3 border-b border-[#eceaf6] px-4 py-4 text-left transition hover:bg-slate-50 last:border-b-0"
    >
      <div className="relative mt-0.5 shrink-0">
        <div className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-500">
          <FiBell className="h-3.5 w-3.5" />
        </div>
        {/* ── red dot only shows if not yet read ── */}
        {item.unread && !isRead ? (
          <span className="absolute -right-0.5 top-0 h-2 w-2 rounded-full bg-rose-500" />
        ) : null}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="text-[12px] font-medium text-slate-900 sm:text-[13px]">
          {item.title}
        </h3>
        <p className="mt-1 text-[11px] leading-5 text-slate-500 sm:text-[12px] line-clamp-2">
          {item.message}
        </p>
      </div>
    </button>
  );
}

function NotificationDetail({ item, onBack }) {
  return (
    <div className="flex flex-col h-full">
      {/* detail header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-[#eceaf6]">
        <button
          type="button"
          onClick={onBack}
          className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-slate-100 transition text-slate-500"
          aria-label="Back to notifications"
        >
          <FiArrowLeft className="h-4 w-4" />
        </button>
        <h2 className="text-[13px] font-semibold text-slate-900">
          Notification
        </h2>
      </div>

      {/* detail body — full message shown here */}
      <div className="px-4 py-5 space-y-3">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-500">
            <FiBell className="h-3.5 w-3.5" />
          </div>
          <h3 className="text-[13px] font-semibold text-slate-900 leading-snug">
            {item.title}
          </h3>
        </div>
        <p className="text-[12px] leading-6 text-slate-600">
          {item.message}
        </p>
      </div>
    </div>
  );
}

export default function Notifications() {
  const userName = useStoredName();

  // tracks which notification ids have been clicked/read
  const [readIds, setReadIds] = useState(new Set());

  // tracks which notification is currently open in detail view (null = list view)
  const [selectedItem, setSelectedItem] = useState(null);

  const notifications = useMemo(() => [
    {
      id: 1,
      title: "Welcome to Virtual Mentoring Portal!",
      message: `Welcome, ${userName}, to VMP. We're thrilled to have you on board. Explore our platform, connect with your mentor, and make the most of this valuable opportunity.`,
      unread: true,
    },
    {
      id: 2,
      title: "You've Been Matched with a Mentor!",
      message: `Congratulations, ${userName}! We're excited to inform you that you've been matched with a mentor, Daniel Francis. Check your dashboard for more details and start your mentoring journey today.`,
      unread: true,
    },
    {
      id: 3,
      title: "Reminder: Mentoring Session Tomorrow!",
      message:
        "Just a friendly reminder that your mentoring session with Daniel Francis is scheduled for tomorrow at 3:30 pm. Be prepared with your questions and goals.",
      unread: true,
    },
    {
      id: 4,
      title: "Feedback Request - Tell Us About Your Mentor",
      message:
        "We value your feedback! Please share your thoughts on your mentor's performance and your overall mentoring experience.",
      unread: false,
    },
    {
      id: 5,
      title: "Feedback Request - Tell Us About Your Mentor",
      message:
        "We value your feedback! Please share your thoughts on your mentor's performance and your overall mentoring experience.",
      unread: false,
    },
    {
      id: 6,
      title: "Feedback Request - Tell Us About Your Mentor",
      message:
        "We value your feedback! Please share your thoughts on your mentor's performance and your overall mentoring experience.",
      unread: false,
    },
  ], [userName]);

  // when a notification is clicked — mark as read and open detail view
  const handleOpen = (item) => {
    setReadIds((prev) => new Set([...prev, item.id]));
    setSelectedItem(item);
  };

  const handleBack = () => {
    setSelectedItem(null);
  };

  return (
    <div className="w-full">
      <div className="w-full max-w-[360px] overflow-hidden rounded-[10px] border border-slate-200 bg-white shadow-sm">

        {/* ── LIST VIEW ── */}
        {!selectedItem && (
          <>
            <div className="flex items-center justify-between px-4 py-3">
              <h2 className="text-[13px] font-semibold text-slate-900">
                Notifications
              </h2>
            </div>

            <div className="h-px bg-[#eceaf6]" />

            <div className="max-h-[70vh] overflow-y-auto">
              {notifications.map((item) => (
                <NotificationItem
                  key={item.id}
                  item={item}
                  onOpen={handleOpen}
                  isRead={readIds.has(item.id)}
                />
              ))}
            </div>
          </>
        )}

        {/* ── DETAIL VIEW ── */}
        {selectedItem && (
          <NotificationDetail
            item={selectedItem}
            onBack={handleBack}
          />
        )}

      </div>
    </div>
  );
}