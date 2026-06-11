import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { C, MENTORS, OTHER_GROUPS } from "./data/chatData";
import ChatList from "./ChatList";
import DiscussionList from "./DiscussionList";
import RightPanel from "./RightPanel";
import CreateGroupModal from "./modals/CreateGroupModal";

export default function Chat() {
const [activeTab,      setActiveTab]      = useState("Chat");
const [selectedMentor, setSelectedMentor] = useState(null);
const [selectedGroup,  setSelectedGroup]  = useState(null);
const [myGroups,       setMyGroups]       = useState([]);
const [showCreate,     setShowCreate]     = useState(false);
const [search,         setSearch]         = useState("");

const [joinedGroups, setJoinedGroups] = useState(() => {
try {
     const saved = localStorage.getItem("vmpJoinedGroups");
     return saved ? JSON.parse(saved) : [OTHER_GROUPS[0]];
} catch {
     return [OTHER_GROUPS[0]];
}
});

const [mentorMessages, setMentorMessages] = useState(() => {
try {
     const saved = localStorage.getItem("vmpMentorMessages");
     return saved
     ? JSON.parse(saved)
     : Object.fromEntries(MENTORS.map((m) => [m.id, m.messages || []]));
} catch {
     return Object.fromEntries(MENTORS.map((m) => [m.id, m.messages || []]));
}
});

useEffect(() => {
try {
     const saved = localStorage.getItem("vmpMyGroups");
     if (saved) setMyGroups(JSON.parse(saved));
} catch (e) {
     console.error(e);
}
}, []);

useEffect(() => {
localStorage.setItem("vmpMentorMessages", JSON.stringify(mentorMessages));
}, [mentorMessages]);

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

const handleTabChange = (tab) => {
setActiveTab(tab);
setSelectedMentor(null);
setSelectedGroup(null);
setSearch("");
};

const mobileRight =
(activeTab === "Chat" && selectedMentor) ||
(activeTab === "Discussions" && selectedGroup) ||
(activeTab === "Chat" && !hasMentor);

return (
<>
     <div className="flex flex-col h-full min-h-0 -m-4 sm:-m-5 lg:-m-6">

     {/* Page title */}
     <div className="px-4 sm:px-5 lg:px-6 pt-4 sm:pt-5 lg:pt-6 pb-3 shrink-0">
     <h2 className="text-xl font-bold" style={{ color: C.dark }}>Messages</h2>
     </div>

     <div className="flex flex-1 overflow-hidden border-t border-slate-100 min-h-0">

     {/* ════ LEFT PANEL ════ */}
     <div className={`flex flex-col w-full lg:w-72 shrink-0 border-r border-slate-100 overflow-hidden min-h-0
          ${mobileRight ? "hidden lg:flex" : "flex"}`}>

          {/* Tabs */}
          <div className="flex items-center gap-2 px-4 pt-4 pb-3 border-b border-slate-100 shrink-0">
          {["Chat", "Discussions"].map((tab) => (
               <button key={tab} onClick={() => handleTabChange(tab)}
               className="rounded-lg px-4 py-1.5 text-sm font-semibold transition"
               style={activeTab === tab
               ? { background: C.red, color: "#fff" }
               : { color: C.grey }}>
               {tab}
               </button>
          ))}
          </div>

          {/* Search */}
          <div className="px-4 py-3 shrink-0">
          <div className="relative">
               <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-3.5 w-3.5" />
               <input value={search} onChange={(e) => setSearch(e.target.value)}
               placeholder="Search"
               className="w-full rounded-lg border border-slate-200 py-1.5 pl-8 pr-3 text-xs focus:outline-none" />
          </div>
          </div>

          {/* Chat or Discussion list */}
          {activeTab === "Chat" && (
          <ChatList
               mentors={MENTORS}
               mentorMessages={mentorMessages}
               selectedMentor={selectedMentor}
               onSelect={setSelectedMentor}
               search={search}
          />
          )}

          {activeTab === "Discussions" && (
          <DiscussionList
               joinedGroups={joinedGroups}
               myGroups={myGroups}
               selectedGroup={selectedGroup}
               onSelectGroup={setSelectedGroup}
               onJoinGroup={handleJoinGroup}
               onCreateGroup={() => setShowCreate(true)}
               search={search}
          />
          )}
     </div>

     {/* ════ RIGHT PANEL ════ */}
     <div className={`flex-1 min-w-0 min-h-0 overflow-y-auto
          ${mobileRight ? "flex flex-col" : "hidden lg:flex lg:flex-col"}`}>
          <RightPanel
          activeTab={activeTab}
          selectedMentor={selectedMentor}
          selectedGroup={selectedGroup}
          hasMentor={hasMentor}
          mentorMessages={mentorMessages}
          onBack={() => {
               setSelectedMentor(null);
               setSelectedGroup(null);
          }}
          onMessagesUpdate={handleMessagesUpdate}
          />
     </div>

     </div>
     </div>

     {showCreate && (
     <CreateGroupModal
     onClose={() => setShowCreate(false)}
     onCreate={handleCreateGroup}
     />
     )}
</>
);
}