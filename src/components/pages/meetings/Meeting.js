import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import ActionDropdown from "./ActionDropdown";
import ViewDescriptionModal from "./ViewDescriptionModal";
import RescheduleModal from "./RescheduleModal";
import ShareReviewModal from "./ShareReviewModal";

const C = { red: "#CF173C", dark: "#1B1A23", grey: "#616E7C", navy: "#312F61" };

function StatusBadge({ status }) {
const map = {
Ongoing:   { bg: "#FFEDED", color: "#CF173C" },
Upcoming:  { bg: "#FFFBE6", color: "#B8860B" },
Completed: { bg: "#EAFDEB", color: "#069D16" },
};
const { bg, color } = map[status] || { bg: "#eee", color: "#333" };
return (
<span
     className="inline-block rounded-full px-3 py-0.5 text-xs font-semibold whitespace-nowrap"
     style={{ background: bg, color }}
>
     {status}
</span>
);
}

export default function Meeting() {
// ── CHANGED: reads from localStorage on init ──
const [meetings, setMeetings] = useState(() => {
try {
     return JSON.parse(localStorage.getItem("vmpMeetings") || "[]");
} catch {
     return [];
}
});

const [search,    setSearch]   = useState("");
const [perPage,   setPerPage]  = useState(10);
const [page,      setPage]     = useState(1);

const [descModal,    setDescModal]    = useState(null);
const [reschedModal, setReschedModal] = useState(null);
const [reviewModal,  setReviewModal]  = useState(false);

// ── re-reads localStorage every time the page is visited ──
useEffect(() => {
try {
     const stored = JSON.parse(localStorage.getItem("vmpMeetings") || "[]");
     setMeetings(stored);
} catch {
     setMeetings([]);
}
}, []);

const isEmpty = meetings.length === 0;

const filtered = meetings.filter(
(m) =>
     search === "" ||
     m.title.toLowerCase().includes(search.toLowerCase()) ||
     m.mentor.toLowerCase().includes(search.toLowerCase())
);

const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
const paginated  = filtered.slice((page - 1) * perPage, page * perPage);

useEffect(() => setPage(1), [search, perPage]);

// ── empty state ──
if (isEmpty) {
return (
     <div className="space-y-5">
     <h2 className="text-xl font-bold" style={{ color: C.dark }}>My Meetings</h2>
     <div className="flex flex-col items-center justify-center gap-3 py-28">
     <img
          src="/meetingsemptystate.png"
          alt="No scheduled meeting"
          className="h-30 w-auto object-contain"
          onError={(e) => { e.target.style.display = "none"; }}
     />
     <p className="text-sm font-medium" style={{ color: C.grey }}>
          No scheduled meeting yet
     </p>
     </div>
     </div>
);
}

return (
<>
     <div className="space-y-5">
     <h2 className="text-xl font-bold" style={{ color: C.dark }}>My Meetings</h2>

     {/* toolbar */}
     <div className="flex flex-wrap items-center justify-between gap-3">
     <div className="flex items-center gap-2 text-sm" style={{ color: C.grey }}>
          <span>Show</span>
          <select
          value={perPage}
          onChange={(e) => setPerPage(Number(e.target.value))}
          className="rounded-lg border border-slate-200 px-2 py-1 text-sm focus:outline-none"
          >
          {[5, 10, 20].map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
          <span>entries</span>
     </div>

     <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
          <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          className="rounded-lg border border-slate-200 py-1.5 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#312F61]/20 w-44"
          />
     </div>
     </div>

     {/* table */}
     <div className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
     <div className="overflow-x-auto">
          <table className="w-full text-sm">
          <thead>
               <tr className="border-b border-slate-100 text-left">
               {["S/N","Title","Mentor","Meeting Type","Description","Status","Date","Action"].map((h) => (
               <th key={h} className="px-4 py-3 text-xs font-bold tracking-wide whitespace-nowrap"
                    style={{ color: C.dark }}>
                    {h}
               </th>
               ))}
               </tr>
          </thead>
          <tbody>
               {paginated.length === 0 ? (
               <tr>
               <td colSpan={8} className="py-12 text-center text-xs" style={{ color: C.grey }}>
                    No results found.
               </td>
               </tr>
               ) : (
               paginated.map((meeting, idx) => (
               <tr key={meeting.id} className="border-b border-slate-50 hover:bg-slate-50/60 transition">
                    <td className="px-4 py-3 text-xs" style={{ color: C.grey }}>
                    {(page - 1) * perPage + idx + 1}
                    </td>
                    <td className="px-4 py-3 font-medium whitespace-nowrap" style={{ color: C.dark }}>
                    {meeting.title}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap" style={{ color: C.dark }}>
                    {meeting.mentor}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap" style={{ color: C.grey }}>
                    {meeting.meetingType}
                    </td>
                    <td className="px-4 py-3 max-w-[160px]" style={{ color: C.grey }}>
                    <span className="line-clamp-2 text-xs">
                         {meeting.description?.slice(0, 40)}
                         {meeting.description?.length > 40 ? "…" : ""}
                    </span>
                    </td>
                    <td className="px-4 py-3">
                    <StatusBadge status={meeting.status} />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-xs" style={{ color: C.grey }}>
                    {meeting.date}
                    </td>
                    <td className="px-4 py-3">
                    <ActionDropdown
                         status={meeting.status}
                         onViewDescription={() => setDescModal(meeting)}
                         onJoinSession={() => window.open("#", "_blank")}
                         onReschedule={() => setReschedModal(meeting)}
                         onShareReview={() => setReviewModal(true)}
                    />
                    </td>
               </tr>
               ))
               )}
          </tbody>
          </table>
     </div>

     {/* pagination */}
     <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-t border-slate-100">
          <span className="text-xs" style={{ color: C.grey }}>
          Showing {filtered.length === 0 ? 0 : (page - 1) * perPage + 1} to{" "}
          {Math.min(page * perPage, filtered.length)} of {filtered.length} entries
          </span>

          <div className="flex items-center gap-1">
          <button
               onClick={() => setPage((p) => Math.max(1, p - 1))}
               disabled={page === 1}
               className="flex h-8 items-center gap-1 px-3 text-xs hover:bg-slate-50 disabled:opacity-40 transition"
               style={{ color: C.grey }}
          >
               Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
               <button
               key={p}
               onClick={() => setPage(p)}
               className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium transition"
               style={p === page
               ? { background: C.red, color: "#fff" }
               : { border: "1px solid #CF173C", color: C.grey }}
               >
               {p}
               </button>
          ))}

          <button
               onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
               disabled={page === totalPages}
               className="flex h-8 items-center gap-1 px-3 text-xs hover:bg-slate-50 disabled:opacity-40 transition"
               style={{ color: C.red }}
          >
               Next
          </button>
          </div>
     </div>
     </div>
     </div>

     {descModal && (
     <ViewDescriptionModal meeting={descModal} onClose={() => setDescModal(null)} />
     )}
     {reschedModal && (
     <RescheduleModal
     meeting={reschedModal}
     onClose={() => setReschedModal(null)}
     onSubmit={(data) => console.log("Rescheduled:", data)}
     />
     )}
     {reviewModal && (
     <ShareReviewModal
     onClose={() => setReviewModal(false)}
     onSubmit={(data) => console.log("Review:", data)}
     />
     )}
</>
);
}