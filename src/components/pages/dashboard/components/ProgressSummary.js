import React from "react";
import { Link } from "react-router-dom";

export default function ProgressSummary({ stats, courseSummary }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="space-y-2">
        {stats.map((item, i) => (
          <div key={i}>
            <div className="mb-1 flex items-center justify-between text-[10px] text-slate-400 sm:text-[11px]">
              <span>{item.label || item.value + " Progress"}</span>
              <span>{item.value}</span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-100">
              <div
                className="h-1.5 rounded-full bg-rose-400 transition-all"
                style={{ width: `${item.progress}%` }}
              />
            </div>
          </div>
        ))}
        <div className="flex flex-wrap items-center gap-3 pt-2 text-[10px] text-slate-500 sm:text-[11px]">
          <div className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-sm border border-rose-300" />
            <Link to="/courses" className="hover:text-rose-600 transition">
              {courseSummary.total} Total Courses
            </Link>
          </div>
          <div className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-sm border border-amber-300" />
            <Link to="/courses" className="hover:text-rose-600 transition">
              {courseSummary.ongoing} Ongoing course
            </Link>
          </div>
          <div className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-sm border border-slate-300" />
            <Link to="/courses" className="hover:text-rose-600 transition">
              {courseSummary.completed} Completed Courses
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}