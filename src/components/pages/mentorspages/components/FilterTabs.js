import React from "react";

const TABS = [
  "All",
  "Recommended Mentors",
  "Skill Development",
  "Personal Development",
  "Career Development",
  "Professional Development",
];

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function FilterTabs({ activeTab, onTabChange }) {
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-3 border-b border-slate-100 pb-4">
      {TABS.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onTabChange(tab)}
          className={cx(
            "text-xs font-medium transition",
            activeTab === tab ? "text-amber-500" : "text-slate-600 hover:text-slate-900"
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export { TABS };