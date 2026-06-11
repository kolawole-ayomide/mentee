import React from "react";
import { useNavigate } from "react-router-dom";
import { C } from "./data/chatData";
import ChatPanel from "./ChatPanel";
import DiscussionPanel from "./DiscussionPanel";

export default function RightPanel({
activeTab,
selectedMentor,
selectedGroup,
hasMentor,
mentorMessages,
onBack,
onMessagesUpdate,
}) {
const navigate = useNavigate();

return (
<>
    {/* Chat — no mentor at all */}
    {activeTab === "Chat" && !selectedMentor && !hasMentor && (
    <div className="flex flex-1 items-center justify-center flex-col gap-4 text-center px-4">
        <img src="/chatemptystate.png" alt="No mentor"
        onError={(e) => { e.target.onerror = null; e.target.style.display = "none"; }}
        className="w-24 h-auto object-contain" />
        <p className="text-sm font-medium" style={{ color: C.grey }}>
        You have no mentor to start a conversation with
        </p>
        <button onClick={() => navigate("/mentors")}
        className="rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
        style={{ background: C.red }}>
        Choose a mentor
        </button>
    </div>
    )}

    {/* Chat — mentor exists but none selected */}
    {activeTab === "Chat" && !selectedMentor && hasMentor && (
    <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-center px-4" style={{ color: C.grey }}>
        Click on any mentor to start a conversation with
        </p>
    </div>
    )}

    {/* Chat — mentor selected */}
    {activeTab === "Chat" && selectedMentor && (
    <ChatPanel
        key={selectedMentor.id}
        mentor={{
        ...selectedMentor,
        messages: mentorMessages[selectedMentor.id] || selectedMentor.messages,
        }}
        onBack={onBack}
        onMessagesUpdate={(msgs) => onMessagesUpdate(selectedMentor.id, msgs)}
    />
    )}

    {/* Discussions — none selected */}
    {activeTab === "Discussions" && !selectedGroup && (
    <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-center px-4" style={{ color: C.grey }}>
        Select a group to view messages
        </p>
    </div>
    )}

    {/* Discussions — group selected */}
    {activeTab === "Discussions" && selectedGroup && (
    <DiscussionPanel
        key={selectedGroup.id}
        group={selectedGroup}
        onBack={onBack}
    />
    )}
</>
);
}