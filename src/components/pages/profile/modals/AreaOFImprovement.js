import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import { C, IMPROVEMENT_OPTIONS } from "../data/profileData";

export default function AreaOfImprovement({ selected, onClose, onSave }) {
const [chosen, setChosen] = useState(selected || []);

const toggle = (label) => {
if (chosen.includes(label)) {
    setChosen((p) => p.filter((x) => x !== label));
} else {
    if (chosen.length >= 2) return; // max 2
    setChosen((p) => [...p, label]);
}
};

return (
<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
    <div className="w-full max-w-md rounded-2xl bg-white shadow-xl p-6 space-y-4">
    {/* header */}
    <div className="flex items-center justify-between">
        <h3 className="font-bold text-base" style={{ color: C.dark }}>Area of Improvement</h3>
        <button onClick={onClose}
        className="h-7 w-7 flex items-center justify-center rounded-full hover:bg-slate-100 transition">
        <FiX size={15} />
        </button>
    </div>

    <p className="text-xs" style={{ color: C.grey }}>
        Add your area of improvement so we can match you to the right mentor. Options are up to 2.
    </p>

    {/* options */}
    <div className="grid grid-cols-2 gap-3">
        {IMPROVEMENT_OPTIONS.map((opt) => {
        const active = chosen.includes(opt.label);
        return (
            <button key={opt.label} onClick={() => toggle(opt.label)}
            className="flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium transition"
            style={active
                ? { background: C.navy, color: "#fff", borderColor: C.navy }
                : { background: "white", color: C.dark, borderColor: "#e2e8f0" }}>
            <span>{opt.emoji}</span>
            <span className="text-xs text-left leading-tight">{opt.label}</span>
            {active && <span className="ml-auto text-white text-xs">✓</span>}
            </button>
        );
        })}
    </div>

    {/* update */}
    <div className="flex justify-end pt-1">
        <button onClick={() => onSave(chosen)}
        disabled={chosen.length === 0}
        className="rounded-xl px-8 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
        style={{
            background: chosen.length > 0 ? C.red : "#e2e8f0",
            color: chosen.length > 0 ? "#fff" : C.grey,
            cursor: chosen.length > 0 ? "pointer" : "not-allowed",
        }}>
        Update
        </button>
    </div>
    </div>
</div>
);
}