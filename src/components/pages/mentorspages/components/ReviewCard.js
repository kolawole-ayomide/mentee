import React from "react";
import { FiUser } from "react-icons/fi";

export default function ReviewCard({ review }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500">
          <FiUser className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="text-sm font-semibold text-slate-900">{review.name}</h4>
          <p className="text-[11px] text-slate-500">{review.role}</p>
          <p className="mt-3 text-xs leading-6 text-slate-500">{review.message}</p>
          <p className="mt-4 text-right text-[11px] text-slate-500">{review.date}</p>
        </div>
      </div>
    </article>
  );
}