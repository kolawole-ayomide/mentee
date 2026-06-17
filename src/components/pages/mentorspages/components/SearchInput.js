import React from "react";
import { FiSearch } from "react-icons/fi";

export default function SearchInput({ value, onChange }) {
  return (
    <div className="relative w-full max-w-sm">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search"
        className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-4 pr-10 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#312F61]"
      />
      <FiSearch className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
    </div>
  );
}