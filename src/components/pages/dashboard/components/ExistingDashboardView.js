import React from "react";
import SectionCard from "./SectionCard";
import ProgressSummary from "./ProgressSummary";
import JourneyHero from "./JourneyHero";
import MentorRow from "./MentorRow";
import MentorGridCard from "./MentorGridCard";
import MeetingItem from "./MeetingItem";
import DiscussionGroupItem from "./DiscussionGroupItem";

export default function ExistingDashboardView({ data, greeting, meetings, joinedGroups }) {
  return (
    <div className="space-y-4 sm:space-y-5">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">{greeting}</h2>
        </div>
        <ProgressSummary stats={data.stats} courseSummary={data.courseSummary} />
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.7fr)_280px]">
        <div className="space-y-4">
          <JourneyHero journey={data.journey} />

          <SectionCard title="My Mentors">
            <div className="space-y-3">
              {data.activeMentors.map((mentor, index) => (
                <MentorRow key={`${mentor.name}-${index}`} mentor={mentor} />
              ))}
            </div>
          </SectionCard>

          <SectionCard
            title="Other Available Mentors"
            subtitle="Your Path to Mentorship Excellence: Meet Your Ideal Mentors"
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
        </div>

        <div className="space-y-4">
          <SectionCard title="Upcoming Meetings" actionLabel="View all" actionTo="/meetings" actionTextOnly>
            {meetings.length > 0 ? (
              <div className="space-y-3">
                {meetings.slice(0, 3).map((meeting, i) => (
                  <MeetingItem key={meeting.id || i} item={meeting} />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {data.meetings.map((meeting, index) => (
                  <MeetingItem key={`${meeting.title}-${index}`} item={meeting} />
                ))}
              </div>
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