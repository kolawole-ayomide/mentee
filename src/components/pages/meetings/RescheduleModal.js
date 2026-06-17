import React, { useState, useEffect } from "react";
import { FiX, FiCalendar } from "react-icons/fi";

const C = { red: "#CF173C", dark: "#1B1A23", grey: "#616E7C", navy: "#312F61" };

function getTodayString() {
return new Date().toISOString().split("T")[0];
}

function getMaxDateString() {
const d = new Date();
d.setMonth(d.getMonth() + 2);
return d.toISOString().split("T")[0];
}

export default function RescheduleModal({ meeting, onClose, onSubmit }) {
const [form, setForm] = useState({
title:       "",
description: "",
meetingType: "Virtual",
date:        "",
timeSlot:    "",
period:      "AM",
});

const [error, setError] = useState("");

useEffect(() => {
if (!meeting) return;
setForm({
    title:       meeting.title       || "",
    description: meeting.description || "",
    meetingType: meeting.meetingType || "Virtual",
    date:        "",
    timeSlot:    "",
    period:      "AM",
});
setError("");
}, [meeting]);

if (!meeting) return null;

const handleChange = (field, value) =>
setForm((prev) => ({ ...prev, [field]: value }));

const handleSubmit = () => {
if (!form.date) {
    setError("Please select a new date.");
    return;
}
if (!form.timeSlot) {
    setError("Please select a time slot.");
    return;
}
if (!form.title.trim()) {
    setError("Please enter a title.");
    return;
}

// ── build the updated meeting object ──
onSubmit && onSubmit({
    ...meeting,                    // keep all original fields
    title:       form.title,
    description: form.description,
    meetingType: form.meetingType,
    date:        form.date,        // ← this is what updates the date in the table
    time:        `${form.timeSlot} ${form.period}`,
    status:      "Upcoming",       // reset to Upcoming after reschedule
});
onClose();
};

return (
<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
    <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-xl overflow-hidden">
    {/* Header */}
    <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <h3 className="text-base font-bold" style={{ color: C.dark }}>
        Reschedule a Session
        </h3>
        <button onClick={onClose}
        className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-slate-100 transition text-slate-500">
        <FiX size={16} />
        </button>
    </div>

    <div className="flex flex-col sm:flex-row">
        {/* Left — mentor card */}
        <div className="flex flex-col items-center justify-between gap-2 px-6 py-8 bg-slate-50 sm:w-52 shrink-0 text-center border-b sm:border-b-0 sm:border-r border-slate-100">
        <div className="flex flex-col items-center gap-4">
            <img
            src="/meetingman.png"
            alt="Mentor"
            onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://ui-avatars.com/api/?name=Daniel+Francis&background=312F61&color=fff&size=80";
            }}
            className="h-20 w-20 rounded-full object-cover border-2 border-white shadow"
            />
            <div>
            <p className="font-bold text-sm" style={{ color: C.dark }}>Daniel Francis</p>
            <p className="text-xs" style={{ color: C.grey }}>Head of marketing</p>
            <p className="text-xs mt-1" style={{ color: C.grey }}>Contact: 09023456789</p>
            <p className="text-xs" style={{ color: C.grey }}>Email: danielfrancis20@gmail.com</p>
            </div>
        </div>
        <div className="flex flex-col items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full mt-4"
            style={{ background: C.red }}>
            <FiCalendar size={18} className="text-white" />
            </div>
            <p className="text-xs text-center" style={{ color: C.grey }}>
            Plan your next mentorship meeting and take a step towards your personal and
            professional growth
            </p>
        </div>
        </div>

        {/* Right — form */}
        <div className="flex-1 px-6 py-6 space-y-4">

        {/* Error */}
        {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-xs text-red-600">
            {error}
            </div>
        )}

        {/* Title */}
        <div className="space-y-1">
            <label className="text-xs font-semibold" style={{ color: C.dark }}>
            Title <span style={{ color: C.red }}>*</span>
            </label>
            <input
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#312F61]/20"
            />
        </div>

        {/* Description */}
        <div className="space-y-1">
            <label className="text-xs font-semibold" style={{ color: C.dark }}>
            Description <span style={{ color: C.red }}>*</span>
            </label>
            <textarea
            rows={4}
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#312F61]/20 resize-none"
            />
        </div>

        {/* Meeting Type */}
        <div className="space-y-1">
            <label className="text-xs font-semibold" style={{ color: C.dark }}>
            Meeting Type <span style={{ color: C.red }}>*</span>
            </label>
            <select
            value={form.meetingType}
            onChange={(e) => handleChange("meetingType", e.target.value)}
            className="w-full bg-white rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#312F61]/20"
            >
            <option value="Virtual">Virtual</option>
            <option value="Physical">Physical</option>
            </select>
        </div>

        {/* Date */}
        <div className="space-y-1">
            <label className="text-xs font-semibold" style={{ color: C.dark }}>
            New Date <span style={{ color: C.red }}>*</span>
            </label>
            <input
            type="date"
            value={form.date}
            min={getTodayString()}
            max={getMaxDateString()}
            onChange={(e) => { handleChange("date", e.target.value); setError(""); }}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#312F61]/20"
            />
        </div>

        {/* Time + AM/PM */}
        <div className="space-y-1">
            <label className="text-xs font-semibold" style={{ color: C.dark }}>
            New Time <span style={{ color: C.red }}>*</span>
            </label>
            <div className="flex items-center gap-2">
            <input
                type="time"
                value={form.timeSlot}
                onChange={(e) => { handleChange("timeSlot", e.target.value); setError(""); }}
                className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#312F61]/20"
            />
            <div className="flex rounded-lg border border-slate-200 overflow-hidden shrink-0">
                {["AM", "PM"].map((p) => (
                <button
                    key={p}
                    type="button"
                    onClick={() => handleChange("period", p)}
                    className="px-3 py-2 text-xs font-semibold transition"
                    style={{
                    background: form.period === p ? C.red : "#fff",
                    color: form.period === p ? "#fff" : C.grey,
                    }}
                >
                    {p}
                </button>
                ))}
            </div>
            </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-2">
            <button
            onClick={handleSubmit}
            className="rounded-xl px-8 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
            style={{ background: C.red }}
            >
            Submit
            </button>
        </div>
        </div>
    </div>
    </div>
</div>
);
}