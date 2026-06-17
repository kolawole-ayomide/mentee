import React from "react";
import { FiX } from "react-icons/fi";

export default function ViewDescriptionModal({ meeting, onClose }) {
if (!meeting) return null;

return (
<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
    <div className="relative w-full max-w-sm rounded-2xl bg-white shadow-xl p-6">
    {/* header */}
    <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-[#1B1A23]">Description</h3>
        <button
        onClick={onClose}
        className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-slate-100 transition text-slate-500"
        >
        <FiX size={16} />
        </button>
    </div>

    {/* body */}
    <p className="text-sm text-[#616E7C] leading-relaxed">
        {meeting.description ||
        "In this mentoring session, we'll focus on your personal and professional growth, setting goals, honing skills, and devising strategies for success"}
    </p>
    </div>
</div>
);
}