import React from "react";
import { FiCalendar } from "react-icons/fi";
import ProfileBanner from "./ProfileBanner";
import ProgressSummary from "./ProgressSummary";
import SectionCard from "./SectionCard";
import EmptyIllustration from "./EmptyIllustration";
import MentorGridCard from "./MentorGridCard";
import MeetingItem from "./MeetingItem";
import DiscussionGroupItem from "./DiscussionGroupItem";

export default function FirstTimeDashboardView({ data, greeting, meetings, joinedGroups }) {
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
        <ProgressSummary stats={data.stats} courseSummary={data.courseSummary} />
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.7fr)_280px]">
        <SectionCard
          title="Recommended Mentors"
          subtitle="Choose wisely - you can select a maximum of three mentors to guide you."
          actionLabel="View all"
          actionTo="/mentors"
          actionTextOnly
        >
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {data.recommendedMentors.map((mentor, index) => (
              <MentorGridCard key={`${mentor.name}-${index}`} mentor={mentor} />
            ))}
          </div>
        </SectionCard>

        <div className="space-y-4">
          <SectionCard title="Upcoming Meetings" actionLabel="View all" actionTo="/meetings" actionTextOnly>
            {meetings.length > 0 ? (
              <div className="space-y-3">
                {meetings.slice(0, 3).map((meeting, i) => (
                  <MeetingItem key={meeting.id || i} item={meeting} />
                ))}
              </div>
            ) : (
              <EmptyIllustration
                icon={FiCalendar}
                title="No scheduled meeting yet"
                description=""
                minHeight="min-h-[190px]"
              />
            )}
          </SectionCard>

          <SectionCard title="Discussion Groups" actionLabel="View all" actionTo="/chat" actionTextOnly>
            {joinedGroups.length > 0 ? (
              <div className="space-y-3">
                {joinedGroups.slice(0, 3).map((group, i) => (
                  <DiscussionGroupItem key={group.id || i} item={group} />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {data.discussionGroups.map((group, index) => (
                  <DiscussionGroupItem key={`${group.name}-${index}`} item={group} />
                ))}
              </div>
            )}
          </SectionCard>
        </div>
      </div>
    </div>
  );
}