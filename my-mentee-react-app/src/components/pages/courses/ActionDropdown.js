import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronDown, FiDownload, FiClipboard, FiCheckCircle } from "react-icons/fi";

const C = { red: "#CF173C" };

export default function ActionDropdown({ status, onComplete, onDownload }) {
const [open, setOpen] = useState(false);
const ref = useRef(null);
const navigate = useNavigate();

useEffect(() => {
const handler = (e) => {
    if (ref.current && !ref.current.contains(e.target)) setOpen(false);
};
document.addEventListener("mousedown", handler);
return () => document.removeEventListener("mousedown", handler);
}, []);

const options =
status === "Completed"
    ? [{ label: "View Assessment", icon: <FiClipboard size={13} />, action: "assessment" }]
    : status === "Pending"
    ? [{ label: "Download",        icon: <FiDownload size={13} />,  action: "download"   }]
    : [{ label: "Complete",        icon: <FiCheckCircle size={13}/>, action: "complete"  }];

const handleClick = (action) => {
setOpen(false);
if (action === "assessment") navigate("/assessment");
else if (action === "complete") onComplete && onComplete();
else if (action === "download") onDownload && onDownload();
};

return (
<div className="relative inline-block text-left" ref={ref}>
    <button
    onClick={() => setOpen((v) => !v)}
    className="flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-semibold transition hover:opacity-80"
    style={{ borderColor: C.red, color: C.red, background: "white" }}
    >
    Action{" "}
    <FiChevronDown size={13} className={`transition-transform ${open ? "rotate-180" : ""}`} />
    </button>

    {open && (
    <div className="absolute right-0 z-50 mt-1 w-44 rounded-xl border border-slate-100 bg-white shadow-lg py-1">
        {options.map((opt) => (
        <button key={opt.action} onClick={() => handleClick(opt.action)}
            className="flex w-full items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition">
            {opt.icon}{opt.label}
        </button>
        ))}
    </div>
    )}
</div>
);
}