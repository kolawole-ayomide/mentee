// src/components/pages/mentorspages/MyMentors.js
import React, { useState } from "react";
import { FiMessageCircle, FiCalendar } from "react-icons/fi";

const dummyMentors = [
  {
    id: 1,
    name: "Daniel Francis",
    role: "Head of marketing",
    email: "danielfrancis20@gmail.com",
    linkedin: "My profile",
    photo: "/daniel.png",
    nextMeeting: null,
    reviews: [],
  },
  {
    id: 2,
    name: "Daniel Francis",
    role: "Head of marketing",
    email: "danielfrancis20@gmail.com",
    linkedin: "My profile",
    photo: "/daniel.png",
    nextMeeting: { date: "October 11, 2023", time: "3:30PM" },
    reviews: [],
  },
];

export default function MyMentors() {
  const [view, setView] = useState("empty"); // empty | list | details | schedule | change | feedback
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [sessionData, setSessionData] = useState({ type: "Virtual", venue: "", date: "", time: "" });

  const handleSelectMentor = (mentor) => {
    setSelectedMentor(mentor);
    setView("details");
  };

  const handleBookSession = (mentor) => {
    setSelectedMentor(mentor);
    setSessionData({ type: "Virtual", venue: "", date: "", time: "" });
    setView("schedule");
  };

  const handleSubmitSession = () => setView("confirmation");
  const handleChangeMentor = () => setView("change");
  const handleSubmitChange = () => setView("changeConfirmation");
  const handleFeedback = () => setView("feedback");
  const handleSubmitFeedback = () => setView("feedbackConfirmation");

  // Screens
  if (view === "empty") {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-semibold mb-4">My Mentors</h1>
        <div className="flex flex-col items-center justify-center py-20">
          <img src="/mentee.png" alt="empty state" className="w-60 h-auto mb-4 object-fit" />
          <p>You have no mentor yet</p>
          <button onClick={() => setView("list")} className="mt-4 px-6 py-2 bg-red-600 text-white rounded">Choose a mentor</button>
        </div>
      </div>
    );
  }

  if (view === "list") {
    return (
      <div className="p-8 space-y-4">
        <h1 className="text-2xl font-semibold mb-4">My Mentors</h1>
        {dummyMentors.map((mentor) => (
          <div key={mentor.id} className="flex items-center justify-between border p-4 rounded">
            <div className="flex items-center space-x-4">
              <img src={mentor.photo} alt={mentor.name} className="w-20 h-20 rounded-full" />
              <div>
                <h2 className="font-semibold">{mentor.name}</h2>
                <p>{mentor.role}</p>
                <p>Email: {mentor.email}</p>
                <p>LinkedIn: {mentor.linkedin}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div>
                {mentor.nextMeeting ? (
                  <p>Next Meeting: {mentor.nextMeeting.date} {mentor.nextMeeting.time}</p>
                ) : (
                  <p>No Meeting Scheduled</p>
                )}
              </div>
              <button onClick={() => handleSelectMentor(mentor)} className="px-4 py-2 border rounded text-red-600">View details</button>
              <button onClick={() => handleBookSession(mentor)} className="px-4 py-2 bg-red-600 text-white rounded">Book a Session</button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (view === "details") {
    return (
      <div className="p-8 flex space-x-8">
        <div className="flex-1 space-y-4">
          <h1 className="text-2xl font-semibold">{selectedMentor.name}</h1>
          <p>{selectedMentor.role}</p>
          <p>Email: {selectedMentor.email}</p>
          <p>LinkedIn: {selectedMentor.linkedin}</p>
          <h2 className="font-semibold mt-4">Bio/Summary</h2>
          <p>Daniel is an exemplary mentor ...</p>
          <h2 className="font-semibold mt-4">Experience</h2>
          <p>Over 15 years...</p>
          <h2 className="font-semibold mt-4">Areas of Expertise</h2>
          <span className="px-2 py-1 bg-red-100 text-red-600 rounded mr-2">Brand Strategy</span>
          <span className="px-2 py-1 bg-red-100 text-red-600 rounded">Market Research</span>

          <h2 className="font-semibold mt-4">Mentorship Approach</h2>
          <p>Collaborative style ...</p>

          <div className="flex space-x-4 mt-4">
            <button onClick={() => handleFeedback()} className="px-4 py-2 border rounded text-gray-600">Give Feedback</button>
            <button onClick={() => handleBookSession(selectedMentor)} className="px-4 py-2 bg-red-600 text-white rounded">Schedule a Meeting</button>
            <button onClick={() => handleChangeMentor()} className="px-4 py-2 border rounded text-red-600">Change Mentor</button>
          </div>
        </div>
        <div className="w-1/3 space-y-2">
          <h2 className="font-semibold">Reviews ({selectedMentor.reviews.length})</h2>
          {selectedMentor.reviews.length === 0 ? (
            <div className="flex flex-col items-center justify-center border p-4 rounded">
              <img src="/empty-review.png" alt="empty review" />
              <p>No reviews yet</p>
            </div>
          ) : (
            selectedMentor.reviews.map((r, idx) => (
              <div key={idx} className="border p-2 rounded">
                <p>{r.name}</p>
                <p>{r.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  if (view === "schedule") {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/30">
        <div className="bg-white p-8 rounded w-1/2 space-y-4">
          <h1 className="text-xl font-semibold">Schedule a Session</h1>
          <div className="flex space-x-4">
            <img src={selectedMentor.photo} className="w-24 h-24 rounded-full" />
            <div className="flex-1 space-y-2">
              <label>Title *</label>
              <input type="text" className="border p-2 rounded w-full" />
              <label>Description *</label>
              <textarea className="border p-2 rounded w-full"></textarea>
              <label>Meeting Type *</label>
              <select value={sessionData.type} onChange={(e) => setSessionData({...sessionData, type: e.target.value})} className="border p-2 rounded w-full">
                <option>Virtual</option>
                <option>Physical</option>
              </select>
              {sessionData.type === "Physical" && (
                <>
                  <label>Venue *</label>
                  <input type="text" value={sessionData.venue} onChange={(e)=>setSessionData({...sessionData, venue:e.target.value})} className="border p-2 rounded w-full" />
                </>
              )}
              <label>Availability Session *</label>
              <input type="date" value={sessionData.date} onChange={(e)=>setSessionData({...sessionData, date:e.target.value})} className="border p-2 rounded w-full" />
              <label>Availability Time Slot *</label>
              <input type="time" value={sessionData.time} onChange={(e)=>setSessionData({...sessionData, time:e.target.value})} className="border p-2 rounded w-full" />
            </div>
          </div>
          <button onClick={handleSubmitSession} className="px-4 py-2 bg-red-600 text-white rounded">Submit</button>
        </div>
      </div>
    );
  }

  if (view === "confirmation") {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/30">
        <div className="bg-white p-8 rounded w-1/3 space-y-4 text-center">
          <p>Your session has been scheduled with {selectedMentor.name}</p>
          <button onClick={() => setView("details")} className="px-4 py-2 bg-red-600 text-white rounded">Close</button>
        </div>
      </div>
    );
  }

  if (view === "change") {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/30">
        <div className="bg-white p-8 rounded w-1/3 space-y-4">
          <h1 className="text-xl font-semibold">Change Mentor</h1>
          <p>Mentor: {selectedMentor.name}</p>
          <textarea placeholder="Reason" className="border p-2 rounded w-full"></textarea>
          <button onClick={handleSubmitChange} className="px-4 py-2 bg-red-600 text-white rounded">Submit</button>
        </div>
      </div>
    );
  }

  if (view === "changeConfirmation") {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/30">
        <div className="bg-white p-8 rounded w-1/3 space-y-4 text-center">
          <p>Your request has been received. You will be notified once the change is confirmed.</p>
          <button onClick={() => setView("details")} className="px-4 py-2 bg-red-600 text-white rounded">Close</button>
        </div>
      </div>
    );
  }

  if (view === "feedback") {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/30">
        <div className="bg-white p-8 rounded w-1/3 space-y-4">
          <h1 className="text-xl font-semibold">Feedback about Mentor</h1>
          <input placeholder="Full Name" className="border p-2 rounded w-full" />
          <textarea placeholder="Feedback *" className="border p-2 rounded w-full"></textarea>
          <label>Rating *</label>
          <select className="border p-2 rounded w-full">
            {[1,2,3,4,5].map(n=> <option key={n}>{n}</option>)}
          </select>
          <button onClick={handleSubmitFeedback} className="px-4 py-2 bg-red-600 text-white rounded">Submit</button>
        </div>
      </div>
    );
  }

  if (view === "feedbackConfirmation") {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/30">
        <div className="bg-white p-8 rounded w-1/3 space-y-4 text-center">
          <p>Thank you! Your feedback has been received.</p>
          <button onClick={() => setView("details")} className="px-4 py-2 bg-red-600 text-white rounded">Close</button>
        </div>
      </div>
    );
  }

  return null;
}