import React from "react";
import { FiAlertCircle } from "react-icons/fi";
import { C } from "../data/chatData";

export default function DeleteModal({ onCancel, onConfirm }) {
return (
<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
    <div className="w-full max-w-sm rounded-md bg-white shadow-xl p-6 space-y-4">
    <div className="flex flex-col items-start space-y-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
        style={{ background: C.redBg }}>
        <FiAlertCircle size={20} style={{ color: C.red }} />
        </div>
        <div>
        <p className="font-bold text-sm" style={{ color: C.dark }}>Delete Chat</p>
        <p className="text-xs mt-0.5 leading-relaxed" style={{ color: C.grey }}>
            Are you sure you want to delete this chat? This action cannot be undone.
        </p>
        </div>
    </div>

    <div className="flex gap-3 pt-1">
        <button
        onClick={onCancel}
        className="flex-1 rounded-md border border-slate-200 py-2 text-sm font-semibold transition hover:bg-slate-50"
        style={{ color: C.dark }}
        >
        Cancel
        </button>
        <button
        onClick={onConfirm}
        className="flex-1 rounded-md py-2 text-sm font-semibold text-white transition hover:opacity-90"
        style={{ background: C.red }}
        >
        Delete
        </button>
    </div>
    </div>
</div>
);
}