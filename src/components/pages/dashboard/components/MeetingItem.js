import React from "react";

export default function MeetingItem({ item }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
      <div className="flex items-start gap-2">
        <span className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-rose-600" />
        <div>
          <h4 className="text-xs font-semibold text-slate-900 sm:text-sm">{item.title}</h4>
          <p className="mt-1 text-[10px] text-slate-500 sm:text-[11px]">Mentor: {item.mentor}</p>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-[10px] text-slate-400 sm:text-[11px]">
            <span>{item.date}</span>
            <span>{item.time}</span>
          </div>
        </div>
      </div>
    </div>
  );
}