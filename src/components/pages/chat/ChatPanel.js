import React, { useState, useRef, useEffect } from "react";
import { FiArrowLeft, FiSmile, FiPaperclip, FiMoreVertical, FiTrash2 } from "react-icons/fi";
import { IoMdSend } from "react-icons/io";
import { C } from "./data/chatData";
import MessageBubble from "./MessageBubble";
import { useUser } from "../../../context/UserContext";
import { saveFile, getFile, deleteFile, fileToBase64 } from "./utils/fileStorage";

const EMOJIS = [
"😀","😂","😍","😎","😭","😅","🤔","😊","🥰","😘",
"😜","🤣","😇","🥳","😴","🤯","😤","😡","🥺","😬",
"👍","👎","👏","🙌","🤝","🙏","💪","✌️","👋","🤞",
"❤️","🧡","💛","💚","💙","💜","🖤","💔","💯","🔥",
"⭐","🎉","🎊","🎁","🏆","🚀","💡","📌","✅","❌",
];

const MAX_FILE_MB = 25;

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

// ── Media bubble — loads its file from IndexedDB on mount ──
function MediaMessage({ msg, isMe, onDelete, senderAvatar, senderName, senderOnline }) {
const [showMenu, setShowMenu] = useState(false);
const [fileData, setFileData] = useState(msg.fileData || null);
const menuRef = useRef(null);

// Load from IndexedDB if fileData not in memory
useEffect(() => {
if (fileData) return;
getFile(msg.id).then((record) => {
    if (record?.base64) setFileData(record.base64);
}).catch(() => {});
}, [msg.id, fileData]);

useEffect(() => {
const handler = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) setShowMenu(false);
};
document.addEventListener("mousedown", handler);
return () => document.removeEventListener("mousedown", handler);
}, []);

const handleDelete = async () => {
await deleteFile(msg.id).catch(() => {});
onDelete(msg.id);
setShowMenu(false);
};

const content = () => {
if (!fileData) {
    return (
    <div className="px-4 py-2.5 rounded-2xl text-xs italic flex items-center gap-2"
        style={{ background: "#f1f5f9", color: C.grey }}>
        <span className="text-base">⏳</span>
        <span>Loading {msg.fileName}...</span>
    </div>
    );
}

if (msg.fileType === "image") {
    return (
    <img src={fileData} alt={msg.fileName}
        className="max-w-[220px] rounded-xl object-cover cursor-pointer"
        onClick={() => window.open(fileData, "_blank")} />
    );
}

if (msg.fileType === "video") {
    return (
    <video src={fileData} controls className="max-w-[260px] rounded-xl" />
    );
}

if (msg.fileType === "file") {
    return (
    <a href={fileData} download={msg.fileName} target="_blank" rel="noreferrer"
        className="flex items-center gap-2 px-4 py-2.5 hover:opacity-80 transition"
        style={{
        background: isMe ? C.navy : "#f1f5f9",
        color: isMe ? "#fff" : C.dark,
        borderRadius: isMe ? "18px 18px 0px 18px" : "18px 18px 18px 0px",
        textDecoration: "none",
        }}>
        <span className="text-lg">📄</span>
        <div className="flex flex-col min-w-0">
        <span className="text-sm truncate max-w-[150px]">{msg.fileName}</span>
        <span className="text-[10px] opacity-70">Tap to download</span>
        </div>
    </a>
    );
}
};

return (
<div className={`group flex items-end gap-2 px-4 ${isMe ? "flex-row-reverse" : "flex-row"}`}>
    <Avatar src={senderAvatar} name={senderName} online={senderOnline} />

    <div className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
    {content()}
    <span className="text-[10px] mt-1" style={{ color: C.grey }}>{msg.time}</span>
    </div>

    {isMe && (
    <div ref={menuRef}
        className="relative self-center opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={() => setShowMenu((v) => !v)}
        className="h-6 w-6 flex items-center justify-center rounded-full hover:bg-slate-100">
        <FiMoreVertical size={13} style={{ color: C.grey }} />
        </button>
        {showMenu && (
        <div className="absolute right-0 bottom-8 z-50 w-28 rounded-xl border border-slate-100 bg-white shadow-lg py-1">
            <button onClick={handleDelete}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-500 hover:bg-red-50 transition">
            <FiTrash2 size={12} />
            Delete
            </button>
        </div>
        )}
    </div>
    )}
</div>
);
}

export default function ChatPanel({ mentor, onBack, onMessagesUpdate }) {
const storageKey = `vmpChatMessages_${mentor.id}`;

const [messages,  setMessages]  = useState(() => {
try {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : (mentor.messages || []);
} catch {
    return mentor.messages || [];
}
});

const [input,     setInput]     = useState("");
const [typing,    setTyping]    = useState(false);
const [showEmoji, setShowEmoji] = useState(false);
const [fileError, setFileError] = useState("");

const bottomRef = useRef(null);
const fileRef   = useRef(null);
const emojiRef  = useRef(null);
const { user }  = useUser();

const currentUser = {
name:   user?.name   || "You",
avatar: user?.avatar || "/user.png",
online: true,
};

// ── REPLACE this useEffect in ChatPanel.jsx ──
// Remove onMessagesUpdate from dependency array — it changes every render
    useEffect(() => {
    const toSave = messages.map((m) =>
        m.fileType ? { ...m, fileData: null } : m
    );
    try {
        localStorage.setItem(storageKey, JSON.stringify(toSave));
    } catch {}
    // ── only pass text messages to parent for preview ──
    const textOnly = messages.filter((m) => !m.fileType);
    onMessagesUpdate && onMessagesUpdate(textOnly);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messages, storageKey]); // ← removed onMessagesUpdate from here

useEffect(() => {
bottomRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages, typing]);

useEffect(() => {
const handler = (e) => {
    if (emojiRef.current && !emojiRef.current.contains(e.target)) setShowEmoji(false);
};
document.addEventListener("mousedown", handler);
return () => document.removeEventListener("mousedown", handler);
}, []);

const send = () => {
if (!input.trim()) return;
const newMsg = {
    id: Date.now(),
    from: "me",
    text: input.trim(),
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
};
setMessages((prev) => [...prev, newMsg]);
setInput("");
setTyping(true);
setTimeout(() => setTyping(false), 2000);
};

const handleDelete = (id) => {
setMessages((prev) => prev.filter((m) => m.id !== id));
};

const handleFileChange = async (e) => {
const file = e.target.files[0];
if (!file) return;
setFileError("");

if (file.size > MAX_FILE_MB * 1024 * 1024) {
    setFileError(`File too large. Maximum size is ${MAX_FILE_MB}MB.`);
    e.target.value = "";
    return;
}

const isImage = file.type.startsWith("image/");
const isVideo = file.type.startsWith("video/");
const fileType = isImage ? "image" : isVideo ? "video" : "file";
const msgId = Date.now();

// Convert to base64 and save to IndexedDB
try {
    const base64 = await fileToBase64(file);
    await saveFile(msgId, base64, file.name, fileType);

    const newMsg = {
    id: msgId,
    from: "me",
    text: "",
    fileName: file.name,
    fileData: base64,   // in memory for immediate display
    fileType,
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, newMsg]);
} catch (err) {
    setFileError("Failed to attach file. Please try again.");
}

e.target.value = "";
};

const handleEmojiClick = (emoji) => {
setInput((prev) => prev + emoji);
setShowEmoji(false);
};

return (
<div className="flex flex-col h-full min-h-0">
    {/* Header */}
    <div className="sticky top-0 z-10 flex items-center gap-3 px-4 py-3 border-b border-slate-100 bg-white shrink-0">
    <button onClick={onBack}
        className="lg:hidden flex items-center justify-center h-8 w-8 rounded-full hover:bg-slate-100 transition">
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

    {/* Messages */}
    <div className="flex-1 overflow-y-auto py-4 space-y-3 min-h-0">
    {messages.map((msg, idx) => {
        const isMe = msg.from === "me";
        const isMedia = !!msg.fileType;

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

            {isMedia ? (
            <MediaMessage
                msg={msg}
                isMe={isMe}
                onDelete={handleDelete}
                senderAvatar={isMe ? currentUser.avatar : mentor.avatar}
                senderName={isMe ? currentUser.name : mentor.name}
                senderOnline={isMe ? currentUser.online : mentor.online}
            />
            ) : (
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
            )}
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

    {/* Input Bar */}
    <div className="relative px-4 py-3 border-t border-slate-100 shrink-0 bg-white">
    {fileError && (
        <p className="text-xs text-red-500 mb-2 px-1">{fileError}</p>
    )}

    {showEmoji && (
        <div ref={emojiRef}
        className="absolute bottom-16 left-4 z-50 bg-white border border-slate-200 rounded-2xl shadow-lg p-3 w-72">
        <div className="grid grid-cols-10 gap-1">
            {EMOJIS.map((emoji) => (
            <button key={emoji} onClick={() => handleEmojiClick(emoji)}
                className="text-lg hover:bg-slate-100 rounded-lg p-0.5 transition">
                {emoji}
            </button>
            ))}
        </div>
        </div>
    )}

    <div className="flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2">
        <div className="flex items-center gap-3 pr-2">
        <button type="button" onClick={() => setShowEmoji((v) => !v)}
            className="text-slate-400 hover:text-slate-600 transition">
            <FiSmile size={18} />
        </button>
        <button type="button" onClick={() => fileRef.current.click()}
            className="text-slate-400 hover:text-slate-600 transition">
            <FiPaperclip size={18} />
        </button>
        <input ref={fileRef} type="file"
            accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx,.txt"
            className="hidden" onChange={handleFileChange} />
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