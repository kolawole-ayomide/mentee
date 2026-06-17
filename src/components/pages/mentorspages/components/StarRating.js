import React from "react";
import { FiStar } from "react-icons/fi";

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function StarRating({ count }) {
  const safeCount = Number(count || 0);
  return (
    <div className="mt-3 flex items-center gap-1 text-amber-400">
      {[1, 2, 3, 4, 5].map((value) => (
        <FiStar key={value} className={cx("h-3.5 w-3.5", value <= Math.round(safeCount) ? "fill-current" : "")} />
      ))}
      <span className="ml-1 text-[11px] text-slate-500">({safeCount.toFixed(1)})</span>
    </div>
  );
}