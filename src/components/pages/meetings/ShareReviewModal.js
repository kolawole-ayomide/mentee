import React, { useState } from "react";
import { FiX, FiStar } from "react-icons/fi";

const C = { red: "#CF173C", dark: "#1B1A23", grey: "#616E7C" };

export default function ShareReviewModal({ onClose, onSubmit }) {
const [review, setReview] = useState("");
const [rating, setRating] = useState(0);
const [hovered, setHovered] = useState(0);

const handleSubmit = () => {
if (!review.trim() || rating === 0) return;
onSubmit && onSubmit({ review, rating });
onClose();
};

return (
<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
    <div className="relative w-full max-w-md rounded-2xl bg-white shadow-xl p-6 space-y-5">
    {/* header */}
    <div className="flex items-center justify-between">
        <h3 className="text-base font-bold" style={{ color: C.dark }}>
        Share a Review
        </h3>
        <button
        onClick={onClose}
        className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-slate-100 transition text-slate-500"
        >
        <FiX size={16} />
        </button>
    </div>

    {/* review textarea */}
    <div className="space-y-1">
        <label className="text-xs font-semibold" style={{ color: C.dark }}>
        Review <span style={{ color: C.red }}>*</span>
        </label>
        <textarea
        rows={5}
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Give a brief review of your completed session."
        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#312F61]/20 resize-none placeholder:text-slate-300"
        />
    </div>

    {/* star rating */}
    <div className="space-y-1">
        <label className="text-xs font-semibold" style={{ color: C.dark }}>
        Rating <span style={{ color: C.red }}>*</span>
        </label>
        <p className="text-xs" style={{ color: C.grey }}>
        How would you rate the concluded session from 1–5
        </p>
        <div className="flex items-center gap-2 pt-1">
        {[1, 2, 3, 4, 5].map((star) => (
            <button
            key={star}
            type="button"
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => setRating(star)}
            className="transition"
            >
            <FiStar
                size={26}
                style={{
                fill: star <= (hovered || rating) ? "#FFCC28" : "none",
                stroke: star <= (hovered || rating) ? "#FFCC28" : "#CBD5E1",
                transition: "all 0.15s",
                }}
            />
            </button>
        ))}
        </div>
    </div>

    {/* submit */}
    <div className="flex justify-end pt-1">
        <button
        onClick={handleSubmit}
        disabled={!review.trim() || rating === 0}
        className="rounded-xl px-8 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
        style={{
            background: review.trim() && rating > 0 ? C.red : "#e2e8f0",
            color: review.trim() && rating > 0 ? "#fff" : C.grey,
            cursor: review.trim() && rating > 0 ? "pointer" : "not-allowed",
        }}
        >
        Submit
        </button>
    </div>
    </div>
</div>
);
}