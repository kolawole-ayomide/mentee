import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { FiChevronDown, FiDownload, FiClipboard, FiCheckCircle } from "react-icons/fi";

const C = { red: "#CF173C" };

export default function ActionDropdown({ status, onComplete, onDownload }) {
const [open, setOpen] = useState(false);
const [dropdownStyle, setDropdownStyle] = useState({});
const buttonRef   = useRef(null);
const dropdownRef = useRef(null);
const navigate    = useNavigate();

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

// ✅ calculate position — flip up if near bottom of screen
const handleOpen = () => {
if (!open && buttonRef.current) {
    const rect = buttonRef.current.getBoundingClientRect();
    const dropdownHeight = 80;
    const spaceBelow = window.innerHeight - rect.bottom;
    const shouldFlipUp = spaceBelow < dropdownHeight;

    setDropdownStyle({
    position: "fixed",
    right: window.innerWidth - rect.right,
    ...(shouldFlipUp
        ? { bottom: window.innerHeight - rect.top + 4 }
        : { top: rect.bottom + 4 }
    ),
    width: 176,
    zIndex: 9999,
    });
}
setOpen((v) => !v);
};

const options =
status === "Completed"
    ? [{ label: "View Assessment", icon: <FiClipboard size={13} />,  action: "assessment" }]
    : status === "Pending"
    ? [{ label: "Download",        icon: <FiDownload size={13} />,   action: "download"   }]
    : [{ label: "Complete",        icon: <FiCheckCircle size={13} />, action: "complete"  }];

const handleClick = (action) => {
setOpen(false);
if (action === "assessment") navigate("/assessment");
else if (action === "complete") onComplete && onComplete();
else if (action === "download") onDownload && onDownload();
};

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

    {/* ✅ portal — renders outside table, no overflow clipping */}
    {open && createPortal(
    <div
        ref={dropdownRef}
        style={dropdownStyle}
        className="rounded-xl border border-slate-100 bg-white shadow-lg py-1"
    >
        {options.map((opt) => (
        <button
            key={opt.action}
            onClick={() => handleClick(opt.action)}
            className="flex w-full items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition"
        >
            {opt.icon}{opt.label}
        </button>
        ))}
    </div>,
    document.body
    )}
</>
);
}