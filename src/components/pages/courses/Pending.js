import React from "react";
import StatusBadge from "./StatusBadge";
import ActionDropdown from "./ActionDropdown";

const C = { grey: "#616E7C", dark: "#1B1A23" };

export default function Pending({ paginated, page, perPage, onDownload, onMoveToOngoing }) {
return (
<tbody>
    {paginated.length === 0 ? (
    <tr>
        <td colSpan={7} className="py-12 text-center" style={{ color: C.grey }}>
        No results found.
        </td>
    </tr>
    ) : (
    paginated.map((course, idx) => (
        <tr key={course.id} className="border-b border-slate-50 hover:bg-slate-50/60 transition">
        <td className="px-6 py-4" style={{ color: C.grey }}>{(page - 1) * perPage + idx + 1}</td>
        <td className="px-6 py-4 font-medium whitespace-nowrap" style={{ color: C.dark }}>{course.mentor}</td>
        <td className="px-6 py-4 whitespace-nowrap" style={{ color: C.dark }}>{course.title}</td>
        <td className="px-6 py-4 max-w-[200px]" style={{ color: C.grey }}>{course.objective}</td>
        <td className="px-6 py-4"><StatusBadge status={course.status} /></td>
        <td className="px-6 py-4 whitespace-nowrap" style={{ color: C.grey }}>{course.date}</td>
        <td className="px-6 py-4">
            <ActionDropdown
            status={course.status}
            onDownload={() => {
                onDownload(course);
                onMoveToOngoing(course.id);
            }}
            />
        </td>
        </tr>
    ))
    )}
</tbody>
);
}