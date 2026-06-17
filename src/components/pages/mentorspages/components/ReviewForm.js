import React, { useState } from "react";

export default function ReviewForm({ onAddReview }) {
  const [reviewerName, setReviewerName] = useState("");
  const [nameError, setNameError]       = useState("");
  const [message, setMessage]           = useState("");

  const handleNameChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setReviewerName(value);
      setNameError("");
    } else {
      setNameError("Name must contain letters only.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName    = reviewerName.trim();
    const trimmedMessage = message.trim();
    if (!trimmedName || !trimmedMessage) return;

    onAddReview({
      id: Date.now(),
      name: trimmedName,
      role: "Mentee",
      message: trimmedMessage,
      date: new Date().toLocaleDateString("en-GB", {
        day: "numeric", month: "long", year: "numeric",
      }),
    });
    setReviewerName("");
    setMessage("");
    setNameError("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4">
      <h3 className="text-sm font-semibold text-slate-900">Leave a review</h3>
      <div className="space-y-1">
        <input
          type="text"
          value={reviewerName}
          onChange={handleNameChange}
          placeholder="Your name"
          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#312F61]"
        />
        {nameError && <p className="text-[11px] text-rose-500">{nameError}</p>}
      </div>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write your review"
        rows={4}
        className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#312F61]"
      />
      <button type="submit" className="inline-flex items-center justify-center rounded-md bg-rose-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-rose-700">
        Submit Review
      </button>
    </form>
  );
}