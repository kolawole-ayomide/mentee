import React from "react";
import { Link } from "react-router-dom";

export default function ProfileBanner({ text, actionLabel, actionTo }) {
  return (
    <div className="rounded-xl border border-amber-100 bg-amber-50 px-4 py-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[11px] font-medium text-amber-900 sm:text-xs">{text}</p>
        <Link to={actionTo} className="text-[11px] font-semibold text-amber-900 underline-offset-2 transition hover:underline sm:text-xs">
          {actionLabel}
        </Link>
      </div>
    </div>
  );
}