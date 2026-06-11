import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { FiChevronDown } from "react-icons/fi";

const C = { red: "#CF173C" };

export default function ActionDropdown({
status,
onViewDescription,
onJoinSession,
onReschedule,
onShareReview,
onMarkCompleted,
}) {
const [open, setOpen] = useState(false);
const [dropdownStyle, setDropdownStyle] = useState({});
const buttonRef = useRef(null);
const dropdownRef = useRef(null);

// ✅ close on outside click
useEffect(() => {
const handler = (e) => {
    if (
    buttonRef.current && !buttonRef.current.contains(e.target) &&
    dropdownRef.current && !dropdownRef.current.contains(e.target)
    ) {
    setOpen(false);
    }
};
document.addEventListener("mousedown", handler);
return () => document.removeEventListener("mousedown", handler);
}, []);

// ✅ calculate position when opening — flip up if near bottom of screen
const handleOpen = () => {
if (!open && buttonRef.current) {
    const rect = buttonRef.current.getBoundingClientRect();
    const dropdownHeight = 180; // approximate max height
    const spaceBelow = window.innerHeight - rect.bottom;
    const shouldFlipUp = spaceBelow < dropdownHeight;

    setDropdownStyle({
    position: "fixed",
    right: window.innerWidth - rect.right,
    ...(shouldFlipUp
        ? { bottom: window.innerHeight - rect.top + 4 }  // opens upward
        : { top: rect.bottom + 4 }                        // opens downward
    ),
    width: 192,
    zIndex: 9999,
    });
}
setOpen((v) => !v);
};

const optionsByStatus = {
Ongoing: [
    {
    label: "Join Session",
    action: () => { onJoinSession && onJoinSession(); setOpen(false); },
    },
    {
    label: "View Description",
    action: () => { onViewDescription && onViewDescription(); setOpen(false); },
    },
    {
    label: "Mark as Completed",
    action: () => { onMarkCompleted && onMarkCompleted(); setOpen(false); },
    red: true,
    },
],
Upcoming: [
    {
    label: "Join Session",
    action: () => { onJoinSession && onJoinSession(); setOpen(false); },
    },
    {
    label: "Reschedule Meeting",
    action: () => { onReschedule && onReschedule(); setOpen(false); },
    },
    {
    label: "View Description",
    action: () => { onViewDescription && onViewDescription(); setOpen(false); },
    },
    {
    label: "Mark as Completed",
    action: () => { onMarkCompleted && onMarkCompleted(); setOpen(false); },
    red: true,
    },
],
Completed: [
    {
    label: "View Description",
    action: () => { onViewDescription && onViewDescription(); setOpen(false); },
    },
    {
    label: "Share a Review",
    action: () => { onShareReview && onShareReview(); setOpen(false); },
    },
],
};

const options = optionsByStatus[status] || [];

return (
<>
    <button
    ref={buttonRef}
    onClick={handleOpen}
    className="flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-semibold transition hover:opacity-80"
    style={{ borderColor: C.red, color: C.red, background: "white" }}
    >
    Action{" "}
    <FiChevronDown
        size={13}
        className={`transition-transform ${open ? "rotate-180" : ""}`}
    />
    </button>

    {/* ✅ portal renders dropdown outside the table — no overflow clipping */}
    {open && createPortal(
    <div
        ref={dropdownRef}
        style={dropdownStyle}
        className="rounded-xl border border-slate-100 bg-white shadow-lg py-1"
    >
        {options.map((opt) => (
        <button
            key={opt.label}
            onClick={opt.action}
            className="flex w-full items-center px-4 py-2 text-sm hover:bg-slate-50 transition"
            style={{ color: opt.red ? C.red : "#334155" }}
        >
            {opt.label}
        </button>
        ))}
    </div>,
    document.body
    )}
</>
);
}