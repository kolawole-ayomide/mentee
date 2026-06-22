// 

// src/components/pages/dashboard/components/EmptyDashboardView.js
import React from "react";
import { Link } from "react-router-dom";
import { FiCalendar, FiMessageSquare } from "react-icons/fi";
import ProfileBanner from "./ProfileBanner";
import ProgressSummary from "./ProgressSummary";
import SectionCard from "./SectionCard";
import EmptyIllustration from "./EmptyIllustration";
import MeetingItem from "./MeetingItem";
import DiscussionGroupItem from "./DiscussionGroupItem";
import { mentorBaseData } from "../../mentorspages/Mentors";

// ── CHANGED: small local card to preview a mentor inside the empty state ──
// ── Reuses the same mentorBaseData that powers the full Mentors page ──
function RecommendedMentorPreviewCard({ mentor }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-3">
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={mentor.image}
          alt={mentor.name}
          className="h-28 w-full object-cover"
        />
      </div>
      <div className="mt-3 space-y-1">
        <h3 className="text-sm font-semibold text-slate-900">{mentor.name}</h3>
        <p className="text-xs text-slate-600">Role: {mentor.role}</p>
        <p className="text-xs text-slate-600">Expertise: {mentor.expertise}</p>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Link
          to={`/mentors?id=${mentor.id}`}
          className="inline-flex items-center justify-center rounded-md border border-rose-200 px-2 py-2 text-[11px] font-semibold text-rose-600 transition hover:bg-rose-50"
        >
          View Profile
        </Link>
        <Link
          to="/mentors"
          className="inline-flex items-center justify-center rounded-md bg-rose-600 px-2 py-2 text-[11px] font-semibold text-white transition hover:bg-rose-700"
        >
          Send Request
        </Link>
      </div>
    </article>
  );
}

export default function EmptyDashboardView({ data, greeting, courseStats, meetings, joinedGroups }) {
  // ── CHANGED: take the first 3 mentors from the same static list as Mentors.js ──
  const previewMentors = mentorBaseData.slice(0, 3);

  return (
    <div className="space-y-4 sm:space-y-5">
      <ProfileBanner
        text={data.banner.text}
        actionLabel={data.banner.actionLabel}
        actionTo={data.banner.actionTo}
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">{greeting}</h2>
          <p className="mt-1 text-sm text-slate-500">{data.subtitle}</p>
        </div>
        <ProgressSummary stats={data.stats} courseSummary={courseStats} />
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.7fr)_280px]">
        <SectionCard
          title={data.recommendedMentors.title}
          actionLabel="View all"
          actionTo="/mentors"
          actionTextOnly
        >
          {/* ── CHANGED: real mentor cards replace the empty illustration ── */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {previewMentors.map((mentor) => (
              <RecommendedMentorPreviewCard key={mentor.id} mentor={mentor} />
            ))}
          </div>
        </SectionCard>

        <div className="space-y-4">
          <SectionCard title={data.meetings.title} actionLabel="View all" actionTo="/meetings" actionTextOnly>
            {meetings.length > 0 ? (
              <div className="space-y-3">
                {meetings.slice(0, 3).map((meeting, i) => (
                  <MeetingItem key={meeting.id || i} item={meeting} />
                ))}
              </div>
            ) : (
              <EmptyIllustration
                icon={FiCalendar}
                title={data.meetings.emptyTitle}
                description={data.meetings.emptyDescription}
                minHeight="min-h-[170px]"
              />
            )}
          </SectionCard>

          <SectionCard title={data.discussionGroups.title} actionLabel="View all" actionTo="/chat" actionTextOnly>
            {joinedGroups.length > 0 ? (
              <div className="space-y-3">
                {joinedGroups.slice(0, 3).map((group, i) => (
                  <DiscussionGroupItem key={group.id || i} item={group} />
                ))}
              </div>
            ) : (
              <EmptyIllustration
                icon={FiMessageSquare}
                title={data.discussionGroups.emptyTitle}
                description={data.discussionGroups.emptyDescription}
                minHeight="min-h-[250px]"
              />
            )}
          </SectionCard>
        </div>
      </div>
    </div>
  );
}