import React from "react";
import { FiX, FiUser, FiUsers } from "react-icons/fi";
import { C } from "../data/chatData";

export default function GroupInfoModal({ group, onClose }) {
if (!group) return null;

return (
<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
    <div className="w-full max-w-sm rounded-2xl bg-white shadow-xl p-6 space-y-4">
    {/* header */}
    <div className="flex items-center justify-between">
        <h3 className="font-bold text-sm" style={{ color: C.dark }}>Group Info</h3>
        <button
        onClick={onClose}
        className="h-7 w-7 flex items-center justify-center rounded-full hover:bg-slate-100 transition"
        >
        <FiX size={15} />
        </button>
    </div>

    {/* group avatar + info */}
    <div className="flex flex-col items-center gap-2 text-center">
        <img
        src={group.avatar || "/groupchatprofilepic.png"}
        alt={group.name}
        onError={(e) => { e.target.onerror = null; e.target.style.display = "none"; }}
        className="h-20 w-20 rounded-full object-cover border-2 border-white shadow"
        />
        <p className="font-bold text-base" style={{ color: C.dark }}>{group.name}</p>
        <p className="text-xs" style={{ color: C.grey }}>{group.participants} participant</p>
        <div className="flex items-center gap-5 text-xs" style={{ color: C.grey }}>
        <span className="flex items-center gap-1">
            <FiUser size={12} /> {group.members} mentees
        </span>
        <span className="flex items-center gap-1">
            <FiUsers size={12} /> {group.mentors} mentors
        </span>
        </div>
    </div>

    {/* description */}
    <div className="space-y-1">
        <p className="text-xs font-bold" style={{ color: C.dark }}>Description</p>
        <p className="text-xs leading-relaxed whitespace-pre-line" style={{ color: C.grey }}>
        {group.description}
        </p>
    </div>
    </div>
</div>
);
}