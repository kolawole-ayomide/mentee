import React from "react";

const C = {
red: "#CF173C", redBg: "#FFEDED",
green: "#069D16", greenBg: "#EAFDEB",
yellowBg: "#FFFBE6",
};

export default function StatusBadge({ status }) {
const map = {
Ongoing:   { bg: C.redBg,    color: C.red      },
Pending:   { bg: C.yellowBg, color: "#B8860B"   },
Completed: { bg: C.greenBg,  color: C.green     },
};
const { bg, color } = map[status] || { bg: "#eee", color: "#333" };
return (
<span
    className="inline-block rounded-full px-3 py-0.5 text-xs font-semibold whitespace-nowrap"
    style={{ background: bg, color }}
>
    {status}
</span>
);
}