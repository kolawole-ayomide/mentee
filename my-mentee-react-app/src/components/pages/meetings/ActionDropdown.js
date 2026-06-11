import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

const C = { red: "#CF173C" };

/*
status options:
- "Ongoing"   → Join Session + View Description
- "Upcoming"  → Reschedule Meeting
- "Completed" → View Description + Share a Review
*/
export default function ActionDropdown({ status, onViewDescription, onJoinSession, onReschedule, onShareReview }) {
const [open, setOpen] = useState(false);
const ref = useRef(null);

useEffect(() => {
const handler = (e) => {
    if (ref.current && !ref.current.contains(e.target)) setOpen(false);
};
document.addEventListener("mousedown", handler);
return () => document.removeEventListener("mousedown", handler);
}, []);

const optionsByStatus = {
Ongoing: [
    { label: "Join Session",      action: () => { onJoinSession && onJoinSession(); setOpen(false); } },
    { label: "View Description",  action: () => { onViewDescription && onViewDescription(); setOpen(false); } },
],
Upcoming: [
    { label: "Reschedule Meeting", action: () => { onReschedule && onReschedule(); setOpen(false); } },
    { label: "View Description",   action: () => { onViewDescription && onViewDescription(); setOpen(false); } },
],
Completed: [
    { label: "View Description", action: () => { onViewDescription && onViewDescription(); setOpen(false); } },
    { label: "Share a Review",   action: () => { onShareReview && onShareReview(); setOpen(false); } },
],
};

const options = optionsByStatus[status] || [];

return (
<div className="relative inline-block text-left" ref={ref}>
    <button
    onClick={() => setOpen((v) => !v)}
    className="flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-semibold transition hover:opacity-80"
    style={{ borderColor: C.red, color: C.red, background: "white" }}
    >
    Action{" "}
    <FiChevronDown
        size={13}
        className={`transition-transform ${open ? "rotate-180" : ""}`}
    />
    </button>

    {open && (
    <div className="absolute right-0 z-50 mt-1 w-48 rounded-xl border border-slate-100 bg-white shadow-lg py-1">
        {options.map((opt) => (
        <button
            key={opt.label}
            onClick={opt.action}
            className="flex w-full items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition"
        >
            {opt.label}
        </button>
        ))}
    </div>
    )}
</div>
);
}