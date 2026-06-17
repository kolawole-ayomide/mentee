import React, { useState } from "react";
import { C, OTHER_GROUPS } from "./data/chatData";
import { getPreview } from "./utils/chatUtils";

export default function DiscussionList({
joinedGroups,
myGroups,
selectedGroup,
onSelectGroup,
onJoinGroup,
onCreateGroup,
search,
}) {
const [groupTab, setGroupTab] = useState("Other groups");

const joinedIds = new Set(joinedGroups.map((g) => g.id));

const filteredJoined = joinedGroups.filter((g) =>
g.name.toLowerCase().includes(search.toLowerCase())
);

const currentGroups =
groupTab === "My Groups"
    ? myGroups
    : OTHER_GROUPS.filter(
        (g) =>
        !joinedIds.has(g.id) &&
        g.name.toLowerCase().includes(search.toLowerCase())
    );

return (
<div className="flex flex-col flex-1 overflow-hidden min-h-0">
    <div className="flex-1 overflow-y-auto min-h-0">

    {/* Joined groups */}
    {filteredJoined.map((group) => (
        <button key={group.id} onClick={() => onSelectGroup(group)}
        className={`flex w-full items-center gap-3 px-4 py-3 text-left border-b border-slate-50 transition
            ${selectedGroup?.id === group.id ? "bg-slate-50" : "hover:bg-slate-50"}`}>
        <img src={group.avatar || "/groupchatprofilepic.png"} alt={group.name}
            className="h-10 w-10 rounded-full object-cover shrink-0" />
        <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
            <span className="text-xs font-semibold truncate" style={{ color: C.dark }}>
                {group.name}
            </span>
            <span className="text-[10px] shrink-0 ml-2" style={{ color: C.grey }}>
                {group.time}
            </span>
            </div>
            <p className="text-xs truncate mt-0.5" style={{ color: C.grey }}>
            {getPreview(group.messages)}
            </p>
        </div>
        </button>
    ))}

    {/* Sub-tabs */}
    <div className="flex items-center gap-4 px-4 pt-3 pb-1 shrink-0">
        {["Other groups", "My Groups"].map((t) => (
        <button key={t} onClick={() => setGroupTab(t)}
            className="text-xs font-semibold pb-0.5 border-b-2 transition"
            style={groupTab === t
            ? { borderColor: C.red, color: C.red }
            : { borderColor: "transparent", color: C.grey }}>
            {t}
        </button>
        ))}
    </div>

    {/* Other groups — already joined ones are hidden */}
    {groupTab === "Other groups" && (
        currentGroups.length === 0 ? (
        <p className="text-xs text-center py-4 px-4" style={{ color: C.grey }}>
            No more groups to join
        </p>
        ) : (
        currentGroups.map((group) => (
            <div key={group.id}
            className="flex w-full items-center gap-3 px-4 py-3 border-b border-slate-50">
            <div className="h-10 w-10 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0"
                style={{ background: C.red }}>
                {group.name.split(" ").map((w) => w[0]).join("").slice(0, 3).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold truncate" style={{ color: C.dark }}>
                {group.name}
                </p>
                <p className="text-[10px]" style={{ color: C.grey }}>
                {group.participants} participant
                </p>
            </div>
            <button onClick={() => onJoinGroup(group)}
                className="shrink-0 rounded-lg border px-3 py-1 text-xs font-semibold transition hover:opacity-80"
                style={{ borderColor: C.red, color: C.red }}>
                Join
            </button>
            </div>
        ))
        )
    )}

    {/* My Groups */}
    {groupTab === "My Groups" && (
        myGroups.length === 0
        ? <p className="text-xs text-center py-4 px-4" style={{ color: C.grey }}>
            You have not created any group yet
            </p>
        : myGroups.map((group) => (
            <button key={group.id} onClick={() => onSelectGroup(group)}
                className={`flex w-full items-center gap-3 px-4 py-3 text-left border-b border-slate-50 transition
                ${selectedGroup?.id === group.id ? "bg-slate-50" : "hover:bg-slate-50"}`}>
                <div className="h-10 w-10 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                style={{ background: C.navy }}>
                {group.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold truncate" style={{ color: C.dark }}>
                    {group.name}
                </p>
                <p className="text-[10px] truncate" style={{ color: C.grey }}>
                    {getPreview(group.messages)}
                </p>
                </div>
            </button>
            ))
    )}
    </div>

    {/* Create Group button */}
    <div className="shrink-0 px-4 py-3 border-t border-slate-100 bg-white">
    <button onClick={onCreateGroup}
        className="text-xs font-semibold w-full text-center transition hover:opacity-70"
        style={{ color: C.red }}>
        + Create Discussion Group
    </button>
    </div>
</div>
);
}