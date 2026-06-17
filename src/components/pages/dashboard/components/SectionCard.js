import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SectionCard({
  title, subtitle, actionLabel, actionTo,
  actionTextOnly = false, className = "", children,
}) {
  return (
    <section className={cx("rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5", className)}>
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-900 sm:text-base">{title}</h3>
          {subtitle && (
            <p className="mt-1 text-[11px] leading-5 text-slate-500 sm:text-xs">{subtitle}</p>
          )}
        </div>
        {actionLabel && actionTo && (
          actionTextOnly ? (
            <Link to={actionTo} className="shrink-0 text-[11px] font-semibold text-rose-600 transition hover:text-rose-700 sm:text-xs">
              {actionLabel}
            </Link>
          ) : (
            <Link to={actionTo} className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50">
              {actionLabel}
              <FiArrowRight className="h-3.5 w-3.5" />
            </Link>
          )
        )}
      </div>
      {children}
    </section>
  );
}