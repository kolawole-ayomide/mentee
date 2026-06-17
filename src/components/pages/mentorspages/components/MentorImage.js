import React from "react";

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function getInitials(name) {
  return name.split(" ").filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
}

export default function MentorImage({ mentor, className = "", rounded = "rounded-xl", srcOverride = "" }) {
  const imageSrc = srcOverride || mentor?.detailImage || mentor?.image;
  if (imageSrc) {
    return (
      <img src={imageSrc} alt={mentor.name} className={cx("object-cover", rounded, className)} />
    );
  }
  return (
    <div className={cx("flex items-center justify-center bg-gradient-to-br from-slate-200 via-slate-100 to-slate-300 text-xl font-semibold text-slate-600", rounded, className)}>
      {getInitials(mentor.name)}
    </div>
  );
}