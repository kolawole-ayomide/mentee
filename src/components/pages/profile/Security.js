import React, { useState } from "react";
import { FiEye, FiEyeOff, FiCheckCircle } from "react-icons/fi";
import { C } from "./data/profileData";

function PasswordInput({ value, onChange, placeholder, valid }) {
const [show, setShow] = useState(false);
return (
<div className="relative flex items-center">
    <input
    type={show ? "text" : "password"}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm pr-16 focus:outline-none focus:ring-2 focus:ring-[#312F61]/20"
    />
    <div className="absolute right-2 flex items-center gap-1">
    <button type="button" onClick={() => setShow((v) => !v)}
        className="text-slate-400 hover:text-slate-600 transition p-1">
        {show ? <FiEyeOff size={15} /> : <FiEye size={15} />}
    </button>
    {valid && <FiCheckCircle size={15} style={{ color: "#069D16" }} />}
    </div>
</div>
);
}

export default function Security() {
const [changing,     setChanging]     = useState(false);
const [showCurrent,  setShowCurrent]  = useState(false);
const [form,         setForm]         = useState({ current: "", newPass: "", confirm: "" });
const [saved,        setSaved]        = useState(false);

const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

const newValid     = form.newPass.length >= 8;
const confirmValid = form.confirm === form.newPass && form.confirm.length > 0;
const canSave      = form.current.length > 0 && newValid && confirmValid;

const handleSave = () => {
if (!canSave) return;
setSaved(true);
setChanging(false);
setForm({ current: "", newPass: "", confirm: "" });
setTimeout(() => setSaved(false), 3000);
};

return (
<div className="max-w-lg space-y-6 pb-[25rem] md:pb-[15rem]">
    <p className="text-base font-bold" style={{ color: C.dark }}>Security</p>

    {!changing ? (
    /* ── default view ── */
    <div className="flex items-center justify-between gap-4 ">
        <div className="">
            <p className="text-xs font-semibold mb-1 text-[#616E7C]" >Your Password</p>
            <div className=" flex gap-2 items-center">
            {/* password dots + eye toggle */}
            <div className="flex items-center justify-center space-x-20">
                <p className="text-sm tracking-widest" style={{ color: C.grey }}>
                {showCurrent ? "password123" : "••••••••"}
                </p>
                <button type="button" onClick={() => setShowCurrent((v) => !v)}
                className="text-slate-400 hover:text-slate-600 transition">
                {showCurrent ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                </button>
            </div>
            <button onClick={() => setChanging(true)}
            className="shrink-0 rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold transition hover:bg-slate-50"
            style={{ color: C.dark }}>
            Change Password
            </button>
            </div>
        </div>
    </div>
    ) : (
    /* ── change password form ── */
    <div className="space-y-4">
        <div>
        <p className="text-base font-bold mb-1" style={{ color: C.dark }}>Change Password</p>
        <p className="text-xs" style={{ color: C.grey }}>
            Password should be at least 8 characters, should contain a capital letter, small
            letter, a number and a special character
        </p>
        </div>

        <div className="space-y-1">
        <label className="text-xs font-semibold" style={{ color: C.dark }}>Current password</label>
        <PasswordInput value={form.current} onChange={set("current")}
            placeholder="••••••••" valid={form.current.length > 0} />
        </div>

        <div className="space-y-1">
        <label className="text-xs font-semibold" style={{ color: C.dark }}>New password</label>
        <PasswordInput value={form.newPass} onChange={set("newPass")}
            placeholder="••••••••" valid={newValid} />
        </div>

        <div className="space-y-1">
        <label className="text-xs font-semibold" style={{ color: C.dark }}>Confirm password</label>
        <PasswordInput value={form.confirm} onChange={set("confirm")}
            placeholder="••••••••" valid={confirmValid} />
        </div>

        <div className="flex items-center gap-3 pt-1">
        <button onClick={handleSave} disabled={!canSave}
            className="rounded-lg border px-6 py-2 text-xs font-semibold transition"
            style={{
            borderColor: canSave ? C.red : "#e2e8f0",
            color: canSave ? C.red : C.grey,
            cursor: canSave ? "pointer" : "not-allowed",
            }}>
            Save
        </button>
        <button
            onClick={() => { setChanging(false); setForm({ current: "", newPass: "", confirm: "" }); }}
            className="text-xs font-semibold transition hover:opacity-70"
            style={{ color: C.grey }}>
            Cancel
        </button>
        </div>
    </div>
    )}

    {saved && (
    <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
        <FiCheckCircle size={16} /> Password updated successfully!
    </div>
    )}
</div>
);
}