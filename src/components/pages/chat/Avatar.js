import React, { useState } from "react";
import { C } from "./data/chatData";

export default function Avatar({ src, name, online = false }) {
const [err, setErr] = useState(false);
const initials = name?.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
return (
<div className="relative h-10 w-10 shrink-0">
    {!err && src ? (
    <img src={src} alt={name} onError={() => setErr(true)}
        className="h-10 w-10 rounded-full object-cover" />
    ) : (
    <div className="h-10 w-10 rounded-full flex items-center justify-center text-white text-xs font-bold"
        style={{ background: C.navy }}>
        {initials}
    </div>
    )}
    {online && (
    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-white" />
    )}
</div>
);
}