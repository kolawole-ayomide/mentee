import React, { useState, useRef, useEffect } from "react";
import { FiArrowLeft, FiSend, FiSmile, FiPaperclip, FiMoreVertical } from "react-icons/fi";
import { C } from "./data/chatData";
import GroupInfoModal from "./modals/GroupInfoModal";
import { useUser } from "../../../context/UserContext";

function Avatar({ src, name, online = false }) {
const [err, setErr] = useState(false);
const initials = name?.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
return (
<div className="relative h-8 w-8 shrink-0 rounded-full overflow-hidden flex items-center justify-center text-white text-xs font-bold"
    style={{ background: C.navy }}>
    {!err && src ? (
    <img src={src} alt={name} onError={() => setErr(true)} className="h-full w-full object-cover" />
    ) : (
    initials
    )}
    {online && (
    <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 border-2 border-white" />
    )}
</div>
);
}

export default function DiscussionPanel({ group, onBack }) {
const { user } = useUser();

const [messages, setMessages] = useState([]);
const [input, setInput] = useState("");
const [menuOpen, setMenuOpen] = useState(false);
const [groupInfo, setGroupInfo] = useState(false);

const menuRef = useRef(null);
const bottomRef = useRef(null);

const currentUser = {
name: user?.name || user?.fullName || "You",
avatar: user?.avatar || "/user.png",
online: true
};

// Load messages from localStorage when group changes
useEffect(() => {
try {
    const saved = localStorage.getItem(`vmpGroupMessages_${group.id}`);
    if (saved) {
    setMessages(JSON.parse(saved));
    } else {
    setMessages(group.messages || []);
    }
} catch (e) {
    console.error("Failed to load group messages", e);
    setMessages(group.messages || []);
}
}, [group.id]);

// Save messages to localStorage whenever messages change
useEffect(() => {
localStorage.setItem(`vmpGroupMessages_${group.id}`, JSON.stringify(messages));
}, [messages, group.id]);

// Auto scroll to bottom
useEffect(() => {
bottomRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);

// Close menu when clicking outside
useEffect(() => {
const handler = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
    setMenuOpen(false);
    }
};
document.addEventListener("mousedown", handler);
return () => document.removeEventListener("mousedown", handler);
}, []);

const send = () => {
if (!input.trim()) return;

const newMsg = {
    id: Date.now(),
    sender: "me",
    senderName: currentUser.name,
    senderAvatar: currentUser.avatar,
    text: input.trim(),
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
};

setMessages((prev) => [...prev, newMsg]);
setInput("");
};

return (
<>
    <div className="flex flex-col h-full min-h-0">
    {/* Sticky Header */}
    <div className="sticky top-0 z-10 flex items-center gap-3 px-4 py-3 border-b border-slate-100 bg-white shrink-0">
        <button
        onClick={onBack}
        className="lg:hidden flex items-center justify-center h-8 w-8 rounded-full hover:bg-slate-100 transition"
        aria-label="Back to discussions"
        >
        <FiArrowLeft size={16} style={{ color: C.dark }} />
        </button>

        <img
        src={group.avatar || "/groupchatprofilepic.png"}
        alt={group.name}
        onError={(e) => { e.target.onerror = null; e.target.style.display = "none"; }}
        className="h-9 w-9 rounded-full object-cover shrink-0"
        />

        <div className="flex-1 min-w-0">
        <p className="text-sm font-bold truncate" style={{ color: C.dark }}>{group.name}</p>
        <p className="text-xs" style={{ color: C.grey }}>{group.participants} participant</p>
        </div>

        {/* 3-dot Menu */}
        <div className="relative shrink-0" ref={menuRef}>
        <button
            onClick={() => setMenuOpen((v) => !v)}
            className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition"
        >
            <FiMoreVertical size={16} style={{ color: C.grey }} />
        </button>
        {menuOpen && (
            <div className="absolute right-0 top-10 z-50 w-44 rounded-xl border border-slate-100 bg-white shadow-lg py-1">
            <button
                onClick={() => { setGroupInfo(true); setMenuOpen(false); }}
                className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition"
                style={{ color: C.dark }}
            >
                View Group Info
            </button>
            </div>
        )}
        </div>
    </div>

    {/* Messages Area */}
    <div className="flex-1 overflow-y-auto py-4 space-y-3 min-h-0">
        {messages.map((msg) => {
        const isMe = msg.sender === "me";
        return (
            <div key={msg.id} className={`flex items-end gap-2 px-4 ${isMe ? "flex-row-reverse" : "flex-row"}`}>
            <Avatar
                name={isMe ? currentUser.name : (msg.senderName || msg.sender)}
                src={isMe ? currentUser.avatar : msg.senderAvatar}
                online={isMe ? currentUser.online : false}
            />
            <div className={`max-w-[65%] flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                {!isMe && (
                <span className="text-xs font-semibold mb-0.5" style={{ color: C.red }}>
                    {msg.senderName || msg.sender}
                </span>
                )}
                <div
                className="px-4 py-2.5 text-sm leading-relaxed"
                style={{
                    borderRadius: isMe ? "18px 18px 0px 18px" : "18px 18px 18px 0px",
                    background: isMe ? C.navy : "#f1f5f9",
                    color: isMe ? "#fff" : C.dark,
                }}
                >
                {msg.text}
                </div>
                <span className="text-[10px] mt-1" style={{ color: C.grey }}>{msg.time}</span>
            </div>
            </div>
        );
        })}
        <div ref={bottomRef} />
    </div>

    {/* Input Bar */}
    <div className="px-4 py-3 border-t border-slate-100 shrink-0 bg-white">
        <div className="flex items-center gap-2 rounded-2xl border border-slate-200 px-3 py-2">
        <button className="text-slate-400 hover:text-slate-600 transition"><FiSmile size={18} /></button>
        <button className="text-slate-400 hover:text-slate-600 transition"><FiPaperclip size={18} /></button>
        <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Write your message..."
            className="flex-1 text-sm outline-none bg-transparent placeholder:text-slate-300"
        />
        <button onClick={send} className="transition hover:opacity-80">
            <FiSend size={18} style={{ color: C.red }} />
        </button>
        </div>
    </div>
    </div>

    {groupInfo && <GroupInfoModal group={group} onClose={() => setGroupInfo(false)} />}
</>
);
}