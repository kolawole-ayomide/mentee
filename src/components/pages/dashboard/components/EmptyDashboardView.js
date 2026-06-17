import React from "react";
import { FiCalendar, FiMessageSquare, FiUsers } from "react-icons/fi";
import ProfileBanner from "./ProfileBanner";
import ProgressSummary from "./ProgressSummary";
import SectionCard from "./SectionCard";
import EmptyIllustration from "./EmptyIllustration";
import MeetingItem from "./MeetingItem";
import DiscussionGroupItem from "./DiscussionGroupItem";

export default function EmptyDashboardView({ data, greeting, courseStats, meetings, joinedGroups }) {
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
          className="min-h-[420px]"
        >
          <EmptyIllustration
            icon={FiUsers}
            title={data.recommendedMentors.emptyTitle}
            description={data.recommendedMentors.emptyDescription}
            imageSrc={data.recommendedMentors.illustrationSrc}
            imageAlt="No mentors illustration"
            minHeight="min-h-[330px]"
          />
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