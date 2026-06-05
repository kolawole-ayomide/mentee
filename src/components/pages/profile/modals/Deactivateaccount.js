import React from "react";
import { FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { C } from "../data/profileData";
import { IoAlert } from "react-icons/io5";
import { useUser } from "../../../../context/UserContext";

export default function DeactivateAccount({ onClose }) {
const navigate = useNavigate();
const { clearUser } = useUser();

const handleDeactivate = () => {
clearUser(); // ── clears context + localStorage ──
sessionStorage.clear();
onClose();
navigate("/");
};

return (
<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
    <div className="w-full max-w-md rounded-2xl bg-white shadow-xl p-6 space-y-4">
    <div className="flex items-center justify-between">
        <h3 className="font-bold text-base" style={{ color: C.dark }}>
        Deactivate Account
        </h3>
        <button
        onClick={onClose}
        className="h-7 w-7 flex items-center justify-center rounded-full hover:bg-slate-100 transition"
        >
        <FiX size={15} />
        </button>
    </div>

    <div className="hidden lg:block h-px bg-[#DDDCF9]" />

    <div className="flex flex-col items-center gap-3 py-2 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#CF173C]">
        <IoAlert size={24} style={{ color: C.white }} />
        </div>
        <p className="text-sm font-medium" style={{ color: C.dark }}>
        Are you sure you want to deactivate your account?
        </p>
        <p className="text-xs leading-relaxed" style={{ color: C.grey }}>
        We're sorry to see you go, but we understand that circumstances change.
        Deactivating your account means you will lose access to all your data
        and history within our platform. Please take a moment to consider the
        implications of this action.
        </p>
    </div>

    <button
        onClick={handleDeactivate}
        className="w-full rounded-xl py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
        style={{ background: C.red }}
    >
        Deactivate
    </button>
    </div>
</div>
);
}