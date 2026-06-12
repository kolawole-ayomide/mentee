import React, { useState, useEffect, useRef } from "react";
import {
FiMic, FiMicOff, FiVideo, FiVideoOff,
FiMonitor, FiPhoneOff, FiMaximize2, FiMessageSquare,
FiUsers, FiMoreVertical,
} from "react-icons/fi";

const C = { red: "#CF173C", navy: "#312F61", dark: "#1B1A23", grey: "#616E7C" };

function pad(n) { return String(n).padStart(2, "0"); }

export default function CallRoom({ meeting, onClose }) {
const [micOn,        setMicOn]        = useState(true);
const [videoOn,      setVideoOn]      = useState(true);
const [screenShare,  setScreenShare]  = useState(false);
const [callDuration, setCallDuration] = useState(0);
const [showChat,     setShowChat]     = useState(false);
const [showPartic,   setShowPartic]   = useState(false);
const [chatInput,    setChatInput]    = useState("");
const [chatMessages, setChatMessages] = useState([]);
const [ending,       setEnding]       = useState(false);

const videoRef  = useRef(null);
const streamRef = useRef(null);
const timerRef  = useRef(null);

// ── start timer ──
useEffect(() => {
timerRef.current = setInterval(() => {
    setCallDuration((prev) => prev + 1);
}, 1000);
return () => clearInterval(timerRef.current);
}, []);

// ── start camera ──
useEffect(() => {
if (videoOn) {
    navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((stream) => {
        streamRef.current = stream;
        if (videoRef.current) {
        videoRef.current.srcObject = stream;
        }
    })
    .catch(() => {
        // camera not available — that's fine, show placeholder
    });
} else {
    if (streamRef.current) {
    streamRef.current.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    }
    if (videoRef.current) videoRef.current.srcObject = null;
}
return () => {
    if (streamRef.current) {
    streamRef.current.getTracks().forEach((t) => t.stop());
    }
};
}, [videoOn]);

// ── screen share ──
const toggleScreenShare = async () => {
if (!screenShare) {
    try {
    const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
    streamRef.current = stream;
    if (videoRef.current) videoRef.current.srcObject = stream;
    setScreenShare(true);
    stream.getVideoTracks()[0].onended = () => setScreenShare(false);
    } catch {
    // user cancelled
    }
} else {
    if (streamRef.current) {
    streamRef.current.getTracks().forEach((t) => t.stop());
    }
    setScreenShare(false);
}
};

const handleEndCall = () => {
setEnding(true);
clearInterval(timerRef.current);
if (streamRef.current) {
    streamRef.current.getTracks().forEach((t) => t.stop());
}
setTimeout(() => onClose(), 1200);
};

const sendChatMessage = () => {
if (!chatInput.trim()) return;
setChatMessages((prev) => [
    ...prev,
    {
    id: Date.now(),
    text: chatInput.trim(),
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
]);
setChatInput("");
};

const minutes = Math.floor(callDuration / 60);
const seconds = callDuration % 60;

const participants = [
{ name: "You",                              initials: "ME", color: C.navy    },
{ name: meeting.mentor || "Daniel Francis", initials: "DF", color: "#2D7D32" },
];

return (
<div
    className="fixed inset-0 z-[100] flex flex-col"
    style={{ background: "#0A0A1A" }}
>
    {/* ── ending overlay ── */}
    {ending && (
    <div className="absolute inset-0 z-50 flex items-center justify-center"
        style={{ background: "rgba(0,0,0,0.85)" }}>
        <div className="text-center space-y-3">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 mx-auto">
            <FiPhoneOff size={28} className="text-white" />
        </div>
        <p className="text-white text-lg font-semibold">Call Ended</p>
        <p className="text-slate-400 text-sm">
            Duration: {pad(minutes)}:{pad(seconds)}
        </p>
        </div>
    </div>
    )}

    {/* ── top bar ── */}
    <div className="flex items-center justify-between px-6 py-3 shrink-0"
    style={{ background: "rgba(0,0,0,0.4)" }}>
    <div>
        <p className="text-white text-sm font-semibold">{meeting.title}</p>
        <p className="text-slate-400 text-xs">with {meeting.mentor}</p>
    </div>
    {/* ✅ fullscreen button now toggles browser fullscreen API instead of unused state */}
    <div className="flex items-center gap-3">
        <span className="text-xs font-mono px-3 py-1 rounded-full"
        style={{ background: "rgba(255,255,255,0.1)", color: "#4ADE80" }}>
        🔴 {pad(minutes)}:{pad(seconds)}
        </span>
        <button
        onClick={() => {
            if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
            } else {
            document.exitFullscreen().catch(() => {});
            }
        }}
        className="text-slate-400 hover:text-white transition">
        <FiMaximize2 size={16} />
        </button>
    </div>
    </div>

    {/* ── main area ── */}
    <div className="flex flex-1 overflow-hidden">

    {/* ── video grid ── */}
    <div className="flex-1 relative p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">

        {/* Mentor video tile */}
        <div className="relative rounded-2xl overflow-hidden flex items-center justify-center"
            style={{ background: "#1A1A2E", minHeight: "200px" }}>
            <div className="flex flex-col items-center gap-3">
            <div className="h-20 w-20 rounded-full flex items-center justify-center text-white text-2xl font-bold"
                style={{ background: "#2D7D32" }}>
                DF
            </div>
            <p className="text-white text-sm font-medium">
                {meeting.mentor || "Daniel Francis"}
            </p>
            <p className="text-slate-500 text-xs">Camera off</p>
            </div>
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-full"
            style={{ background: "rgba(0,0,0,0.5)" }}>
            <FiMic size={10} className="text-green-400" />
            <span className="text-white text-[10px]">{meeting.mentor || "Daniel Francis"}</span>
            </div>
        </div>

        {/* Your video tile */}
        <div className="relative rounded-2xl overflow-hidden flex items-center justify-center"
            style={{ background: "#1A1A2E", minHeight: "200px" }}>
            {videoOn ? (
            <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover"
            />
            ) : (
            <div className="flex flex-col items-center gap-3">
                <div className="h-20 w-20 rounded-full flex items-center justify-center text-white text-2xl font-bold"
                style={{ background: C.navy }}>
                ME
                </div>
                <p className="text-white text-sm font-medium">You</p>
                <p className="text-slate-500 text-xs">Camera off</p>
            </div>
            )}

            {screenShare && (
            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-full bg-blue-600">
                <FiMonitor size={10} className="text-white" />
                <span className="text-white text-[10px]">Sharing screen</span>
            </div>
            )}

            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-full"
            style={{ background: "rgba(0,0,0,0.5)" }}>
            {micOn
                ? <FiMic size={10} className="text-green-400" />
                : <FiMicOff size={10} className="text-red-400" />}
            <span className="text-white text-[10px]">You</span>
            </div>
        </div>
        </div>
    </div>

    {/* ── side panel: chat or participants ── */}
    {(showChat || showPartic) && (
        <div className="w-72 shrink-0 flex flex-col border-l"
        style={{ background: "#0F0F1E", borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="flex items-center justify-between px-4 py-3 border-b"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            <span className="text-white text-sm font-semibold">
            {showChat ? "In-call Chat" : "Participants"}
            </span>
            <button
            onClick={() => { setShowChat(false); setShowPartic(false); }}
            className="text-slate-500 hover:text-white text-lg leading-none">
            ×
            </button>
        </div>

        {/* Chat panel */}
        {showChat && (
            <>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {chatMessages.length === 0 && (
                <p className="text-slate-600 text-xs text-center mt-8">
                    No messages yet
                </p>
                )}
                {chatMessages.map((msg) => (
                <div key={msg.id} className="flex flex-col items-end">
                    <div className="px-3 py-2 rounded-xl rounded-br-none text-sm text-white max-w-[90%]"
                    style={{ background: C.navy }}>
                    {msg.text}
                    </div>
                    <span className="text-[10px] text-slate-600 mt-0.5">{msg.time}</span>
                </div>
                ))}
            </div>
            <div className="p-3 border-t"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                <div className="flex items-center gap-2 rounded-xl border px-3 py-2"
                style={{ borderColor: "rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.05)" }}>
                <input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendChatMessage()}
                    placeholder="Type a message..."
                    className="flex-1 text-xs bg-transparent outline-none text-white placeholder:text-slate-600"
                />
                <button onClick={sendChatMessage}
                    className="text-xs font-semibold px-2 py-1 rounded-lg transition hover:opacity-80"
                    style={{ background: C.red, color: "#fff" }}>
                    Send
                </button>
                </div>
            </div>
            </>
        )}

        {/* Participants panel */}
        {showPartic && (
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {participants.map((p) => (
                <div key={p.name} className="flex items-center gap-3 px-3 py-2 rounded-xl"
                style={{ background: "rgba(255,255,255,0.05)" }}>
                <div className="h-9 w-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                    style={{ background: p.color }}>
                    {p.initials}
                </div>
                <span className="text-white text-sm">{p.name}</span>
                <FiMic size={12} className="text-green-400 ml-auto" />
                </div>
            ))}
            </div>
        )}
        </div>
    )}
    </div>

    {/* ── control bar ── */}
    <div className="flex items-center justify-center gap-4 py-5 shrink-0"
    style={{ background: "rgba(0,0,0,0.5)" }}>

    {/* Mic */}
    <button onClick={() => setMicOn((v) => !v)}
        className="flex flex-col items-center gap-1 group">
        <div className="h-12 w-12 rounded-full flex items-center justify-center transition"
        style={{ background: micOn ? "rgba(255,255,255,0.15)" : C.red }}>
        {micOn
            ? <FiMic size={20} className="text-white" />
            : <FiMicOff size={20} className="text-white" />}
        </div>
        <span className="text-[10px] text-slate-400">{micOn ? "Mute" : "Unmute"}</span>
    </button>

    {/* Video */}
    <button onClick={() => setVideoOn((v) => !v)}
        className="flex flex-col items-center gap-1">
        <div className="h-12 w-12 rounded-full flex items-center justify-center transition"
        style={{ background: videoOn ? "rgba(255,255,255,0.15)" : C.red }}>
        {videoOn
            ? <FiVideo size={20} className="text-white" />
            : <FiVideoOff size={20} className="text-white" />}
        </div>
        <span className="text-[10px] text-slate-400">{videoOn ? "Stop Video" : "Start Video"}</span>
    </button>

    {/* Screen Share */}
    <button onClick={toggleScreenShare}
        className="flex flex-col items-center gap-1">
        <div className="h-12 w-12 rounded-full flex items-center justify-center transition"
        style={{ background: screenShare ? "#1D4ED8" : "rgba(255,255,255,0.15)" }}>
        <FiMonitor size={20} className="text-white" />
        </div>
        <span className="text-[10px] text-slate-400">{screenShare ? "Stop Share" : "Share Screen"}</span>
    </button>

    {/* Chat */}
    <button onClick={() => { setShowChat((v) => !v); setShowPartic(false); }}
        className="flex flex-col items-center gap-1">
        <div className="h-12 w-12 rounded-full flex items-center justify-center transition"
        style={{ background: showChat ? C.navy : "rgba(255,255,255,0.15)" }}>
        <FiMessageSquare size={20} className="text-white" />
        </div>
        <span className="text-[10px] text-slate-400">Chat</span>
    </button>

    {/* Participants */}
    <button onClick={() => { setShowPartic((v) => !v); setShowChat(false); }}
        className="flex flex-col items-center gap-1">
        <div className="h-12 w-12 rounded-full flex items-center justify-center transition"
        style={{ background: showPartic ? C.navy : "rgba(255,255,255,0.15)" }}>
        <FiUsers size={20} className="text-white" />
        </div>
        <span className="text-[10px] text-slate-400">Participants</span>
    </button>

    {/* More */}
    <button className="flex flex-col items-center gap-1">
        <div className="h-12 w-12 rounded-full flex items-center justify-center"
        style={{ background: "rgba(255,255,255,0.15)" }}>
        <FiMoreVertical size={20} className="text-white" />
        </div>
        <span className="text-[10px] text-slate-400">More</span>
    </button>

    {/* End Call */}
    <button onClick={handleEndCall}
        className="flex flex-col items-center gap-1">
        <div className="h-12 w-12 rounded-full flex items-center justify-center transition hover:opacity-80"
        style={{ background: C.red }}>
        <FiPhoneOff size={20} className="text-white" />
        </div>
        <span className="text-[10px] text-red-400 font-semibold">End Call</span>
    </button>
    </div>
</div>
);
}