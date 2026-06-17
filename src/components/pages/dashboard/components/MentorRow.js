import React from "react";

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function getInitials(name) {
  return name.split(" ").filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
}

function Avatar({ name, image, className = "" }) {
  if (image) {
    return <img src={image} alt={name} className={cx("rounded-full object-cover", className)} />;
  }
  return (
    <div className={cx("flex items-center justify-center rounded-full bg-gradient-to-br from-rose-100 to-slate-200 font-semibold text-slate-700", className)}>
      {getInitials(name)}
    </div>
  );
}

export default function MentorRow({ mentor }) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <Avatar name={mentor.name} image={mentor.image} className="h-12 w-12 text-sm" />
        <div>
          <h4 className="text-xs font-semibold text-slate-900 sm:text-sm">{mentor.name}</h4>
          <p className="text-[11px] text-slate-500 sm:text-xs">Expertise: {mentor.expertise}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:w-[220px]">
        <button type="button" className="rounded-md border border-rose-200 px-3 py-2 text-[10px] font-semibold text-rose-600 transition hover:bg-rose-50 sm:text-[11px]">
          View Profile
        </button>
        <button type="button" className="rounded-md bg-rose-600 px-3 py-2 text-[10px] font-semibold text-white transition hover:bg-rose-700 sm:text-[11px]">
          Book a Session
        </button>
      </div>
    </div>
  );
}