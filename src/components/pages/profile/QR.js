// import React, { useState } from "react";
// import { FiStar } from "react-icons/fi";
// import { C } from "./data/profileData";

// const PAGES = [
// {
// section: "Mentorship Experience:",
// questions: [
//     { id: 1, type: "rating",   text: "On a scale from 1 (Poor) to 5 (Excellent), rate your overall mentorship experience." },
//     { id: 2, type: "textarea", text: "What aspects of the mentorship program have been most valuable to you this quarter?",       placeholder: "e.g the regular mentoring sessions" },
//     { id: 3, type: "textarea", text: "Are there any specific challenges you've encountered in your mentorship journey recently? Please share.", placeholder: "Give brief challenges you have encountered" },
// ],
// },
// {
// section: "Mentor Feedback:",
// questions: [
//     { id: 4, type: "rating",   text: "Rate your satisfaction with your mentor's support and guidance during this quarter." },
//     { id: 5, type: "textarea", text: "Describe any standout moments or valuable advice you received from your mentor in the past quarter.", placeholder: "Give any standout advice you have received" },
// ],
// section2: "Goals and Progress:",
// questions2: [
//     { id: 6, type: "textarea", text: "Have you achieved any of the goals you set in the last quarter? If yes, please share your achievements.", placeholder: "Give your response" },
//     { id: 7, type: "textarea", text: "Are there any goals or objectives you'd like to set for the upcoming quarter? If so, please describe them.", placeholder: "Give your response" },
// ],
// },
// {
// section: "Program Improvement:",
// questions: [
//     { id: 8, type: "textarea", text: "What aspects of the program do you believe could be enhanced or improved to better support your growth and development?", placeholder: "Give your response" },
// ],
// section2: "Open Feedback:",
// questions2: [
//     { id: 9, type: "textarea", text: "Share any additional comments, suggestions, or experiences related to your mentorship journey this quarter.", placeholder: "Give your additional comments, suggestions, or experiences" },
// ],
// },
// ];

// function StarRating({ value, onChange }) {
// const [hovered, setHovered] = useState(0);
// return (
// <div className="flex items-center gap-2 pt-1">
//     {[1,2,3,4,5].map((star) => (
//     <button key={star} type="button"
//         onMouseEnter={() => setHovered(star)} onMouseLeave={() => setHovered(0)}
//         onClick={() => onChange(star)}>
//         <FiStar size={24} style={{
//         fill: star <= (hovered || value) ? "#FFCC28" : "none",
//         stroke: star <= (hovered || value) ? "#FFCC28" : "#CBD5E1",
//         transition: "all 0.15s",
//         }} />
//     </button>
//     ))}
// </div>
// );
// }

// function Question({ q, answers, setAnswers }) {
// return (
// <div className="space-y-2">
//     <p className="text-xs font-semibold" style={{ color: C.dark }}>Question {q.id}</p>
//     <p className="text-xs" style={{ color: C.grey }}>{q.text}</p>
//     {q.type === "rating" ? (
//     <StarRating value={answers[q.id] || 0}
//         onChange={(v) => setAnswers((p) => ({ ...p, [q.id]: v }))} />
//     ) : (
//     <input value={answers[q.id] || ""} placeholder={q.placeholder}
//         onChange={(e) => setAnswers((p) => ({ ...p, [q.id]: e.target.value }))}
//         className="w-full rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#312F61]/20" />
//     )}
// </div>
// );
// }

// const HAS_MENTOR = true;

// export default function QR() {
// const [page,    setPage]    = useState(0);
// const [answers, setAnswers] = useState({});

// /* empty state */
// if (!HAS_MENTOR) {
// return (
//     <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
//     <div className="flex h-12 w-12 items-center justify-center rounded-full"
//         style={{ background: C.red }}>
//         <span className="text-white font-bold text-lg">!</span>
//     </div>
//     <p className="font-bold text-sm" style={{ color: C.dark }}>Dear Grace!</p>
//     <p className="text-xs max-w-xs leading-relaxed" style={{ color: C.grey }}>
//         Feedback is collected quarterly. We'll notify you when it's time to provide your valuable input. Thank you for your patience!
//     </p>
//     </div>
// );
// }

// /* submitted state */
// if (page === PAGES.length) {
// return (
//     <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
//     <img src="/sumbitreview.png" alt="Completed"
//         onError={(e) => { e.target.onerror = null; e.target.style.display = "none"; }}
//         className="w-40 h-auto object-contain" />
//     <p className="text-sm max-w-sm leading-relaxed" style={{ color: C.grey }}>
//         Thank you for providing your valuable insights. Your feedback is essential in shaping our mentoring program to meet your evolving needs. Your commitment to growth and development is truly appreciated!
//     </p>
//     <p className="text-sm font-semibold" style={{ color: C.dark }}>See you next quarter!!</p>
//     </div>
// );
// }

// const cur = PAGES[page];

// return (
// <div className="max-w-2xl space-y-5">
//     {/* header */}
//     <div>
//     <p className="font-bold text-base" style={{ color: C.dark }}>
//         Program Feedback Form - Quarter One
//     </p>
//     <p className="text-xs italic mt-0.5" style={{ color: C.grey }}>
//         We value your input! Your feedback helps us continuously improve our mentoring program and ensure it meets your needs. Please take a few minutes to share your thoughts and experiences.
//     </p>
//     </div>

//     {/* section 1 */}
//     <div className="space-y-4">
//     <p className="text-sm font-bold flex items-center gap-2" style={{ color: C.dark }}>
//         <span className="h-3 w-3 rounded-full inline-block shrink-0" style={{ background: C.red }} />
//         {cur.section}
//     </p>
//     {cur.questions.map((q) => (
//         <Question key={q.id} q={q} answers={answers} setAnswers={setAnswers} />
//     ))}
//     </div>

//     {/* section 2 */}
//     {cur.section2 && (
//     <div className="space-y-4 pt-2">
//         <p className="text-sm font-bold flex items-center gap-2" style={{ color: C.dark }}>
//         <span className="h-3 w-3 rounded-full inline-block shrink-0" style={{ background: C.red }} />
//         {cur.section2}
//         </p>
//         {cur.questions2.map((q) => (
//         <Question key={q.id} q={q} answers={answers} setAnswers={setAnswers} />
//         ))}
//     </div>
//     )}

//     {/* navigation */}
//     <div className="flex items-center justify-between pt-4">
//     <button onClick={() => setPage((p) => Math.max(0, p - 1))}
//         disabled={page === 0}
//         className="rounded-xl px-8 py-2.5 text-sm font-semibold transition"
//         style={{
//         background: page === 0 ? "#e2e8f0" : C.navy,
//         color: page === 0 ? C.grey : "#fff",
//         cursor: page === 0 ? "not-allowed" : "pointer",
//         }}>
//         Previous
//     </button>

//     {page < PAGES.length - 1 ? (
//         <button onClick={() => setPage((p) => p + 1)}
//         className="rounded-xl px-8 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
//         style={{ background: C.red }}>
//         Next
//         </button>
//     ) : (
//         <button onClick={() => setPage(PAGES.length)}
//         className="rounded-xl px-8 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
//         style={{ background: C.red }}>
//         Submit
//         </button>
//     )}
//     </div>
// </div>
// );
// }


import React, { useState } from "react";
import { FiStar } from "react-icons/fi";
import { C } from "./data/profileData";

// ── CHANGED: reads real user first name from localStorage ──
function useFirstName() {
  try {
    const raw = localStorage.getItem("vmpUser");
    const parsed = raw ? JSON.parse(raw) : null;
    if (parsed?.name) return parsed.name.trim().split(" ")[0];
  } catch {
    // fall through
  }
  return "there";
}

const PAGES = [
  {
    section: "Mentorship Experience:",
    questions: [
      { id: 1, type: "rating",   text: "On a scale from 1 (Poor) to 5 (Excellent), rate your overall mentorship experience." },
      { id: 2, type: "textarea", text: "What aspects of the mentorship program have been most valuable to you this quarter?",       placeholder: "e.g the regular mentoring sessions" },
      { id: 3, type: "textarea", text: "Are there any specific challenges you've encountered in your mentorship journey recently? Please share.", placeholder: "Give brief challenges you have encountered" },
    ],
  },
  {
    section: "Mentor Feedback:",
    questions: [
      { id: 4, type: "rating",   text: "Rate your satisfaction with your mentor's support and guidance during this quarter." },
      { id: 5, type: "textarea", text: "Describe any standout moments or valuable advice you received from your mentor in the past quarter.", placeholder: "Give any standout advice you have received" },
    ],
    section2: "Goals and Progress:",
    questions2: [
      { id: 6, type: "textarea", text: "Have you achieved any of the goals you set in the last quarter? If yes, please share your achievements.", placeholder: "Give your response" },
      { id: 7, type: "textarea", text: "Are there any goals or objectives you'd like to set for the upcoming quarter? If so, please describe them.", placeholder: "Give your response" },
    ],
  },
  {
    section: "Program Improvement:",
    questions: [
      { id: 8, type: "textarea", text: "What aspects of the program do you believe could be enhanced or improved to better support your growth and development?", placeholder: "Give your response" },
    ],
    section2: "Open Feedback:",
    questions2: [
      { id: 9, type: "textarea", text: "Share any additional comments, suggestions, or experiences related to your mentorship journey this quarter.", placeholder: "Give your additional comments, suggestions, or experiences" },
    ],
  },
];

function StarRating({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex items-center gap-2 pt-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button key={star} type="button"
          onMouseEnter={() => setHovered(star)} onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(star)}>
          <FiStar size={24} style={{
            fill: star <= (hovered || value) ? "#FFCC28" : "none",
            stroke: star <= (hovered || value) ? "#FFCC28" : "#CBD5E1",
            transition: "all 0.15s",
          }} />
        </button>
      ))}
    </div>
  );
}

function Question({ q, answers, setAnswers }) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold" style={{ color: C.dark }}>Question {q.id}</p>
      <p className="text-xs" style={{ color: C.grey }}>{q.text}</p>
      {q.type === "rating" ? (
        <StarRating value={answers[q.id] || 0}
          onChange={(v) => setAnswers((p) => ({ ...p, [q.id]: v }))} />
      ) : (
        <input value={answers[q.id] || ""} placeholder={q.placeholder}
          onChange={(e) => setAnswers((p) => ({ ...p, [q.id]: e.target.value }))}
          className="w-full rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#312F61]/20" />
      )}
    </div>
  );
}

const HAS_MENTOR = true;

export default function QR() {
  const [page,    setPage]    = useState(0);
  const [answers, setAnswers] = useState({});
  const firstName = useFirstName();

  if (!HAS_MENTOR) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full"
          style={{ background: C.red }}>
          <span className="text-white font-bold text-lg">!</span>
        </div>
        {/* ── CHANGED: uses real first name instead of hardcoded "Grace" ── */}
        <p className="font-bold text-sm" style={{ color: C.dark }}>Dear {firstName}!</p>
        <p className="text-xs max-w-xs leading-relaxed" style={{ color: C.grey }}>
          Feedback is collected quarterly. We'll notify you when it's time to provide your valuable input. Thank you for your patience!
        </p>
      </div>
    );
  }

  if (page === PAGES.length) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <img src="/sumbitreview.png" alt="Completed"
          onError={(e) => { e.target.onerror = null; e.target.style.display = "none"; }}
          className="w-40 h-auto object-contain" />
        <p className="text-sm max-w-sm leading-relaxed" style={{ color: C.grey }}>
          Thank you for providing your valuable insights. Your feedback is essential in shaping our mentoring program to meet your evolving needs. Your commitment to growth and development is truly appreciated!
        </p>
        <p className="text-sm font-semibold" style={{ color: C.dark }}>See you next quarter!!</p>
      </div>
    );
  }

  const cur = PAGES[page];

  return (
    <div className="max-w-2xl space-y-5">
      <div>
        <p className="font-bold text-base" style={{ color: C.dark }}>
          Program Feedback Form - Quarter One
        </p>
        <p className="text-xs italic mt-0.5" style={{ color: C.grey }}>
          We value your input! Your feedback helps us continuously improve our mentoring program and ensure it meets your needs. Please take a few minutes to share your thoughts and experiences.
        </p>
      </div>

      <div className="space-y-4">
        <p className="text-sm font-bold flex items-center gap-2" style={{ color: C.dark }}>
          <span className="h-3 w-3 rounded-full inline-block shrink-0" style={{ background: C.red }} />
          {cur.section}
        </p>
        {cur.questions.map((q) => (
          <Question key={q.id} q={q} answers={answers} setAnswers={setAnswers} />
        ))}
      </div>

      {cur.section2 && (
        <div className="space-y-4 pt-2">
          <p className="text-sm font-bold flex items-center gap-2" style={{ color: C.dark }}>
            <span className="h-3 w-3 rounded-full inline-block shrink-0" style={{ background: C.red }} />
            {cur.section2}
          </p>
          {cur.questions2.map((q) => (
            <Question key={q.id} q={q} answers={answers} setAnswers={setAnswers} />
          ))}
        </div>
      )}

      <div className="flex items-center justify-between pt-4">
        <button onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
          className="rounded-xl px-8 py-2.5 text-sm font-semibold transition"
          style={{
            background: page === 0 ? "#e2e8f0" : C.navy,
            color: page === 0 ? C.grey : "#fff",
            cursor: page === 0 ? "not-allowed" : "pointer",
          }}>
          Previous
        </button>

        {page < PAGES.length - 1 ? (
          <button onClick={() => setPage((p) => p + 1)}
            className="rounded-xl px-8 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
            style={{ background: C.red }}>
            Next
          </button>
        ) : (
          <button onClick={() => setPage(PAGES.length)}
            className="rounded-xl px-8 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
            style={{ background: C.red }}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
}