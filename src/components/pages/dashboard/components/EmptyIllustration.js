import React from "react";

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function EmptyIllustration({
  icon: Icon, title, description, imageSrc, imageAlt, minHeight = "min-h-[170px]"
}) {
  return (
    <div className={cx("flex flex-col items-center justify-center rounded-2xl bg-slate-50 px-6 py-8 text-center", minHeight)}>
      {imageSrc ? (
        <img src={imageSrc} alt={imageAlt || title} className="mb-4 h-24 w-auto object-contain sm:h-28" />
      ) : (
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
          <Icon className="h-8 w-8" />
        </div>
      )}
      <h4 className="text-sm font-medium text-slate-900">{title}</h4>
      {description && (
        <p className="mt-2 max-w-xs text-[11px] leading-5 text-slate-500 sm:text-xs">{description}</p>
      )}
    </div>
  );
}