import React from "react";
import { C } from "./data/chatData";
import Avatar from "./Avatar";
import { getPreview } from "./utils/chatUtils";

export default function ChatList({ mentors, mentorMessages, selectedMentor, onSelect, search }) {
const filtered = mentors.filter((m) =>
m.name.toLowerCase().includes(search.toLowerCase())
);

return (
<div className="flex-1 overflow-y-auto min-h-0">
    {filtered.map((mentor) => {
    const liveMessages = mentorMessages[mentor.id] || mentor.messages || [];
    const preview = getPreview(liveMessages);
    return (
        <button key={mentor.id} onClick={() => onSelect(mentor)}
        className={`flex w-full items-center gap-3 px-4 py-3 text-left border-b border-slate-50 transition
            ${selectedMentor?.id === mentor.id ? "bg-slate-50" : "hover:bg-slate-50"}`}>
        <Avatar src={mentor.avatar} name={mentor.name} online={mentor.online} />
        <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
            <span className="text-xs font-semibold truncate" style={{ color: C.dark }}>
                {mentor.name}
            </span>
            <span className="text-[10px] shrink-0 ml-2" style={{ color: C.grey }}>
                {mentor.time}
            </span>
            </div>
            <p className="text-xs truncate mt-0.5" style={{ color: C.grey }}>{preview}</p>
        </div>
        </button>
    );
    })}
</div>
);
}