import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import Ongoing   from "./Ongoing";
import Pending   from "./Pending";
import Completed from "./Completed";

const C = {
navy: "#312F61", red: "#CF173C", redBg: "#FFEDED", purple: "#DEDCF9",
green: "#069D16", greenBg: "#EAFDEB", yellowBg: "#FFFBE6",
grey: "#616E7C", dark: "#1B1A23",
};

function StatCard({ iconSrc, iconAlt, count, label, countColor, bg }) {
return (
<div className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-slate-100 bg-white px-6 py-5 shadow-sm"
     style={{ flex: "1 1 0", minWidth: 0 }}>
     <div className="flex h-10 w-10 items-center justify-center rounded-xl mb-1" style={{ background: bg }}>
     <img src={iconSrc} alt={iconAlt} className="h-5 w-5 object-contain" />
     </div>
     <span className="text-2xl font-bold" style={{ color: countColor }}>{count}</span>
     <span className="text-center text-xs leading-snug whitespace-nowrap" style={{ color: C.grey }}>{label}</span>
</div>
);
}

const INITIAL_COURSES = Array.from({ length: 12 }, (_, i) => ({
id: i + 1,
mentor: "Daniel Francis",
title: "Introduction to Marketing",
objective: "Understand the core principles of marketing",
status: i < 5 ? "Ongoing" : i < 9 ? "Pending" : "Completed",
date: "13/10/2023",
fileUrl: "https://www.w3.org/WAI/WCAG21/quickref/wcag21-quickref-20180621.pdf",
}));

export default function Courses() {
const [courses, setCourses] = useState(() => {
const completedIds = JSON.parse(localStorage.getItem("completedCourses") || "[]");
return INITIAL_COURSES.map((c) =>
     completedIds.includes(c.id) ? { ...c, status: "Completed" } : c
);
});

const [activeTab, setActiveTab] = useState("Ongoing");
const [search,    setSearch]    = useState("");
const [perPage,   setPerPage]   = useState(5);
const [page,      setPage]      = useState(1);

const tabs = ["Ongoing", "Pending", "Completed"];

/* mark complete + persist */
const handleComplete = (id) => {
setCourses((prev) =>
     prev.map((c) => (c.id === id ? { ...c, status: "Completed" } : c))
);
const ids = JSON.parse(localStorage.getItem("completedCourses") || "[]");
if (!ids.includes(id)) {
     localStorage.setItem("completedCourses", JSON.stringify([...ids, id]));
}
setActiveTab("Completed");
};

/* download course material */
const handleDownload = (course) => {
const link = document.createElement("a");
link.href = course.fileUrl;
link.download = `${course.title}.pdf`;
link.target = "_blank";
document.body.appendChild(link);
link.click();
document.body.removeChild(link);
};

/* move pending → ongoing after download */
const handleMoveToOngoing = (id) => {
setCourses((prev) =>
     prev.map((c) => (c.id === id ? { ...c, status: "Ongoing" } : c))
);
setActiveTab("Ongoing");
};

const filtered = courses.filter(
(c) =>
     c.status === activeTab &&
     (search === "" ||
     c.title.toLowerCase().includes(search.toLowerCase()) ||
     c.mentor.toLowerCase().includes(search.toLowerCase()))
);

const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
const paginated  = filtered.slice((page - 1) * perPage, page * perPage);

useEffect(() => setPage(1), [activeTab, search, perPage]);

const isEmpty = courses.length === 0;

const counts = {
total:     courses.length,
completed: courses.filter((c) => c.status === "Completed").length,
ongoing:   courses.filter((c) => c.status === "Ongoing").length,
pending:   courses.filter((c) => c.status === "Pending").length,
};

const stats = [
{ iconSrc: "/tobetaken.png", iconAlt: "to be taken", count: counts.total,     label: "Total Courses to be taken", countColor: C.navy,    bg: C.purple   },
{ iconSrc: "/completed.png", iconAlt: "completed",   count: counts.completed, label: "Total Courses Completed",   countColor: C.green,   bg: C.greenBg  },
{ iconSrc: "/ongoing.png",   iconAlt: "ongoing",     count: counts.ongoing,   label: "Total Courses Ongoing",     countColor: C.red,     bg: C.redBg    },
{ iconSrc: "/pending.png",   iconAlt: "pending",     count: counts.pending,   label: "Total Courses Pending",     countColor: "#B8860B", bg: C.yellowBg },
];

if (isEmpty) {
return (
     <div className="flex flex-col items-center justify-center gap-4 py-24">
     <img src="/mycoursesemptystate.png" alt="No courses" className="w-48 h-auto object-contain" />
     <p className="text-base font-medium" style={{ color: C.grey }}>You have no course yet</p>
     </div>
);
}

return (
<div className="space-y-6">
     <h2 className="text-xl font-bold" style={{ color: C.dark }}>My Courses</h2>

     <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full pb-1">
     {stats.map((s) => <StatCard key={s.label} {...s} />)}
     </div>

     <div className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
     <div className="flex flex-wrap justify-between items-center">
     <div className="flex items-center border-b border-slate-100 px-6 pt-4 gap-6 overflow-x-auto">
          {tabs.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
               className="pb-3 text-sm font-semibold border-b-2 transition whitespace-nowrap"
               style={activeTab === tab
               ? { borderColor: C.red, color: C.red }
               : { borderColor: "transparent", color: C.grey }}>
               {tab}
          </button>
          ))}
     </div>

     <div className="flex flex-wrap items-center justify-center space-x-7 px-6 py-4">
          <div className="flex items-center gap-6 text-[12px]">
          <span>Show</span>
          <select value={perPage} onChange={(e) => setPerPage(Number(e.target.value))}
               className="rounded-lg px-2 py-1 text-sm focus:outline-none">
               {[5, 10, 20].map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
          <span>entries</span>
          </div>
          <div className="relative">
          <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
          <input value={search} onChange={(e) => setSearch(e.target.value)}
               placeholder="Search"
               className="rounded-lg bg-[#FBFBFB] py-1.5 pr-9 pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#312F61]/20 w-48" />
          </div>
     </div>
     </div>

     <div className="overflow-x-auto">
     <table className="w-full text-sm">
          <thead>
          <tr className="border-b border-slate-100 text-left">
               {["S/N","MENTOR","COURSE TITLE","LEARNING OBJECTIVE","STATUS","DATE","ACTION"].map((h) => (
               <th key={h} className="px-6 py-3 text-xs font-bold tracking-wide" style={{ color: C.dark }}>{h}</th>
               ))}
          </tr>
          </thead>

          {activeTab === "Ongoing" && (
          <Ongoing paginated={paginated} page={page} perPage={perPage} onComplete={handleComplete} />
          )}
          {activeTab === "Pending" && (
          <Pending
               paginated={paginated}
               page={page}
               perPage={perPage}
               onDownload={handleDownload}
               onMoveToOngoing={handleMoveToOngoing}
          />
          )}
          {activeTab === "Completed" && (
          <Completed paginated={paginated} page={page} perPage={perPage} />
          )}
     </table>
     </div>

     <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-t border-slate-100">
     <span className="text-xs" style={{ color: C.grey }}>
          Showing {filtered.length === 0 ? 0 : (page - 1) * perPage + 1} to{" "}
          {Math.min(page * perPage, filtered.length)} of {filtered.length} entries
     </span>
     <div className="flex items-center gap-3">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
          className="flex text-sm items-center justify-center mr-2 hover:bg-slate-50 disabled:opacity-40 transition"
          style={{ color: C.grey }}>Previous</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button key={p} onClick={() => setPage(p)}
               className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium transition"
               style={p === page
               ? { background: C.red, color: "#fff", border: "none" }
               : { border: "1px solid #e2e8f0", color: C.grey }}>
               {p}
          </button>
          ))}
          <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
          className="flex text-sm items-center justify-center disabled:opacity-40 transition"
          style={{ color: C.red }}>Next</button>
     </div>
     </div>
     </div>
</div>
);
}