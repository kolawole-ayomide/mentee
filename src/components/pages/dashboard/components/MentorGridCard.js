import React from "react";


function getInitials(name) {
  return name.split(" ").filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
}

export default function MentorGridCard({ mentor }) {
  return (
    <article className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
      <div className="mb-3 h-28 overflow-hidden rounded-xl bg-slate-100">
        {mentor.image ? (
          <img src={mentor.image} alt={mentor.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-rose-100 via-white to-slate-200 text-2xl font-semibold text-slate-700">
            {getInitials(mentor.name)}
          </div>
        )}
      </div>
      <div className="space-y-1">
        <h4 className="text-xs font-semibold text-slate-900 sm:text-sm">{mentor.name}</h4>
        <p className="text-[11px] text-slate-500 sm:text-xs">{mentor.role}</p>
        <p className="text-[11px] text-slate-500 sm:text-xs">Expertise: {mentor.expertise}</p>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button type="button" className="rounded-md border border-rose-200 px-2 py-2 text-[10px] font-semibold text-rose-600 transition hover:bg-rose-50 sm:text-[11px]">
          View Profile
        </button>
        <button type="button" className="rounded-md bg-rose-600 px-2 py-2 text-[10px] font-semibold text-white transition hover:bg-rose-700 sm:text-[11px]">
          Send Request
        </button>
      </div>
    </article>
  );
}