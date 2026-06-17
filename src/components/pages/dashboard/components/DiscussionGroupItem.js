import React from "react";

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DiscussionGroupItem({ item }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
      <div className="flex min-w-0 items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rose-50 text-[11px] font-semibold text-rose-600">
          {item.name?.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
        </div>
        <div className="min-w-0">
          <h4 className="truncate text-xs font-semibold text-slate-900 sm:text-sm">{item.name}</h4>
          <p className="text-[10px] text-slate-500 sm:text-[11px]">{item.subtitle}</p>
          <div className="mt-1 flex flex-wrap items-center gap-3 text-[10px] text-slate-400 sm:text-[11px]">
            <span>{item.mentees || item.members || 0} mentees</span>
            <span>{item.mentors || 0} mentors</span>
          </div>
        </div>
      </div>
      <button
        type="button"
        className={cx(
          "shrink-0 rounded-md px-4 py-2 text-[10px] font-semibold transition sm:text-[11px]",
          item.buttonLabel === "View chats"
            ? "bg-rose-600 text-white hover:bg-rose-700"
            : "border border-rose-300 text-rose-600 hover:bg-rose-50"
        )}
      >
        {item.buttonLabel || "View"}
      </button>
    </div>
  );
}