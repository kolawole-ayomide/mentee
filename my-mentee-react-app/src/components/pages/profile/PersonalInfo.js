import React, { useState, useRef } from "react";
import { IoImageOutline } from "react-icons/io5";
import { C, INITIAL_USER } from "./data/profileData";
import AreaOfImprovement from "./modals/AreaOFImprovement";

/* ── single editable row ─────────────────────────────────────────────────── */
function EditableField({ label, value, onSave, readOnly = false, multiline = false }) {
const [editing, setEditing] = useState(false);
const [draft,   setDraft]   = useState(value);

// Keep draft in sync if parent value changes
React.useEffect(() => { setDraft(value); }, [value]);

const handleSave   = () => { onSave(draft); setEditing(false); };
const handleCancel = () => { setDraft(value); setEditing(false); };

return (
<div className="py-4 border-b border-[#DDDCF9] last:border-0">
    <div className="flex items-start justify-between gap-4">
    <div className="flex-1 min-w-0">
        <p className="text-xs font-bold mb-1" style={{ color: C.dark }}>{label}</p>

        {editing && !readOnly ? (
        <div className="space-y-2">
            {multiline ? (
            <textarea
                rows={4}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#312F61]/20 resize-none"
            />
            ) : (
            <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#312F61]/20"
            />
            )}
            <button
            onClick={handleSave}
            className="rounded-lg px-5 py-1.5 text-xs font-semibold text-white transition hover:opacity-90"
            style={{ background: C.navy }}
            >
            Update
            </button>
        </div>
        ) : (
        <p className="text-sm" style={{ color: value ? C.grey : "#CBD5E1" }}>
            {value || "—"}
        </p>
        )}
    </div>

    <div className="shrink-0 mt-1 min-w-[50px] text-right">
        {readOnly ? (
        <span className="text-xs font-semibold" style={{ color: "#CBD5E1" }}>Edit</span>
        ) : editing ? (
        <button
            onClick={handleCancel}
            className="text-xs font-semibold transition hover:opacity-70"
            style={{ color: C.red }}
        >
            Cancel
        </button>
        ) : (
        <button
            onClick={() => setEditing(true)}
            className="text-xs font-semibold transition hover:opacity-70"
            style={{ color: C.red }}
        >
            Edit
        </button>
        )}
    </div>
    </div>
</div>
);
}

/* ── helper: initials avatar ─────────────────────────────────────────────── */
function getInitials(firstName = "", lastName = "") {
const f = firstName.trim().charAt(0).toUpperCase();
const l = lastName.trim().charAt(0).toUpperCase();
return f + l || "U";
}

/* ── main component ──────────────────────────────────────────────────────── */
export default function PersonalInfo() {
const [user, setUser]                       = useState(INITIAL_USER);
const [showImprovement, setShowImprovement] = useState(false);
const [avatarErr, setAvatarErr]             = useState(false);
const fileRef = useRef(null);

const update = (field) => (val) => {
setUser((prev) => {
    const updated = { ...prev, [field]: val };
    // Persist changes back to localStorage
    try {
    const existing = JSON.parse(localStorage.getItem("vmpUser") || "{}");
    localStorage.setItem("vmpUser", JSON.stringify({
        ...existing,
        // map profile fields back to storage keys
        name:        `${updated.firstName} ${updated.lastName}`.trim(),
        email:       updated.workEmail,
        phone:       updated.phone,
        staffId:     updated.staffId,
        designation: updated.designation,
        bio:         updated.bio,
        avatar:      updated.avatar,
        areasOfImprovement: updated.areasOfImprovement,
    }));
    } catch {
    // fail silently
    }
    return updated;
});
};

const handleAvatarChange = (e) => {
const file = e.target.files[0];
if (!file) return;
if (file.size > 2 * 1024 * 1024) {
    alert("Please select an image smaller than 2MB.");
    return;
}
const reader = new FileReader();
reader.onloadend = () => {
    update("avatar")(reader.result);
    setAvatarErr(false);
};
reader.readAsDataURL(file);
};

const initials = getInitials(user.firstName, user.lastName);

return (
<>
    <div className="flex flex-col lg:flex-row">

    {/* ── LEFT 40% ── */}
    <div className="flex flex-col items-center lg:items-start gap-4 w-full lg:w-[40%] shrink-0 pr-0 lg:pr-10 pb-8 lg:pb-0">

        {/* Avatar */}
        <div className="relative">
        {!avatarErr && user.avatar ? (
            <img
            src={user.avatar}
            alt={user.firstName}
            onError={() => setAvatarErr(true)}
            className="h-28 w-28 rounded-full object-cover shadow"
            />
        ) : (
            <div
            className="h-28 w-28 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow"
            style={{ background: C.navy }}
            >
            {initials}
            </div>
        )}
        <button
            onClick={() => fileRef.current.click()}
            className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow transition hover:opacity-90"
            aria-label="Change photo"
        >
            <IoImageOutline size={17} color={C.navy} />
        </button>
        <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
        />
        </div>

        {/* Name + email + staffId */}
        <div className="text-center lg:text-left">
        <p className="font-bold text-base" style={{ color: C.dark }}>
            {user.firstName || user.lastName
            ? `${user.firstName} ${user.lastName}`.trim()
            : "—"}
        </p>
        <p className="text-xs mt-0.5" style={{ color: C.grey }}>
            {user.workEmail || "—"}
        </p>
        <p className="text-xs" style={{ color: C.grey }}>
            {user.staffId || "—"}
        </p>
        </div>

        {/* Bio */}
        <div className="w-full">
        <p className="text-xs font-bold mb-1" style={{ color: C.dark }}>Bio/Summary</p>
        <p className="text-xs leading-relaxed" style={{ color: C.grey }}>
            {user.bio || "No bio added yet."}
        </p>
        </div>
    </div>

    {/* ── vertical divider ── */}
    <div className="hidden lg:block w-px bg-[#DDDCF9] mx-0 self-stretch" />

    {/* ── RIGHT 60% ── */}
    <div className="w-full lg:w-[60%] lg:pr-12 lg:pl-7 divide-y divide-[#DDDCF9]">
        <EditableField label="First Name"         value={user.firstName}   onSave={update("firstName")}   />
        <EditableField label="Last Name"          value={user.lastName}    onSave={update("lastName")}    />
        <EditableField label="Username"           value={user.username}    onSave={update("username")}    />
        <EditableField label="Phone Number"       value={user.phone}       onSave={update("phone")}       />
        <EditableField label="Work Email Address" value={user.workEmail}   onSave={update("workEmail")}   />
        <EditableField label="Staff ID"           value={user.staffId}     onSave={update("staffId")}     readOnly />
        <EditableField label="Designation"        value={user.designation} onSave={update("designation")} readOnly />
        <EditableField label="Bio/Summary"        value={user.bio}         onSave={update("bio")}         multiline />

        {/* Area of Improvement */}
        <div className="py-4">
        <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
            <p className="text-xs font-bold mb-2" style={{ color: C.dark }}>Area of Improvement</p>
            <div className="flex flex-wrap gap-2">
                {user.areasOfImprovement.length > 0 ? (
                user.areasOfImprovement.map((area) => (
                    <span
                    key={area}
                    className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium border border-[#DDDCF9]"
                    style={{ background: "#FFFFFF", color: C.grey }}
                    >
                    {area}
                    </span>
                ))
                ) : (
                <p className="text-xs" style={{ color: "#CBD5E1" }}>No areas selected yet.</p>
                )}
            </div>
            </div>
            <button
            onClick={() => setShowImprovement(true)}
            className="shrink-0 text-xs font-semibold mt-1 transition hover:opacity-70"
            style={{ color: C.red }}
            >
            Update
            </button>
        </div>
        </div>
    </div>
    </div>

    {showImprovement && (
    <AreaOfImprovement
        selected={user.areasOfImprovement}
        onClose={() => setShowImprovement(false)}
        onSave={(areas) => {
        update("areasOfImprovement")(areas);
        setShowImprovement(false);
        }}
    />
    )}
</>
);
}