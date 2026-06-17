import React from "react";
import { FiTrendingUp } from "react-icons/fi";

export default function JourneyHero({ journey }) {
  return (
    <div className="grid gap-4 rounded-2xl bg-rose-50 p-5 md:grid-cols-[minmax(0,1fr)_180px] md:items-center">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">{journey.title}</h3>
        <p className="mt-2 text-sm font-semibold text-rose-600">{journey.highlight}</p>
        <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">{journey.description}</p>
      </div>
      <div className="flex h-32 items-center justify-center rounded-2xl bg-white/70 text-rose-500">
        <FiTrendingUp className="h-16 w-16" />
      </div>
    </div>
  );
}