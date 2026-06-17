import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { FiCalendar, FiX, FiStar } from "react-icons/fi";
import StarDisplay from "./components/StarDisplay";

const C = { red: "#CF173C", dark: "#1B1A23", grey: "#616E7C", navy: "#312F61" };

const baseMentors = [
  {
    id: 1,
    name: "Daniel Francis",
    role: "Head of marketing",
    email: "danielfrancis20@gmail.com",
    linkedin: "My profile",
    photo: "/daniel.png",
  },
  {
    id: 2,
    name: "Daniel Francis",
    role: "Head of marketing",
    email: "danielfrancis20-2@gmail.com", // ← give each mentor a distinct identity field if possible
    linkedin: "My profile",
    photo: "/daniel.png",
  },
];

function loadReviews(mentorId) {
  try {
    const all = JSON.parse(localStorage.getItem("vmpReviews") || "{}");
    return all[mentorId] || [];
  } catch { return []; }
}

function saveReviews(mentorId, reviews) {
  try {
    const all = JSON.parse(localStorage.getItem("vmpReviews") || "{}");
    localStorage.setItem("vmpReviews", JSON.stringify({ ...all, [mentorId]: reviews }));
  } catch {}
}

// ── now matches by mentorId instead of mentor name ──
function getNextMeetingForMentor(mentorId) {
  try {
    const meetings = JSON.parse(localStorage.getItem("vmpMeetings") || "[]");

    const upcoming = meetings
      .filter((m) => m.mentorId === mentorId && m.status === "Upcoming" && m.date)
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    if (upcoming.length === 0) return null;

    const next = upcoming[0];
    return {
      date: new Date(next.date).toLocaleDateString("en-US", {
        month: "long", day: "numeric", year: "numeric",
      }),
      time: next.time || "",
    };
  } catch {
    return null;
  }
}

export default function MyMentors() {
  const navigate = useNavigate();
  const [view, setView] = useState("empty");
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [reviews, setReviews] = useState({});
  const [showAllReviews, setShowAllReviews] = useState(false);

  const [mentorsList, setMentorsList] = useState(baseMentors);

  const [sessionData, setSessionData] = useState({
    title: "", description: "", type: "Virtual", venue: "", date: "", time: "",
  });
  const [titleError, setTitleError] = useState("");

  const [feedbackName, setFeedbackName]           = useState("");
  const [feedbackNameError, setFeedbackNameError] = useState("");
  const [feedbackText, setFeedbackText]           = useState("");
  const [feedbackRating, setFeedbackRating]       = useState(5);

  const todayString = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const loaded = {};
    baseMentors.forEach((m) => { loaded[m.id] = loadReviews(m.id); });
    setReviews(loaded);
  }, []);

  // ── refreshes nextMeeting per mentor using mentorId ──
  const refreshMentorMeetings = () => {
    setMentorsList(
      baseMentors.map((m) => ({
        ...m,
        nextMeeting: getNextMeetingForMentor(m.id),
      }))
    );
  };

  useEffect(() => {
    refreshMentorMeetings();
  }, []);

  useEffect(() => {
    if (view === "list") {
      refreshMentorMeetings();
    }
  }, [view]);

  const getMentorReviews = (mentorId) => reviews[mentorId] || [];

  const handleSelectMentor  = (mentor) => { setSelectedMentor(mentor); setView("details"); };
  const handleBookSession   = (mentor) => {
    setSelectedMentor(mentor);
    setSessionData({ title: "", description: "", type: "Virtual", venue: "", date: "", time: "" });
    setTitleError("");
    setView("schedule");
  };

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setSessionData({ ...sessionData, title: value });
    if (value.trim() && !/[a-zA-Z]/.test(value)) {
      setTitleError("Title must contain letters.");
    } else { setTitleError(""); }
  };

  // ── now saves mentorId alongside mentor name so meetings tie to a specific mentor ──
  const handleSubmitSession = () => {
    if (!sessionData.title.trim() || !/[a-zA-Z]/.test(sessionData.title)) {
      setTitleError("Please enter a valid session title with letters.");
      return;
    }
    try {
      const existing = JSON.parse(localStorage.getItem("vmpMeetings") || "[]");
      localStorage.setItem("vmpMeetings", JSON.stringify([...existing, {
        id: Date.now(),
        title: sessionData.title,
        description: sessionData.description,
        mentor: selectedMentor.name,
        mentorId: selectedMentor.id,   // ← critical fix: tie meeting to the specific mentor
        meetingType: sessionData.type,
        venue: sessionData.venue,
        date: sessionData.date,
        time: sessionData.time,
        status: "Upcoming",
      }]));
    } catch {}
    setView("confirmation");
  };

  const handleFeedbackNameChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setFeedbackName(value);
      setFeedbackNameError("");
    } else { setFeedbackNameError("Name must contain letters only."); }
  };

  const handleOpenFeedback = () => {
    setFeedbackName(""); setFeedbackText(""); setFeedbackRating(5); setFeedbackNameError("");
    setView("feedback");
  };

  const handleSubmitFeedback = () => {
    if (!feedbackName.trim()) { setFeedbackNameError("Please enter your name."); return; }
    if (!feedbackText.trim()) { alert("Please enter your feedback."); return; }
    const newReview = {
      id: Date.now(),
      name: feedbackName.trim(),
      comment: feedbackText.trim(),
      rating: Number(feedbackRating),
      date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
    };
    const mentorId = selectedMentor.id;
    const updated  = [...getMentorReviews(mentorId), newReview];
    saveReviews(mentorId, updated);
    setReviews((prev) => ({ ...prev, [mentorId]: updated }));
    setView("feedbackConfirmation");
  };

  const handleChangeMentor  = () => setView("change");
  const handleSubmitChange  = () => setView("changeConfirmation");

  // ── EMPTY ──
  if (view === "empty") {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-semibold mb-4">My Mentors</h1>
        <div className="flex flex-col items-center justify-center py-20">
          <img src="/mentee.png" alt="empty state" className="w-60 h-auto mb-4 object-contain" />
          <p>You have no mentor yet</p>
          <button onClick={() => setView("list")} className="mt-4 px-6 py-2 bg-red-600 text-white rounded">
            Choose a mentor
          </button>
        </div>
      </div>
    );
  }

  // ── LIST ──
  if (view === "list") {
    return (
      <div className="p-8 space-y-1">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold" style={{ color: C.dark }}>My Mentors</h1>
          <p className="text-sm mt-1" style={{ color: C.grey }}>Your Mentorship Hub</p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
          {mentorsList.map((mentor, idx) => (
            <div key={mentor.id} className={`grid grid-cols-1 lg:grid-cols-[1fr_220px_auto] items-center gap-4 px-6 py-5 ${idx !== mentorsList.length - 1 ? "border-b border-slate-100" : ""}`}>
              <div className="flex items-center gap-4">
                <img src={mentor.photo} alt={mentor.name} className="h-16 w-16 rounded-full object-cover border-2 border-white shadow"
                  onError={(e) => { e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(mentor.name)}&background=312F61&color=fff&size=80`; }} />
                <div className="space-y-0.5">
                  <h2 className="font-bold text-sm" style={{ color: C.dark }}>{mentor.name}</h2>
                  <p className="text-xs" style={{ color: C.grey }}>{mentor.role}</p>
                  <p className="text-xs" style={{ color: C.grey }}><span className="font-semibold" style={{ color: C.dark }}>Email:</span> {mentor.email}</p>
                  <p className="text-xs" style={{ color: C.grey }}><span className="font-semibold" style={{ color: C.dark }}>LinkedIn:</span>{" "}<span className="underline cursor-pointer" style={{ color: C.navy }}>{mentor.linkedin}</span></p>
                </div>
              </div>

              <div className="flex flex-col items-center text-center gap-1 px-4 lg:border-l lg:border-r border-slate-100">
                <div className="flex h-9 w-9 items-center justify-center rounded-full mb-1" style={{ background: C.red }}>
                  <FiCalendar size={16} className="text-white" />
                </div>
                {mentor.nextMeeting ? (
                  <>
                    <p className="text-xs font-semibold" style={{ color: C.dark }}>Next Meeting</p>
                    <p className="text-xs" style={{ color: C.grey }}>Date: {mentor.nextMeeting.date}</p>
                    <p className="text-xs" style={{ color: C.grey }}>Time: {mentor.nextMeeting.time}</p>
                  </>
                ) : (
                  <p className="text-xs font-semibold" style={{ color: C.dark }}>No Meeting Scheduled</p>
                )}
                <button onClick={() => navigate("/meetings")} className="text-xs font-semibold mt-1 hover:underline" style={{ color: C.red }}>View all</button>
              </div>

              <div className="flex flex-col items-center gap-2 lg:items-end">
                <div className="flex items-center gap-2">
                  <button onClick={() => handleSelectMentor(mentor)} className="rounded-lg border px-4 py-2 text-xs font-semibold transition hover:bg-rose-50" style={{ borderColor: C.red, color: C.red }}>
                    View details
                  </button>
                  <button onClick={() => handleBookSession(mentor)} className="rounded-lg px-4 py-2 text-xs font-semibold text-white transition hover:opacity-90" style={{ background: C.red }}>
                    Book a Session
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── DETAILS ──
  if (view === "details") {
    const mentorReviews  = getMentorReviews(selectedMentor.id);
    const previewReviews = mentorReviews.slice(-2).reverse();

    return (
      <div className="p-8 flex gap-8">
        <div className="flex-1 space-y-4">
          <button onClick={() => setView("list")} className="text-xs font-semibold hover:underline mb-2" style={{ color: C.grey }}>← Back to list</button>
          <h1 className="text-2xl font-semibold" style={{ color: C.dark }}>{selectedMentor.name}</h1>
          <p style={{ color: C.grey }}>{selectedMentor.role}</p>
          <p style={{ color: C.grey }}>Email: {selectedMentor.email}</p>
          <p style={{ color: C.grey }}>LinkedIn: {selectedMentor.linkedin}</p>

          <h2 className="font-semibold mt-4" style={{ color: C.dark }}>Bio/Summary</h2>
          <p style={{ color: C.grey }}>Daniel is an exemplary mentor known for his clarity and dedication.</p>
          <h2 className="font-semibold mt-4" style={{ color: C.dark }}>Experience</h2>
          <p style={{ color: C.grey }}>Over 15 years in marketing leadership roles.</p>
          <h2 className="font-semibold mt-4" style={{ color: C.dark }}>Areas of Expertise</h2>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-medium">Brand Strategy</span>
            <span className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-medium">Market Research</span>
          </div>
          <h2 className="font-semibold mt-4" style={{ color: C.dark }}>Mentorship Approach</h2>
          <p style={{ color: C.grey }}>Collaborative style focused on goal-setting and accountability.</p>

          <div className="flex flex-wrap gap-3 mt-6">
            <button onClick={handleOpenFeedback} className="px-4 py-2 border rounded-lg text-xs font-semibold transition hover:bg-slate-50" style={{ borderColor: "#E2E8F0", color: C.dark }}>Give Feedback</button>
            <button onClick={() => handleBookSession(selectedMentor)} className="px-4 py-2 rounded-lg text-xs font-semibold text-white transition hover:opacity-90" style={{ background: C.red }}>Schedule a Meeting</button>
            <button onClick={handleChangeMentor} className="px-4 py-2 border rounded-lg text-xs font-semibold transition hover:bg-red-50" style={{ borderColor: C.red, color: C.red }}>Change Mentor</button>
          </div>
        </div>

        <div className="w-80 shrink-0 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-sm" style={{ color: C.dark }}>Reviews ({mentorReviews.length})</h2>
            {mentorReviews.length > 0 && (
              <button onClick={() => setShowAllReviews(true)} className="text-xs font-semibold hover:underline" style={{ color: C.red }}>View all</button>
            )}
          </div>

          {mentorReviews.length === 0 ? (
            <div className="flex flex-col items-center justify-center border border-slate-100 rounded-2xl p-8 bg-slate-50">
              <p className="text-sm font-medium" style={{ color: C.dark }}>No reviews yet</p>
              <p className="text-xs mt-1 text-center" style={{ color: C.grey }}>Be the first to leave feedback!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {previewReviews.map((r) => (
                <div key={r.id} className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold" style={{ color: C.dark }}>{r.name}</p>
                    <p className="text-[10px]" style={{ color: C.grey }}>{r.date}</p>
                  </div>
                  <StarDisplay rating={r.rating} />
                  <p className="text-xs leading-relaxed" style={{ color: C.grey }}>{r.comment}</p>
                </div>
              ))}
              {mentorReviews.length > 2 && (
                <button onClick={() => setShowAllReviews(true)} className="w-full text-xs font-semibold py-2 rounded-lg border transition hover:bg-red-50" style={{ borderColor: C.red, color: C.red }}>
                  View all {mentorReviews.length} reviews
                </button>
              )}
            </div>
          )}
        </div>

        {showAllReviews && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
            <div className="bg-white rounded-2xl w-full max-w-lg max-h-[80vh] flex flex-col shadow-xl">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                <h2 className="font-semibold text-base" style={{ color: C.dark }}>All Reviews for {selectedMentor.name} ({mentorReviews.length})</h2>
                <button onClick={() => setShowAllReviews(false)} className="p-1 rounded-lg hover:bg-slate-100 transition"><FiX size={18} color={C.grey} /></button>
              </div>
              <div className="overflow-y-auto px-6 py-4 space-y-4 flex-1">
                {[...mentorReviews].reverse().map((r) => (
                  <div key={r.id} className="rounded-xl border border-slate-100 bg-slate-50 p-4 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold" style={{ color: C.dark }}>{r.name}</p>
                      <p className="text-xs" style={{ color: C.grey }}>{r.date}</p>
                    </div>
                    <StarDisplay rating={r.rating} />
                    <p className="text-sm leading-relaxed" style={{ color: C.grey }}>{r.comment}</p>
                  </div>
                ))}
              </div>
              <div className="px-6 py-4 border-t border-slate-100">
                <button onClick={() => setShowAllReviews(false)} className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition hover:opacity-90" style={{ background: C.red }}>Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── SCHEDULE ──
  if (view === "schedule") {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
        <div className="bg-white p-8 rounded-2xl w-full max-w-lg space-y-4 shadow-xl max-h-[90vh] overflow-y-auto">
          <h1 className="text-xl font-semibold" style={{ color: C.dark }}>Schedule a Session</h1>
          <div className="flex gap-4">
            <img src={selectedMentor.photo} alt={selectedMentor.name} className="w-16 h-16 rounded-full object-cover shrink-0"
              onError={(e) => { e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedMentor.name)}&background=312F61&color=fff&size=80`; }} />
            <div className="flex-1 space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold" style={{ color: C.dark }}>Title *</label>
                <input type="text" value={sessionData.title} onChange={handleTitleChange} placeholder="Enter session title" className="border border-slate-200 p-2.5 rounded-lg w-full text-xs focus:outline-none focus:ring-1 focus:ring-red-300" />
                {titleError && <p className="text-[11px] text-red-500">{titleError}</p>}
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold" style={{ color: C.dark }}>Description *</label>
                <textarea value={sessionData.description} onChange={(e) => setSessionData({ ...sessionData, description: e.target.value })} placeholder="Enter session description" className="border border-slate-200 p-2.5 rounded-lg w-full text-xs focus:outline-none focus:ring-1 focus:ring-red-300 resize-none" rows={3} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold" style={{ color: C.dark }}>Meeting Type *</label>
                <select value={sessionData.type} onChange={(e) => setSessionData({ ...sessionData, type: e.target.value })} className="border border-slate-200 p-2.5 rounded-lg w-full text-xs focus:outline-none">
                  <option>Virtual</option>
                  <option>Physical</option>
                </select>
              </div>
              {sessionData.type === "Physical" && (
                <div className="space-y-1">
                  <label className="text-xs font-semibold" style={{ color: C.dark }}>Venue *</label>
                  <input type="text" value={sessionData.venue} onChange={(e) => setSessionData({ ...sessionData, venue: e.target.value })} className="border border-slate-200 p-2.5 rounded-lg w-full text-xs focus:outline-none" />
                </div>
              )}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold" style={{ color: C.dark }}>Date *</label>
                  <input type="date" value={sessionData.date} min={todayString} onChange={(e) => setSessionData({ ...sessionData, date: e.target.value })} className="border border-slate-200 p-2.5 rounded-lg w-full text-xs focus:outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold" style={{ color: C.dark }}>Time *</label>
                  <input type="time" value={sessionData.time} onChange={(e) => setSessionData({ ...sessionData, time: e.target.value })} className="border border-slate-200 p-2.5 rounded-lg w-full text-xs focus:outline-none" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={handleSubmitSession} className="px-5 py-2.5 rounded-lg text-xs font-semibold text-white transition hover:opacity-90" style={{ background: C.red }}>Submit</button>
            <button onClick={() => setView("details")} className="px-5 py-2.5 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 transition">Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  // ── CONFIRMATION ──
  if (view === "confirmation") {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
        <div className="bg-white p-8 rounded-2xl w-80 space-y-4 text-center shadow-xl">
          <div className="flex h-14 w-14 items-center justify-center rounded-full mx-auto" style={{ background: "#FEE2E2" }}>
            <FiCalendar size={24} color={C.red} />
          </div>
          <p className="font-semibold" style={{ color: C.dark }}>Session Scheduled!</p>
          <p className="text-xs" style={{ color: C.grey }}>Your session with {selectedMentor.name} has been booked. View it on the Meetings page.</p>
          <button onClick={() => setView("list")} className="w-full py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: C.red }}>Close</button>
        </div>
      </div>
    );
  }

  // ── CHANGE ──
  if (view === "change") {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
        <div className="bg-white p-8 rounded-2xl w-96 space-y-4 shadow-xl">
          <h1 className="text-xl font-semibold" style={{ color: C.dark }}>Change Mentor</h1>
          <p className="text-sm" style={{ color: C.grey }}>Mentor: {selectedMentor.name}</p>
          <textarea placeholder="Reason for change *" className="border border-slate-200 p-3 rounded-lg w-full text-xs resize-none focus:outline-none focus:ring-1 focus:ring-red-300" rows={4} />
          <div className="flex gap-3">
            <button onClick={handleSubmitChange} className="px-5 py-2.5 rounded-lg text-xs font-semibold text-white" style={{ background: C.red }}>Submit</button>
            <button onClick={() => setView("details")} className="px-5 py-2.5 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  // ── CHANGE CONFIRMATION ──
  if (view === "changeConfirmation") {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
        <div className="bg-white p-8 rounded-2xl w-80 space-y-4 text-center shadow-xl">
          <p className="font-semibold" style={{ color: C.dark }}>Request Received!</p>
          <p className="text-xs" style={{ color: C.grey }}>You will be notified once the mentor change is confirmed.</p>
          <button onClick={() => setView("details")} className="w-full py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: C.red }}>Close</button>
        </div>
      </div>
    );
  }

  // ── FEEDBACK ──
  if (view === "feedback") {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
        <div className="bg-white p-8 rounded-2xl w-full max-w-md space-y-4 shadow-xl">
          <h1 className="text-xl font-semibold" style={{ color: C.dark }}>Feedback about {selectedMentor.name}</h1>
          <div className="space-y-1">
            <label className="text-xs font-semibold" style={{ color: C.dark }}>Full Name *</label>
            <input value={feedbackName} onChange={handleFeedbackNameChange} placeholder="Enter your full name" className="border border-slate-200 p-2.5 rounded-lg w-full text-xs focus:outline-none focus:ring-1 focus:ring-red-300" />
            {feedbackNameError && <p className="text-[11px] text-red-500">{feedbackNameError}</p>}
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold" style={{ color: C.dark }}>Feedback *</label>
            <textarea value={feedbackText} onChange={(e) => setFeedbackText(e.target.value)} placeholder="Share your experience with this mentor..." className="border border-slate-200 p-2.5 rounded-lg w-full text-xs resize-none focus:outline-none focus:ring-1 focus:ring-red-300" rows={4} />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold" style={{ color: C.dark }}>Rating *</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} type="button" onClick={() => setFeedbackRating(n)} className="transition hover:scale-110">
                  <FiStar size={24} fill={n <= feedbackRating ? C.red : "none"} color={n <= feedbackRating ? C.red : "#CBD5E1"} />
                </button>
              ))}
              <span className="text-xs ml-1" style={{ color: C.grey }}>{feedbackRating}/5</span>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={handleSubmitFeedback} className="px-5 py-2.5 rounded-lg text-xs font-semibold text-white transition hover:opacity-90" style={{ background: C.red }}>Submit</button>
            <button onClick={() => setView("details")} className="px-5 py-2.5 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 transition">Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  // ── FEEDBACK CONFIRMATION ──
  if (view === "feedbackConfirmation") {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
        <div className="bg-white p-8 rounded-2xl w-80 space-y-4 text-center shadow-xl">
          <div className="flex h-14 w-14 items-center justify-center rounded-full mx-auto" style={{ background: "#FEE2E2" }}>
            <FiStar size={24} color={C.red} fill={C.red} />
          </div>
          <p className="font-semibold" style={{ color: C.dark }}>Thank you for your feedback!</p>
          <p className="text-xs" style={{ color: C.grey }}>Your review has been saved and is now visible on {selectedMentor.name}'s profile.</p>
          <button onClick={() => setView("details")} className="w-full py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: C.red }}>View Reviews</button>
        </div>
      </div>
    );
  }

  return null;
}





// // src/components/pages/mentorspages/MyMentors.js
// import { useNavigate } from "react-router-dom";
// import React, { useState, useEffect } from "react";
// import { FiCalendar, FiX, FiStar } from "react-icons/fi";

// const C = { red: "#CF173C", dark: "#1B1A23", grey: "#616E7C", navy: "#312F61" };

// const dummyMentors = [
//   {
//     id: 1,
//     name: "Daniel Francis",
//     role: "Head of marketing",
//     email: "danielfrancis20@gmail.com",
//     linkedin: "My profile",
//     photo: "/daniel.png",
//     nextMeeting: null,
//   },
//   {
//     id: 2,
//     name: "Daniel Francis",
//     role: "Head of marketing",
//     email: "danielfrancis20@gmail.com",
//     linkedin: "My profile",
//     photo: "/daniel.png",
//     nextMeeting: { date: "October 11, 2023", time: "3:30PM" },
//   },
// ];

// // ── helpers ──
// function loadReviews(mentorId) {
//   try {
//     const all = JSON.parse(localStorage.getItem("vmpReviews") || "{}");
//     return all[mentorId] || [];
//   } catch { return []; }
// }

// function saveReviews(mentorId, reviews) {
//   try {
//     const all = JSON.parse(localStorage.getItem("vmpReviews") || "{}");
//     localStorage.setItem("vmpReviews", JSON.stringify({ ...all, [mentorId]: reviews }));
//   } catch {}
// }

// function StarDisplay({ rating }) {
//   return (
//     <div className="flex items-center gap-0.5">
//       {[1, 2, 3, 4, 5].map((n) => (
//         <FiStar
//           key={n}
//           size={12}
//           fill={n <= rating ? C.red : "none"}
//           color={n <= rating ? C.red : "#CBD5E1"}
//         />
//       ))}
//     </div>
//   );
// }

// export default function MyMentors() {
//   const navigate = useNavigate();
//   const [view, setView] = useState("empty");
//   const [selectedMentor, setSelectedMentor] = useState(null);
//   const [reviews, setReviews] = useState({});
//   const [showAllReviews, setShowAllReviews] = useState(false);

//   const [sessionData, setSessionData] = useState({
//     title: "", description: "", type: "Virtual", venue: "", date: "", time: "",
//   });
//   const [titleError, setTitleError] = useState("");

//   const [feedbackName, setFeedbackName]           = useState("");
//   const [feedbackNameError, setFeedbackNameError] = useState("");
//   const [feedbackText, setFeedbackText]           = useState("");
//   const [feedbackRating, setFeedbackRating]       = useState(5);

//   const todayString = new Date().toISOString().split("T")[0];

//   // ── load all reviews from localStorage on mount ──
//   useEffect(() => {
//     const loaded = {};
//     dummyMentors.forEach((m) => { loaded[m.id] = loadReviews(m.id); });
//     setReviews(loaded);
//   }, []);

//   const getMentorReviews = (mentorId) => reviews[mentorId] || [];

//   const handleSelectMentor = (mentor) => { setSelectedMentor(mentor); setView("details"); };

//   const handleBookSession = (mentor) => {
//     setSelectedMentor(mentor);
//     setSessionData({ title: "", description: "", type: "Virtual", venue: "", date: "", time: "" });
//     setTitleError("");
//     setView("schedule");
//   };

//   const handleTitleChange = (e) => {
//     const value = e.target.value;
//     setSessionData({ ...sessionData, title: value });
//     if (value.trim() && !/[a-zA-Z]/.test(value)) {
//       setTitleError("Title must contain letters.");
//     } else { setTitleError(""); }
//   };

//   const handleSubmitSession = () => {
//     if (!sessionData.title.trim() || !/[a-zA-Z]/.test(sessionData.title)) {
//       setTitleError("Please enter a valid session title with letters.");
//       return;
//     }
//     try {
//       const existing = JSON.parse(localStorage.getItem("vmpMeetings") || "[]");
//       localStorage.setItem("vmpMeetings", JSON.stringify([...existing, {
//         id: Date.now(),
//         title: sessionData.title,
//         description: sessionData.description,
//         mentor: selectedMentor.name,
//         meetingType: sessionData.type,
//         venue: sessionData.venue,
//         date: sessionData.date,
//         time: sessionData.time,
//         status: "Upcoming",
//       }]));
//     } catch {}
//     setView("confirmation");
//   };

//   const handleFeedbackNameChange = (e) => {
//     const value = e.target.value;
//     if (/^[a-zA-Z\s]*$/.test(value)) {
//       setFeedbackName(value);
//       setFeedbackNameError("");
//     } else { setFeedbackNameError("Name must contain letters only."); }
//   };

//   const handleOpenFeedback = () => {
//     setFeedbackName(""); setFeedbackText(""); setFeedbackRating(5); setFeedbackNameError("");
//     setView("feedback");
//   };

//   const handleSubmitFeedback = () => {
//     if (!feedbackName.trim()) { setFeedbackNameError("Please enter your name."); return; }
//     if (!feedbackText.trim()) { alert("Please enter your feedback."); return; }

//     const newReview = {
//       id: Date.now(),
//       name: feedbackName.trim(),
//       comment: feedbackText.trim(),
//       rating: Number(feedbackRating),
//       date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
//     };

//     const mentorId = selectedMentor.id;
//     const updated  = [...getMentorReviews(mentorId), newReview];

//     // save to localStorage + state
//     saveReviews(mentorId, updated);
//     setReviews((prev) => ({ ...prev, [mentorId]: updated }));

//     setView("feedbackConfirmation");
//   };

//   const handleChangeMentor = () => setView("change");
//   const handleSubmitChange = () => setView("changeConfirmation");

//   // ════════════════════════════════════════════
//   //  VIEWS
//   // ════════════════════════════════════════════

//   if (view === "empty") {
//     return (
//       <div className="p-8">
//         <h1 className="text-2xl font-semibold mb-4">My Mentors</h1>
//         <div className="flex flex-col items-center justify-center py-20">
//           <img src="/mentee.png" alt="empty state" className="w-60 h-auto mb-4 object-contain" />
//           <p>You have no mentor yet</p>
//           <button onClick={() => setView("list")} className="mt-4 px-6 py-2 bg-red-600 text-white rounded">
//             Choose a mentor
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (view === "list") {
//     return (
//       <div className="p-8 space-y-1">
//         <div className="mb-6">
//           <h1 className="text-2xl font-semibold" style={{ color: C.dark }}>My Mentors</h1>
//           <p className="text-sm mt-1" style={{ color: C.grey }}>Your Mentorship Hub</p>
//         </div>
//         <div className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
//           {dummyMentors.map((mentor, idx) => (
//             <div
//               key={mentor.id}
//               className={`grid grid-cols-1 lg:grid-cols-[1fr_220px_auto] items-center gap-4 px-6 py-5 ${
//                 idx !== dummyMentors.length - 1 ? "border-b border-slate-100" : ""
//               }`}
//             >
//               <div className="flex items-center gap-4">
//                 <img
//                   src={mentor.photo} alt={mentor.name}
//                   className="h-16 w-16 rounded-full object-cover border-2 border-white shadow"
//                   onError={(e) => { e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(mentor.name)}&background=312F61&color=fff&size=80`; }}
//                 />
//                 <div className="space-y-0.5">
//                   <h2 className="font-bold text-sm" style={{ color: C.dark }}>{mentor.name}</h2>
//                   <p className="text-xs" style={{ color: C.grey }}>{mentor.role}</p>
//                   <p className="text-xs" style={{ color: C.grey }}>
//                     <span className="font-semibold" style={{ color: C.dark }}>Email:</span> {mentor.email}
//                   </p>
//                   <p className="text-xs" style={{ color: C.grey }}>
//                     <span className="font-semibold" style={{ color: C.dark }}>LinkedIn:</span>{" "}
//                     <span className="underline cursor-pointer" style={{ color: C.navy }}>{mentor.linkedin}</span>
//                   </p>
//                 </div>
//               </div>

//               <div className="flex flex-col items-center text-center gap-1 px-4 lg:border-l lg:border-r border-slate-100">
//                 <div className="flex h-9 w-9 items-center justify-center rounded-full mb-1" style={{ background: C.red }}>
//                   <FiCalendar size={16} className="text-white" />
//                 </div>
//                 {mentor.nextMeeting ? (
//                   <>
//                     <p className="text-xs font-semibold" style={{ color: C.dark }}>Next Meeting</p>
//                     <p className="text-xs" style={{ color: C.grey }}>Date: {mentor.nextMeeting.date}</p>
//                     <p className="text-xs" style={{ color: C.grey }}>Time: {mentor.nextMeeting.time}</p>
//                   </>
//                 ) : (
//                   <p className="text-xs font-semibold" style={{ color: C.dark }}>No Meeting Scheduled</p>
//                 )}
//                 <button onClick={() => navigate("/meetings")} className="text-xs font-semibold mt-1 hover:underline" style={{ color: C.red }}>
//                   View all
//                 </button>
//               </div>

//               <div className="flex flex-col items-center gap-2 lg:items-end">
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => handleSelectMentor(mentor)}
//                     className="rounded-lg border px-4 py-2 text-xs font-semibold transition hover:bg-rose-50"
//                     style={{ borderColor: C.red, color: C.red }}
//                   >
//                     View details
//                   </button>
//                   <button
//                     onClick={() => handleBookSession(mentor)}
//                     className="rounded-lg px-4 py-2 text-xs font-semibold text-white transition hover:opacity-90"
//                     style={{ background: C.red }}
//                   >
//                     Book a Session
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   if (view === "details") {
//     const mentorReviews = getMentorReviews(selectedMentor.id);
//     const previewReviews = mentorReviews.slice(-2).reverse(); // show latest 2

//     return (
//       <div className="p-8 flex gap-8">
//         {/* ── Left: Mentor info ── */}
//         <div className="flex-1 space-y-4">
//           <button onClick={() => setView("list")} className="text-xs font-semibold hover:underline mb-2" style={{ color: C.grey }}>
//             ← Back to list
//           </button>
//           <h1 className="text-2xl font-semibold" style={{ color: C.dark }}>{selectedMentor.name}</h1>
//           <p style={{ color: C.grey }}>{selectedMentor.role}</p>
//           <p style={{ color: C.grey }}>Email: {selectedMentor.email}</p>
//           <p style={{ color: C.grey }}>LinkedIn: {selectedMentor.linkedin}</p>

//           <h2 className="font-semibold mt-4" style={{ color: C.dark }}>Bio/Summary</h2>
//           <p style={{ color: C.grey }}>Daniel is an exemplary mentor known for his clarity and dedication.</p>

//           <h2 className="font-semibold mt-4" style={{ color: C.dark }}>Experience</h2>
//           <p style={{ color: C.grey }}>Over 15 years in marketing leadership roles.</p>

//           <h2 className="font-semibold mt-4" style={{ color: C.dark }}>Areas of Expertise</h2>
//           <div className="flex flex-wrap gap-2">
//             <span className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-medium">Brand Strategy</span>
//             <span className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-medium">Market Research</span>
//           </div>

//           <h2 className="font-semibold mt-4" style={{ color: C.dark }}>Mentorship Approach</h2>
//           <p style={{ color: C.grey }}>Collaborative style focused on goal-setting and accountability.</p>

//           <div className="flex flex-wrap gap-3 mt-6">
//             <button onClick={handleOpenFeedback} className="px-4 py-2 border rounded-lg text-xs font-semibold transition hover:bg-slate-50" style={{ borderColor: "#E2E8F0", color: C.dark }}>
//               Give Feedback
//             </button>
//             <button onClick={() => handleBookSession(selectedMentor)} className="px-4 py-2 rounded-lg text-xs font-semibold text-white transition hover:opacity-90" style={{ background: C.red }}>
//               Schedule a Meeting
//             </button>
//             <button onClick={handleChangeMentor} className="px-4 py-2 border rounded-lg text-xs font-semibold transition hover:bg-red-50" style={{ borderColor: C.red, color: C.red }}>
//               Change Mentor
//             </button>
//           </div>
//         </div>

//         {/* ── Right: Reviews panel ── */}
//         <div className="w-80 shrink-0 space-y-3">
//           <div className="flex items-center justify-between">
//             <h2 className="font-semibold text-sm" style={{ color: C.dark }}>
//               Reviews ({mentorReviews.length})
//             </h2>
//             {mentorReviews.length > 0 && (
//               <button
//                 onClick={() => setShowAllReviews(true)}
//                 className="text-xs font-semibold hover:underline"
//                 style={{ color: C.red }}
//               >
//                 View all
//               </button>
//             )}
//           </div>

//           {mentorReviews.length === 0 ? (
//             <div className="flex flex-col items-center justify-center border border-slate-100 rounded-2xl p-8 bg-slate-50">
//               <p className="text-sm font-medium" style={{ color: C.dark }}>No reviews yet</p>
//               <p className="text-xs mt-1 text-center" style={{ color: C.grey }}>Be the first to leave feedback!</p>
//             </div>
//           ) : (
//             <div className="space-y-3">
//               {previewReviews.map((r) => (
//                 <div key={r.id} className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm space-y-1">
//                   <div className="flex items-center justify-between">
//                     <p className="text-xs font-semibold" style={{ color: C.dark }}>{r.name}</p>
//                     <p className="text-[10px]" style={{ color: C.grey }}>{r.date}</p>
//                   </div>
//                   <StarDisplay rating={r.rating} />
//                   <p className="text-xs leading-relaxed" style={{ color: C.grey }}>{r.comment}</p>
//                 </div>
//               ))}
//               {mentorReviews.length > 2 && (
//                 <button
//                   onClick={() => setShowAllReviews(true)}
//                   className="w-full text-xs font-semibold py-2 rounded-lg border transition hover:bg-red-50"
//                   style={{ borderColor: C.red, color: C.red }}
//                 >
//                   View all {mentorReviews.length} reviews
//                 </button>
//               )}
//             </div>
//           )}
//         </div>

//         {/* ── View All Reviews Modal ── */}
//         {showAllReviews && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
//             <div className="bg-white rounded-2xl w-full max-w-lg max-h-[80vh] flex flex-col shadow-xl">
//               <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
//                 <h2 className="font-semibold text-base" style={{ color: C.dark }}>
//                   All Reviews for {selectedMentor.name} ({mentorReviews.length})
//                 </h2>
//                 <button onClick={() => setShowAllReviews(false)} className="p-1 rounded-lg hover:bg-slate-100 transition">
//                   <FiX size={18} color={C.grey} />
//                 </button>
//               </div>
//               <div className="overflow-y-auto px-6 py-4 space-y-4 flex-1">
//                 {[...mentorReviews].reverse().map((r) => (
//                   <div key={r.id} className="rounded-xl border border-slate-100 bg-slate-50 p-4 space-y-1">
//                     <div className="flex items-center justify-between">
//                       <p className="text-sm font-semibold" style={{ color: C.dark }}>{r.name}</p>
//                       <p className="text-xs" style={{ color: C.grey }}>{r.date}</p>
//                     </div>
//                     <StarDisplay rating={r.rating} />
//                     <p className="text-sm leading-relaxed" style={{ color: C.grey }}>{r.comment}</p>
//                   </div>
//                 ))}
//               </div>
//               <div className="px-6 py-4 border-t border-slate-100">
//                 <button
//                   onClick={() => setShowAllReviews(false)}
//                   className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition hover:opacity-90"
//                   style={{ background: C.red }}
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   }

//   if (view === "schedule") {
//     return (
//       <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
//         <div className="bg-white p-8 rounded-2xl w-full max-w-lg space-y-4 shadow-xl max-h-[90vh] overflow-y-auto">
//           <h1 className="text-xl font-semibold" style={{ color: C.dark }}>Schedule a Session</h1>
//           <div className="flex gap-4">
//             <img src={selectedMentor.photo} alt={selectedMentor.name} className="w-16 h-16 rounded-full object-cover shrink-0"
//               onError={(e) => { e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedMentor.name)}&background=312F61&color=fff&size=80`; }}
//             />
//             <div className="flex-1 space-y-3">
//               <div className="space-y-1">
//                 <label className="text-xs font-semibold" style={{ color: C.dark }}>Title *</label>
//                 <input type="text" value={sessionData.title} onChange={handleTitleChange} placeholder="Enter session title" className="border border-slate-200 p-2.5 rounded-lg w-full text-xs focus:outline-none focus:ring-1 focus:ring-red-300" />
//                 {titleError && <p className="text-[11px] text-red-500">{titleError}</p>}
//               </div>
//               <div className="space-y-1">
//                 <label className="text-xs font-semibold" style={{ color: C.dark }}>Description *</label>
//                 <textarea value={sessionData.description} onChange={(e) => setSessionData({ ...sessionData, description: e.target.value })} placeholder="Enter session description" className="border border-slate-200 p-2.5 rounded-lg w-full text-xs focus:outline-none focus:ring-1 focus:ring-red-300 resize-none" rows={3} />
//               </div>
//               <div className="space-y-1">
//                 <label className="text-xs font-semibold" style={{ color: C.dark }}>Meeting Type *</label>
//                 <select value={sessionData.type} onChange={(e) => setSessionData({ ...sessionData, type: e.target.value })} className="border border-slate-200 p-2.5 rounded-lg w-full text-xs focus:outline-none">
//                   <option>Virtual</option>
//                   <option>Physical</option>
//                 </select>
//               </div>
//               {sessionData.type === "Physical" && (
//                 <div className="space-y-1">
//                   <label className="text-xs font-semibold" style={{ color: C.dark }}>Venue *</label>
//                   <input type="text" value={sessionData.venue} onChange={(e) => setSessionData({ ...sessionData, venue: e.target.value })} className="border border-slate-200 p-2.5 rounded-lg w-full text-xs focus:outline-none" />
//                 </div>
//               )}
//               <div className="grid grid-cols-2 gap-3">
//                 <div className="space-y-1">
//                   <label className="text-xs font-semibold" style={{ color: C.dark }}>Date *</label>
//                   <input type="date" value={sessionData.date} min={todayString} onChange={(e) => setSessionData({ ...sessionData, date: e.target.value })} className="border border-slate-200 p-2.5 rounded-lg w-full text-xs focus:outline-none" />
//                 </div>
//                 <div className="space-y-1">
//                   <label className="text-xs font-semibold" style={{ color: C.dark }}>Time *</label>
//                   <input type="time" value={sessionData.time} onChange={(e) => setSessionData({ ...sessionData, time: e.target.value })} className="border border-slate-200 p-2.5 rounded-lg w-full text-xs focus:outline-none" />
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="flex gap-3 pt-2">
//             <button onClick={handleSubmitSession} className="px-5 py-2.5 rounded-lg text-xs font-semibold text-white transition hover:opacity-90" style={{ background: C.red }}>Submit</button>
//             <button onClick={() => setView("details")} className="px-5 py-2.5 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 transition">Cancel</button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (view === "confirmation") {
//     return (
//       <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
//         <div className="bg-white p-8 rounded-2xl w-80 space-y-4 text-center shadow-xl">
//           <div className="flex h-14 w-14 items-center justify-center rounded-full mx-auto" style={{ background: "#FEE2E2" }}>
//             <FiCalendar size={24} color={C.red} />
//           </div>
//           <p className="font-semibold" style={{ color: C.dark }}>Session Scheduled!</p>
//           <p className="text-xs" style={{ color: C.grey }}>Your session with {selectedMentor.name} has been booked. View it on the Meetings page.</p>
//           <button onClick={() => setView("details")} className="w-full py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: C.red }}>Close</button>
//         </div>
//       </div>
//     );
//   }

//   if (view === "change") {
//     return (
//       <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
//         <div className="bg-white p-8 rounded-2xl w-96 space-y-4 shadow-xl">
//           <h1 className="text-xl font-semibold" style={{ color: C.dark }}>Change Mentor</h1>
//           <p className="text-sm" style={{ color: C.grey }}>Mentor: {selectedMentor.name}</p>
//           <textarea placeholder="Reason for change *" className="border border-slate-200 p-3 rounded-lg w-full text-xs resize-none focus:outline-none focus:ring-1 focus:ring-red-300" rows={4} />
//           <div className="flex gap-3">
//             <button onClick={handleSubmitChange} className="px-5 py-2.5 rounded-lg text-xs font-semibold text-white" style={{ background: C.red }}>Submit</button>
//             <button onClick={() => setView("details")} className="px-5 py-2.5 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (view === "changeConfirmation") {
//     return (
//       <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
//         <div className="bg-white p-8 rounded-2xl w-80 space-y-4 text-center shadow-xl">
//           <p className="font-semibold" style={{ color: C.dark }}>Request Received!</p>
//           <p className="text-xs" style={{ color: C.grey }}>You will be notified once the mentor change is confirmed.</p>
//           <button onClick={() => setView("details")} className="w-full py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: C.red }}>Close</button>
//         </div>
//       </div>
//     );
//   }

//   if (view === "feedback") {
//     return (
//       <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
//         <div className="bg-white p-8 rounded-2xl w-full max-w-md space-y-4 shadow-xl">
//           <h1 className="text-xl font-semibold" style={{ color: C.dark }}>Feedback about {selectedMentor.name}</h1>

//           <div className="space-y-1">
//             <label className="text-xs font-semibold" style={{ color: C.dark }}>Full Name *</label>
//             <input value={feedbackName} onChange={handleFeedbackNameChange} placeholder="Enter your full name" className="border border-slate-200 p-2.5 rounded-lg w-full text-xs focus:outline-none focus:ring-1 focus:ring-red-300" />
//             {feedbackNameError && <p className="text-[11px] text-red-500">{feedbackNameError}</p>}
//           </div>

//           <div className="space-y-1">
//             <label className="text-xs font-semibold" style={{ color: C.dark }}>Feedback *</label>
//             <textarea value={feedbackText} onChange={(e) => setFeedbackText(e.target.value)} placeholder="Share your experience with this mentor..." className="border border-slate-200 p-2.5 rounded-lg w-full text-xs resize-none focus:outline-none focus:ring-1 focus:ring-red-300" rows={4} />
//           </div>

//           <div className="space-y-1">
//             <label className="text-xs font-semibold" style={{ color: C.dark }}>Rating *</label>
//             <div className="flex items-center gap-2">
//               {[1, 2, 3, 4, 5].map((n) => (
//                 <button key={n} type="button" onClick={() => setFeedbackRating(n)} className="transition hover:scale-110">
//                   <FiStar
//                     size={24}
//                     fill={n <= feedbackRating ? C.red : "none"}
//                     color={n <= feedbackRating ? C.red : "#CBD5E1"}
//                   />
//                 </button>
//               ))}
//               <span className="text-xs ml-1" style={{ color: C.grey }}>{feedbackRating}/5</span>
//             </div>
//           </div>

//           <div className="flex gap-3 pt-2">
//             <button onClick={handleSubmitFeedback} className="px-5 py-2.5 rounded-lg text-xs font-semibold text-white transition hover:opacity-90" style={{ background: C.red }}>Submit</button>
//             <button onClick={() => setView("details")} className="px-5 py-2.5 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 transition">Cancel</button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (view === "feedbackConfirmation") {
//     return (
//       <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
//         <div className="bg-white p-8 rounded-2xl w-80 space-y-4 text-center shadow-xl">
//           <div className="flex h-14 w-14 items-center justify-center rounded-full mx-auto" style={{ background: "#FEE2E2" }}>
//             <FiStar size={24} color={C.red} fill={C.red} />
//           </div>
//           <p className="font-semibold" style={{ color: C.dark }}>Thank you for your feedback!</p>
//           <p className="text-xs" style={{ color: C.grey }}>Your review has been saved and is now visible on {selectedMentor.name}'s profile.</p>
//           <button onClick={() => setView("details")} className="w-full py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: C.red }}>View Reviews</button>
//         </div>
//       </div>
//     );
//   }

//   return null;
// }