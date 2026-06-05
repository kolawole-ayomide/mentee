import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { C, MENTORS, OTHER_GROUPS } from "./data/chatData";
import ChatPanel from "./ChatPanel";
import DiscussionPanel from "./DiscussionPanel";
import CreateGroupModal from "./modals/CreateGroupModal";

function Avatar({ src, name, online = false }) {
const [err, setErr] = useState(false);
const initials = name?.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
return (
<div className="relative h-10 w-10 shrink-0">
     {!err && src ? (
     <img src={src} alt={name} onError={() => setErr(true)} className="h-10 w-10 rounded-full object-cover" />
     ) : (
     <div className="h-10 w-10 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: C.navy }}>
     {initials}
     </div>
     )}
     {online && (
     <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-white" />
     )}
</div>
);
}

function getPreview(messages) {
if (!messages || messages.length === 0) return "No messages yet";
const last = messages[messages.length - 1];
const prefix = last.from === "me" || last.sender === "me" ? "You: " : "";
return `${prefix}${last.text}`;
}

export default function Chat() {
const navigate = useNavigate();

const [activeTab, setActiveTab] = useState("Chat");
const [selectedMentor, setSelectedMentor] = useState(null);
const [selectedGroup, setSelectedGroup] = useState(null);
const [groupTab, setGroupTab] = useState("Other groups");
const [myGroups, setMyGroups] = useState([]);
const [showCreate, setShowCreate] = useState(false);
const [search, setSearch] = useState("");

// Load joined groups
const [joinedGroups, setJoinedGroups] = useState(() => {
try {
     const saved = localStorage.getItem("vmpJoinedGroups");
     return saved ? JSON.parse(saved) : [OTHER_GROUPS[0]];
} catch {
     return [OTHER_GROUPS[0]];
}
});

// Load mentor messages from localStorage
const [mentorMessages, setMentorMessages] = useState(() => {
try {
     const saved = localStorage.getItem("vmpMentorMessages");
     return saved ? JSON.parse(saved) : Object.fromEntries(MENTORS.map((m) => [m.id, m.messages || []]));
} catch {
     return Object.fromEntries(MENTORS.map((m) => [m.id, m.messages || []]));
}
});

// Load my created groups
useEffect(() => {
try {
     const savedMyGroups = localStorage.getItem("vmpMyGroups");
     if (savedMyGroups) setMyGroups(JSON.parse(savedMyGroups));
} catch (e) {
     console.error(e);
}
}, []);

// Save mentor messages
useEffect(() => {
localStorage.setItem("vmpMentorMessages", JSON.stringify(mentorMessages));
}, [mentorMessages]);

// Save my groups
useEffect(() => {
localStorage.setItem("vmpMyGroups", JSON.stringify(myGroups));
}, [myGroups]);

const hasMentor = MENTORS.length > 0;

const handleCreateGroup = (form) => {
const newGroup = {
     id: Date.now(),
     name: form.name,
     avatar: "/groupchatprofilepic.png",
     participants: 1,
     members: 1,
     mentors: 0,
     time: "",
     description: form.description,
     messages: [],
};
setMyGroups((prev) => [...prev, newGroup]);
};

const handleJoinGroup = (group) => {
if (!joinedGroups.find((g) => g.id === group.id)) {
     const updated = [...joinedGroups, group];
     setJoinedGroups(updated);
     localStorage.setItem("vmpJoinedGroups", JSON.stringify(updated));
}
setSelectedGroup(group);
};

const handleMessagesUpdate = (mentorId, updatedMessages) => {
setMentorMessages((prev) => ({ ...prev, [mentorId]: updatedMessages }));
};

const filteredMentors = MENTORS.filter((m) =>
m.name.toLowerCase().includes(search.toLowerCase())
);

const filteredJoined = joinedGroups.filter((g) =>
g.name.toLowerCase().includes(search.toLowerCase())
);

const currentGroups =
groupTab === "My Groups"
     ? myGroups
     : OTHER_GROUPS.filter((g) => g.name.toLowerCase().includes(search.toLowerCase()));

const mobileRight =
(activeTab === "Chat" && selectedMentor) ||
(activeTab === "Discussions" && selectedGroup) ||
(activeTab === "Chat" && !hasMentor);

return (
<>
     <div className="flex flex-col h-full min-h-0 -m-4 sm:-m-5 lg:-m-6">
     <div className="px-4 sm:px-5 lg:px-6 pt-4 sm:pt-5 lg:pt-6 pb-3 shrink-0">
     <h2 className="text-xl font-bold" style={{ color: C.dark }}>Messages</h2>
     </div>

     <div className="flex flex-1 overflow-hidden border-t border-slate-100 min-h-0">
     {/* LEFT PANEL */}
     <div className={`flex flex-col w-full lg:w-72 shrink-0 border-r border-slate-100 ${mobileRight ? "hidden lg:flex" : "flex"}`}>

          {/* Tabs */}
          <div className="flex items-center gap-2 px-4 pt-4 pb-3 border-b border-slate-100 shrink-0">
          {["Chat", "Discussions"].map((tab) => (
               <button
               key={tab}
               onClick={() => {
               setActiveTab(tab);
               setSelectedMentor(null);
               setSelectedGroup(null);
               setSearch("");
               }}
               className="rounded-lg px-4 py-1.5 text-sm font-semibold transition"
               style={activeTab === tab ? { background: C.red, color: "#fff" } : { color: C.grey }}
               >
               {tab}
               </button>
          ))}
          </div>

          {/* Search */}
          <div className="px-4 py-3 shrink-0">
          <div className="relative">
               <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-3.5 w-3.5" />
               <input
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               placeholder="Search"
               className="w-full rounded-lg border border-slate-200 py-1.5 pl-8 pr-3 text-xs focus:outline-none"
               />
          </div>
          </div>

          {/* Chat List */}
          {activeTab === "Chat" && (
          <div className="flex-1 overflow-y-auto min-h-0">
               {filteredMentors.map((mentor) => {
               const liveMessages = mentorMessages[mentor.id] || mentor.messages || [];
               const preview = getPreview(liveMessages);
               return (
               <button
                    key={mentor.id}
                    onClick={() => setSelectedMentor(mentor)}
                    className={`flex w-full items-center gap-3 px-4 py-3 text-left border-b border-slate-50 transition ${selectedMentor?.id === mentor.id ? "bg-slate-50" : "hover:bg-slate-50"}`}
               >
                    <Avatar src={mentor.avatar} name={mentor.name} online={mentor.online} />
                    <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                         <span className="text-xs font-semibold truncate" style={{ color: C.dark }}>{mentor.name}</span>
                         <span className="text-[10px] shrink-0 ml-2" style={{ color: C.grey }}>{mentor.time}</span>
                    </div>
                    <p className="text-xs truncate mt-0.5" style={{ color: C.grey }}>{preview}</p>
                    </div>
               </button>
               );
               })}
          </div>
          )}

          {/* Discussions List */}
          {activeTab === "Discussions" && (
          <div className="flex flex-col flex-1 overflow-hidden min-h-0">
               <div className="flex-1 overflow-y-auto min-h-0">
               {filteredJoined.map((group) => (
               <button
                    key={group.id}
                    onClick={() => setSelectedGroup(group)}
                    className={`flex w-full items-center gap-3 px-4 py-3 text-left border-b border-slate-50 transition ${selectedGroup?.id === group.id ? "bg-slate-50" : "hover:bg-slate-50"}`}
               >
                    <img src={group.avatar || "/groupchatprofilepic.png"} alt={group.name} className="h-10 w-10 rounded-full object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                         <span className="text-xs font-semibold truncate" style={{ color: C.dark }}>{group.name}</span>
                         <span className="text-[10px] shrink-0 ml-2" style={{ color: C.grey }}>{group.time}</span>
                    </div>
                    <p className="text-xs truncate mt-0.5" style={{ color: C.grey }}>{getPreview(group.messages)}</p>
                    </div>
               </button>
               ))}

               <div className="flex items-center gap-4 px-4 pt-3 pb-1 shrink-0">
               {["Other groups", "My Groups"].map((t) => (
                    <button
                    key={t}
                    onClick={() => setGroupTab(t)}
                    className="text-xs font-semibold pb-0.5 border-b-2 transition"
                    style={groupTab === t ? { borderColor: C.red, color: C.red } : { borderColor: "transparent", color: C.grey }}
                    >
                    {t}
                    </button>
               ))}
               </div>

               {groupTab === "Other groups" && currentGroups.map((group) => (
               <div key={group.id} className="flex w-full items-center gap-3 px-4 py-3 border-b border-slate-50">
                    <div className="h-10 w-10 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0" style={{ background: C.red }}>
                    {group.name.split(" ").map((w) => w[0]).join("").slice(0, 3).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold truncate" style={{ color: C.dark }}>{group.name}</p>
                    <p className="text-[10px]" style={{ color: C.grey }}>{group.participants} participant</p>
                    </div>
                    <button
                    onClick={() => handleJoinGroup(group)}
                    className="shrink-0 rounded-lg border px-3 py-1 text-xs font-semibold transition hover:opacity-80"
                    style={{ borderColor: C.red, color: C.red }}
                    >
                    Join
                    </button>
               </div>
               ))}

               {groupTab === "My Groups" && (
               myGroups.length === 0 ? (
                    <p className="text-xs text-center py-4 px-4" style={{ color: C.grey }}>You have not created any group yet</p>
               ) : (
                    myGroups.map((group) => (
                    <button
                         key={group.id}
                         onClick={() => setSelectedGroup(group)}
                         className={`flex w-full items-center gap-3 px-4 py-3 text-left border-b border-slate-50 transition ${selectedGroup?.id === group.id ? "bg-slate-50" : "hover:bg-slate-50"}`}
                    >
                         <div className="h-10 w-10 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ background: C.navy }}>
                         {group.name.charAt(0)}
                         </div>
                         <div className="flex-1 min-w-0">
                         <p className="text-xs font-semibold truncate" style={{ color: C.dark }}>{group.name}</p>
                         <p className="text-[10px] truncate" style={{ color: C.grey }}>{getPreview(group.messages)}</p>
                         </div>
                    </button>
                    ))
               )
               )}
               </div>

               <div className="sticky bottom-0 bg-white shrink-0 px-4 py-3 border-t border-slate-100">
               <button onClick={() => setShowCreate(true)} className="text-xs font-semibold w-full text-center transition hover:opacity-70" style={{ color: C.red }}>
               + Create Discussion Group
               </button>
               </div>
          </div>
          )}
     </div>

     {/* RIGHT PANEL */}
     <div className={`flex-1 min-w-0 min-h-0 ${mobileRight ? "flex flex-col" : "hidden lg:flex lg:flex-col"}`}>
          {activeTab === "Chat" && !selectedMentor && !hasMentor && (
          <div className="flex flex-1 items-center justify-center flex-col gap-4 text-center px-4 my-16">
               <img src="/chatemptystate.png" alt="No mentor" className="w-24 h-auto object-contain" />
               <p className="text-sm font-medium" style={{ color: C.grey }}>You have no mentor to start a conversation with</p>
               <button onClick={() => navigate("/mentors")} className="rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90" style={{ background: C.red }}>
               Choose a mentor
               </button>
          </div>
          )}

          {activeTab === "Chat" && !selectedMentor && hasMentor && (
          <div className="flex flex-1 items-center justify-center">
               <p className="text-sm text-center px-4" style={{ color: C.grey }}>Click on any mentor to start a conversation with</p>
          </div>
          )}

          {activeTab === "Chat" && selectedMentor && (
          <ChatPanel
               mentor={{ ...selectedMentor, messages: mentorMessages[selectedMentor.id] || selectedMentor.messages }}
               onBack={() => setSelectedMentor(null)}
               onMessagesUpdate={(msgs) => handleMessagesUpdate(selectedMentor.id, msgs)}
          />
          )}

          {activeTab === "Discussions" && !selectedGroup && (
          <div className="flex flex-1 items-center justify-center">
               <p className="text-sm text-center px-4" style={{ color: C.grey }}>Select a group to view messages</p>
          </div>
          )}

          {activeTab === "Discussions" && selectedGroup && (
          <DiscussionPanel group={selectedGroup} onBack={() => setSelectedGroup(null)} />
          )}
     </div>
     </div>
     </div>

     {showCreate && <CreateGroupModal onClose={() => setShowCreate(false)} onCreate={handleCreateGroup} />}
</>
);
}