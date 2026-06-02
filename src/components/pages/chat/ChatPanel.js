import React, { useState, useRef, useEffect } from "react";
import { FiArrowLeft, FiSmile, FiPaperclip } from "react-icons/fi";
import { IoMdSend } from "react-icons/io";
import { C } from "./data/chatData";
import MessageBubble from "./MessageBubble";

function Avatar({ src, name, online = false }) {
const [err, setErr] = useState(false);
const initials = name?.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
return (
<div className="relative h-9 w-9 shrink-0">
    {!err && src ? (
    <img src={src} alt={name} onError={() => setErr(true)}
        className="h-9 w-9 rounded-full object-cover" />
    ) : (
    <div className="h-9 w-9 rounded-full flex items-center justify-center text-white text-xs font-bold"
        style={{ background: C.navy }}>{initials}</div>
    )}
    {online && (
    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-white" />
    )}
</div>
);
}

export default function ChatPanel({ mentor, onBack, onMessagesUpdate }) {
const [messages, setMessages] = useState(mentor.messages);
const [input, setInput]       = useState("");
const [typing, setTyping]     = useState(false);
const bottomRef = useRef(null);

const currentUser = { name: "You", avatar: "/user.png", online: true };

useEffect(() => {
bottomRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages, typing]);

const send = () => {
if (!input.trim()) return;
const newMsg = {
    id: Date.now(), from: "me", text: input.trim(),
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
};
const updated = [...messages, newMsg];
setMessages(updated);
/* notify parent so preview updates */
onMessagesUpdate && onMessagesUpdate(updated);
setInput("");
setTyping(true);
setTimeout(() => setTyping(false), 2000);
};

return (
<div className="flex flex-col h-full min-h-0">
    {/* sticky header */}
    <div className="sticky top-0 z-10 flex items-center gap-3 px-4 py-3 border-b border-slate-100 bg-white shrink-0">
    <button onClick={onBack}
        className="lg:hidden flex items-center justify-center h-8 w-8 rounded-full hover:bg-slate-100 transition"
        aria-label="Back to chats">
        <FiArrowLeft size={16} style={{ color: C.dark }} />
    </button>
    <Avatar src={mentor.avatar} name={mentor.name} online={mentor.online} />
    <div>
        <p className="text-sm font-bold" style={{ color: C.dark }}>{mentor.name}</p>
        <p className="text-xs" style={{ color: mentor.online ? "#069D16" : C.grey }}>
        {mentor.online ? "Online" : "Offline"}
        </p>
    </div>
    </div>

    {/* messages */}
    <div className="flex-1 overflow-y-auto py-4 space-y-3 min-h-0">
    {messages.map((msg, idx) => {
        const isMe = msg.from === "me";
        return (
        <div key={msg.id} className="space-y-2">
            {idx === 0 && (
            <p className="text-center text-[11px] py-1" style={{ color: C.grey }}>
                Yesterday, 12:03 pm
            </p>
            )}
            {idx === 1 && (
            <div className="flex items-center gap-2 px-4">
                <div className="flex-1 border-t" style={{ borderColor: "#CF173C55" }} />
                <span className="text-[11px]" style={{ color: C.red }}>New message</span>
                <div className="flex-1 border-t" style={{ borderColor: "#CF173C55" }} />
            </div>
            )}
            {idx === 2 && (
            <p className="text-center text-[11px] py-1" style={{ color: C.grey }}>Today</p>
            )}
            <MessageBubble
            msg={msg}
            isMe={isMe}
            mentorName={mentor.name}
            mentorAvatar={mentor.avatar}
            mentorOnline={mentor.online}
            userName={currentUser.name}
            userAvatar={currentUser.avatar}
            userOnline={currentUser.online}
            />
        </div>
        );
    })}
    {typing && (
        <div className="flex items-center gap-2 px-4">
        <Avatar src={mentor.avatar} name={mentor.name} />
        <span className="text-xs italic" style={{ color: C.grey }}>Typing...</span>
        </div>
    )}
    <div ref={bottomRef} />
    </div>

    {/* input bar */}
    <div className="relative px-4 py-3 border-t border-slate-100 shrink-0 bg-white">
    <div className="flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2">
        <div className="flex items-center gap-3 pr-2">
        <button className="text-slate-400 hover:text-slate-600 transition"><FiSmile size={18} /></button>
        <button className="text-slate-400 hover:text-slate-600 transition"><FiPaperclip size={18} /></button>
        </div>
        <div className="absolute left-[82px] h-9 border border-slate-300" />
        <input value={input} onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && send()}
        placeholder="Write your message..."
        className="flex-1 text-sm outline-none bg-transparent placeholder:text-slate-300" />
        <button onClick={send} className="transition hover:opacity-80">
        <IoMdSend size={20} style={{ color: C.red }} />
        </button>
    </div>
    </div>
</div>
);
}