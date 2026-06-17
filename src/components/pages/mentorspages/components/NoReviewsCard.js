import React from "react";
import { FiMessageSquare, FiStar } from "react-icons/fi";

export default function NoReviewsCard() {
  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center px-6 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-rose-50 text-rose-600">
        <FiMessageSquare className="h-9 w-9" />
      </div>
      <div className="mt-5 flex items-center gap-1 text-rose-500">
        {[1, 2, 3, 4, 5].map((value) => (
          <FiStar key={value} className="h-3.5 w-3.5" />
        ))}
      </div>
      <p className="mt-4 text-sm font-medium text-slate-900">No reviews yet</p>
    </div>
  );
}