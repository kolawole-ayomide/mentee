import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const C = {
navy: "#312F61",
red:  "#CF173C",
grey: "#616E7C",
dark: "#1B1A23",
};

const QUESTIONS = Array.from({ length: 6 }, (_, i) => ({
id: i + 1,
text: "What is the primary goal of marketing?",
options: [
"A. Increasing company profits",
"B. Providing superior customer service",
"C. Creating and delivering value to customers",
"D. Expanding the company's product portfolio",
],
}));

export default function Assessment() {
const navigate = useNavigate();
const [answers,   setAnswers]   = useState({});
const [submitted, setSubmitted] = useState(false);

const handleSelect = (qId, optIdx) => {
if (submitted) return;
setAnswers((prev) => ({ ...prev, [qId]: optIdx }));
};

const allAnswered = QUESTIONS.every((q) => answers[q.id] !== undefined);

const handleSubmit = () => {
if (!allAnswered) return;

// mark course as completed in localStorage
const completedIds = JSON.parse(localStorage.getItem("completedCourses") || "[]");
if (!completedIds.includes(1)) {
     localStorage.setItem("completedCourses", JSON.stringify([...completedIds, 1]));
}

setSubmitted(true);
};

return (
<div className="space-y-5 max-w-4xl">
     {/* ── header ── */}
     <div className="flex items-start justify-between gap-4">
     <div className="space-y-0.5">
     <h2 className="text-xl font-bold" style={{ color: C.dark }}>Assessment</h2>
     <p className="text-sm" style={{ color: C.dark }}>
          <span className="font-semibold">Course Title:</span>{" "}
          <span className="font-normal">Introduction to Marketing - Quiz</span>
     </p>
     <p className="text-sm" style={{ color: C.dark }}>
          <span className="font-semibold">Mentor:</span>{" "}
          <span className="font-normal">Daniel Francis</span>
     </p>
     </div>

     <button onClick={() => navigate("/courses")}
     className="flex items-center justify-center h-7 w-7 rounded-full border border-slate-200 text-slate-400 hover:bg-slate-50 transition mt-1"
     aria-label="Go back">
     <FiArrowLeft size={14} />
     </button>
     </div>

     {/* instructions */}
     <p className="text-xs italic" style={{ color: C.grey }}>
     Instructions: Answer the following questions to test your understanding of the marketing
     concepts discussed in this module
     </p>

     {/* success banner */}
     {submitted && (
     <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700 flex items-center justify-between gap-4">
     <span>✅ Assessment submitted successfully! Your course has been marked as completed.</span>
     <button
          onClick={() => navigate("/courses")}
          className="shrink-0 rounded-lg px-4 py-1.5 text-xs font-semibold text-white transition hover:opacity-90"
          style={{ background: C.navy }}>
          Back to Courses
     </button>
     </div>
     )}

     {/* ── questions 2-col grid ── */}
     <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
     {QUESTIONS.map((q) => (
     <div key={q.id} className="space-y-2">
          <p className="text-sm font-semibold" style={{ color: C.dark }}>Question {q.id}</p>
          <p className="text-sm" style={{ color: C.dark }}>{q.text}</p>

          <div className="space-y-2 pt-1">
          {q.options.map((opt, idx) => {
               const selected = answers[q.id] === idx;
               return (
               <label key={idx} className="flex items-center gap-3 select-none"
               style={{ cursor: submitted ? "default" : "pointer" }}>
               <span className="flex shrink-0 items-center justify-center rounded-full transition"
                    style={{ width: 16, height: 16, border: `2px solid ${C.red}`, background: "white" }}>
                    {selected && (
                    <span className="rounded-full"
                         style={{ width: 8, height: 8, background: C.red, display: "block" }} />
                    )}
               </span>
               <input type="radio" name={`q-${q.id}`} value={idx}
                    checked={selected} onChange={() => handleSelect(q.id, idx)}
                    className="sr-only" disabled={submitted} />
               <span className="text-sm" style={{ color: C.dark }}>{opt}</span>
               </label>
               );
          })}
          </div>
     </div>
     ))}
     </div>

     {/* submit */}
     {!submitted && (
     <div className="flex justify-end pt-2">
     <button onClick={handleSubmit} disabled={!allAnswered}
          className="rounded-xl px-8 py-2.5 text-sm font-semibold transition"
          style={{
          background: allAnswered ? C.red : "#e2e8f0",
          color: allAnswered ? "#fff" : C.grey,
          cursor: allAnswered ? "pointer" : "not-allowed",
          }}>
          Submit
     </button>
     </div>
     )}
</div>
);
}