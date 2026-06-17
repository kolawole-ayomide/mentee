import React from "react";
import { FiStar } from "react-icons/fi";

const C = { red: "#CF173C" };

export default function StarDisplay({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <FiStar
          key={n}
          size={12}
          fill={n <= rating ? C.red : "none"}
          color={n <= rating ? C.red : "#CBD5E1"}
        />
      ))}
    </div>
  );
}