import React, { useState, useRef, useEffect } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { C } from "./data/chatData";
import DeleteModal from "./modals/DeleteModal";

function Avatar({ src, name, online = false }) {
const [err, setErr] = useState(false);
const initials = name?.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
return (
<div className="relative h-8 w-8 shrink-0">
    {!err && src ? (
    <img src={src} alt={name} onError={() => setErr(true)}
        className="h-8 w-8 rounded-full object-cover" />
    ) : (
    <div className="h-8 w-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
        style={{ background: C.navy }}>{initials}</div>
    )}
    {online && (
    <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 border-2 border-white" />
    )}
</div>
);
}

export default function MessageBubble({
msg, isMe,
mentorName, mentorAvatar, mentorOnline,
userAvatar, userName, userOnline,
}) {
const [menuOpen, setMenuOpen] = useState(false);
const [editing,  setEditing]  = useState(false);
const [editText, setEditText] = useState(msg.text);
const [deleted,  setDeleted]  = useState(false);
const [showDel,  setShowDel]  = useState(false);
const ref = useRef(null);

useEffect(() => {
const handler = (e) => {
    if (ref.current && !ref.current.contains(e.target)) setMenuOpen(false);
};
document.addEventListener("mousedown", handler);
return () => document.removeEventListener("mousedown", handler);
}, []);

if (deleted) {
return (
    <div className={`flex px-4 ${isMe ? "justify-end" : "justify-start"}`}>
    <span className="text-xs italic" style={{ color: C.grey }}>This message was deleted ✕</span>
    </div>
);
}

return (
<>
    <div className={`group flex items-end gap-2 px-4 ${isMe ? "flex-row-reverse" : "flex-row"}`}>

    {/* avatar beside every bubble */}
    <Avatar
        src={isMe ? userAvatar : mentorAvatar}
        name={isMe ? userName : mentorName}
        online={isMe ? userOnline : mentorOnline}
    />

    {/* bubble */}
    <div className={`max-w-[65%] flex flex-col ${isMe ? "items-end" : "items-start"}`}>
        <div
        className="px-4 py-2.5 text-sm leading-relaxed"
        style={{
            /* user: square bottom-right corner | mentor: square bottom-left corner */
            borderRadius: isMe ? "18px 18px 0px 18px" : "18px 18px 18px 0px",
            background: isMe ? C.navy : "#f1f5f9",
            color: isMe ? "#fff" : C.dark,
        }}
        >
        {editing ? (
            <input value={editText} onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && setEditing(false)}
            className="bg-transparent outline-none w-full text-sm" autoFocus />
        ) : editText}
        </div>
        <span className="text-[10px] mt-1" style={{ color: C.grey }}>{msg.time}</span>
    </div>

    {/* 3-dot — own messages only, visible on hover */}
    {isMe && (
        <div ref={ref} className="relative self-center opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={() => setMenuOpen((v) => !v)}
            className="h-6 w-6 flex items-center justify-center rounded-full hover:bg-slate-100">
            <FiMoreVertical size={13} style={{ color: C.grey }} />
        </button>
        {menuOpen && (
            <div className="absolute right-0 bottom-8 z-50 w-28 rounded-xl border border-slate-100 bg-white shadow-lg py-1">
            <button onClick={() => { setEditing(true); setMenuOpen(false); }}
                className="w-full text-left px-4 py-2 text-xs hover:bg-slate-50 transition"
                style={{ color: C.dark }}>Edit</button>
            <button onClick={() => { setShowDel(true); setMenuOpen(false); }}
                className="w-full text-left px-4 py-2 text-xs hover:bg-slate-50 transition"
                style={{ color: C.red }}>Delete</button>
            </div>
        )}
        </div>
    )}
    </div>

    {showDel && (
    <DeleteModal
        onCancel={() => setShowDel(false)}
        onConfirm={() => { setDeleted(true); setShowDel(false); }}
    />
    )}
</>
);
}