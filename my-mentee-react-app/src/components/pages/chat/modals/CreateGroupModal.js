import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import { C } from "../data/chatData";

export default function CreateGroupModal({ onClose, onCreate }) {
const [form, setForm] = useState({ name: "", description: "", type: "" });
const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));
const valid = form.name.trim() && form.description.trim() && form.type;

const handleSubmit = () => {
if (!valid) return;
onCreate(form);
onClose();
};

return (
<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
    <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl p-6 space-y-4">
    {/* header */}
    <div className="flex items-center justify-between">
        <h3 className="font-bold text-base" style={{ color: C.dark }}>Create Discussion Group</h3>
        <button
        onClick={onClose}
        className="h-7 w-7 flex items-center justify-center rounded-full hover:bg-slate-100 transition"
        >
        <FiX size={15} />
        </button>
    </div>

    {/* group name */}
    <div className="space-y-1">
        <label className="text-xs font-semibold" style={{ color: C.dark }}>
        Group Name <span style={{ color: C.red }}>*</span>
        </label>
        <input
        value={form.name}
        onChange={(e) => set("name", e.target.value)}
        placeholder="Enter group name"
        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#312F61]/20"
        />
    </div>

    {/* description */}
    <div className="space-y-1">
        <label className="text-xs font-semibold" style={{ color: C.dark }}>
        Group Description <span style={{ color: C.red }}>*</span>
        </label>
        <textarea
        rows={4}
        value={form.description}
        onChange={(e) => set("description", e.target.value)}
        placeholder="Give brief description about the group."
        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#312F61]/20 resize-none"
        />
    </div>

    {/* group type */}
    <div className="space-y-1">
        <label className="text-xs font-semibold" style={{ color: C.dark }}>
        Group Type <span style={{ color: C.red }}>*</span>
        </label>
        <div className="relative">
        <select
            value={form.type}
            onChange={(e) => set("type", e.target.value)}
            className="w-full appearance-none rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#312F61]/20 bg-white"
            style={{ color: form.type ? C.dark : "#94a3b8" }}
        >
            <option value="" disabled>Choose group type</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
        </select>
        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">▾</span>
        </div>
    </div>

    {/* submit */}
    <div className="flex justify-end pt-1">
        <button
        onClick={handleSubmit}
        disabled={!valid}
        className="rounded-xl px-8 py-2.5 text-sm font-semibold transition"
        style={{
            background: valid ? C.red : "#e2e8f0",
            color: valid ? "#fff" : C.grey,
            cursor: valid ? "pointer" : "not-allowed",
        }}
        >
        Submit
        </button>
    </div>
    </div>
</div>
);
}