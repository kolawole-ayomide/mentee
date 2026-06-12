// src/components/pages/dashboard/Dashboard.js
import React, { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  FiArrowRight,
  FiCalendar,
  FiMessageSquare,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";
import { useUser } from "../../../context/UserContext";
import { SHOW_COURSES_EMPTY_STATE, COURSE_DATA } from "../courses/data/coursesData";

const dashboardPresets = {
  empty: {
    banner: {
      text: "Hey! kindly complete your VMP profile",
      actionLabel: "Update Profile",
      actionTo: "/profile",
    },
    subtitle: "Embark on a Journey of Growth and Achievement with Us",
    stats: [
      { label: "VMP Progress", value: "0%", progress: 0 },
      { label: "My Progress", value: "0%", progress: 0 },
    ],
    courseSummary: { total: 0, ongoing: 0, completed: 0 },
    recommendedMentors: {
      title: "Recommended Mentors",
      emptyTitle: "You don't have a Mentor",
      emptyDescription:
        "Kindly proceed to check the available or recommended mentors.",
      illustrationSrc: "/mentorsemptystate.svg",
    },
    meetings: {
      title: "Upcoming Meetings",
      emptyTitle: "No scheduled meeting yet",
      emptyDescription: "",
    },
    discussionGroups: {
      title: "Discussion Groups",
      emptyTitle: "No Discussion Groups Found",
      emptyDescription:
        "It appears there are no discussion groups available right now. Stay tuned for upcoming group discussions, where you can connect with like-minded individuals and engage in meaningful conversations.",
    },
  },

  "first-time": {
    banner: {
      text: "Hey! kindly complete your VMP profile",
      actionLabel: "Update Profile",
      actionTo: "/profile",
    },
    subtitle: "Embark on a Journey of Growth and Achievement with Us",
    stats: [
      { label: "VMP Progress", value: "0%", progress: 0 },
      { label: "My Progress", value: "0%", progress: 0 },
    ],
    courseSummary: { total: 45, ongoing: 0, completed: 0 },
    recommendedMentors: [
      { name: "Daniel Francis", role: "Head of marketing", expertise: "Skill Development", image: "/daniel.png" },
      { name: "Daniel Francis", role: "Head of marketing", expertise: "Skill Development", image: "/frank.png" },
      { name: "Daniel Francis", role: "Head of marketing", expertise: "Skill Development", image: "/david.png" },
      { name: "Daniel Francis", role: "Head of marketing", expertise: "Skill Development", image: "/tola.png" },
      { name: "Daniel Francis", role: "Head of marketing", expertise: "Skill Development", image: "/bimbo.png" },
      { name: "Daniel Francis", role: "Head of marketing", expertise: "Skill Development", image: "/saheed.png" },
    ],
    meetings: [],
    discussionGroups: [
      { name: "Wisdom Exchange", subtitle: "Where Knowledge Meets Conversation", mentees: 14, mentors: 5, buttonLabel: "Join" },
      { name: "Wisdom Exchange", subtitle: "Where Knowledge Meets Conversation", mentees: 14, mentors: 5, buttonLabel: "Join" },
      { name: "Wisdom Exchange", subtitle: "Where Knowledge Meets Conversation", mentees: 14, mentors: 5, buttonLabel: "Join" },
      { name: "Wisdom Exchange", subtitle: "Where Knowledge Meets Conversation", mentees: 14, mentors: 5, buttonLabel: "Join" },
      { name: "Wisdom Exchange", subtitle: "Where Knowledge Meets Conversation", mentees: 14, mentors: 5, buttonLabel: "Join" },
    ],
  },

  existing: {
    subtitle: "",
    stats: [
      { label: "VMP Progress", value: "90%", progress: 90 },
      { label: "My Progress", value: "56%", progress: 56 },
    ],
    courseSummary: { total: 45, ongoing: 4, completed: 15 },
    journey: {
      title: "Your Mentorship Journey Continues",
      highlight: "Keep Thriving!",
      description:
        "Your commitment to growth inspires us. Update your profile, engage with the community, and together, let's reach new heights!",
    },
    activeMentors: [
      { name: "Jennifer Gregory", expertise: "Skill Development", image: "/Jennifer.png" },
      { name: "Gideon Tayo", expertise: "Skill Development", image: "/Gideon.png" },
    ],
    recommendedMentors: [
      { name: "Daniel Francis", role: "Head of marketing", expertise: "Skill Development", image: "/daniel.png" },
      { name: "Daniel Francis", role: "Head of marketing", expertise: "Skill Development", image: "/frank.png" },
      { name: "Daniel Francis", role: "Head of marketing", expertise: "Skill Development", image: "/david.png" },
    ],
    meetings: [
      { title: "Goal Setting and Achievement", mentor: "Favour Graham", date: "12/10/2023", time: "1:00pm" },
      { title: "Goal Setting and Achievement", mentor: "Favour Graham", date: "12/10/2023", time: "1:00pm" },
    ],
    discussionGroups: [
      { name: "Wisdom Exchange", subtitle: "Where Knowledge Meets Conversation", mentees: 14, mentors: 5, buttonLabel: "View chats" },
      { name: "Wisdom Exchange", subtitle: "Where Knowledge Meets Conversation", mentees: 14, mentors: 5, buttonLabel: "Join" },
      { name: "Wisdom Exchange", subtitle: "Where Knowledge Meets Conversation", mentees: 14, mentors: 5, buttonLabel: "Join" },
      { name: "Wisdom Exchange", subtitle: "Where Knowledge Meets Conversation", mentees: 14, mentors: 5, buttonLabel: "Join" },
      { name: "Wisdom Exchange", subtitle: "Where Knowledge Meets Conversation", mentees: 14, mentors: 5, buttonLabel: "Join" },
    ],
  },
};

const fallbackUser = {
  name: "",
  vmpCompleted: false,
  mentors: [],
  meetings: [],
  documents: [],
  discussionGroups: [],
  courseStats: { total: 0, ongoing: 0, completed: 0 },
};

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function normalizeState(value) {
  return ["empty", "first-time", "existing"].includes(value) ? value : null;
}

function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function readCourseStats() {
  try {
    if (SHOW_COURSES_EMPTY_STATE) {
      return { total: 0, ongoing: 0, completed: 0 };
    }

    const completedIds = JSON.parse(localStorage.getItem("completedCourses") || "[]");

    const courses = COURSE_DATA.map((c) =>
      completedIds.includes(c.id) ? { ...c, status: "Completed" } : c
    );

    return {
      total:     courses.length,
      ongoing:   courses.filter((c) => c.status === "Ongoing").length,
      completed: courses.filter((c) => c.status === "Completed").length,
    };
  } catch {
    return { total: 0, ongoing: 0, completed: 0 };
  }
}

function readMeetings() {
  try {
    const saved = localStorage.getItem("vmpMeetings");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function readJoinedGroups() {
  try {
    const saved = localStorage.getItem("vmpJoinedGroups");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function deriveDashboardState(user) {
  const vmpCompleted = Boolean(user?.vmpCompleted);
  const hasExistingActivity =
    (user?.mentors?.length || 0) > 0 ||
    (user?.meetings?.length || 0) > 0 ||
    (user?.documents?.length || 0) > 0 ||
    (user?.discussionGroups?.length || 0) > 0 ||
    (user?.courseStats?.ongoing || 0) > 0 ||
    (user?.courseStats?.completed || 0) > 0;

  if (!vmpCompleted) return "empty";
  if (!hasExistingActivity) return "first-time";
  return "existing";
}

// ── Shared UI components (unchanged from Doc 4) ──

function SectionCard({
  title, subtitle, actionLabel, actionTo,
  actionTextOnly = false, className = "", children,
}) {
  return (
    <section className={cx("rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5", className)}>
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-900 sm:text-base">{title}</h3>
          {subtitle && (
            <p className="mt-1 text-[11px] leading-5 text-slate-500 sm:text-xs">{subtitle}</p>
          )}
        </div>
        {actionLabel && actionTo && (
          actionTextOnly ? (
            <Link to={actionTo} className="shrink-0 text-[11px] font-semibold text-rose-600 transition hover:text-rose-700 sm:text-xs">
              {actionLabel}
            </Link>
          ) : (
            <Link to={actionTo} className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50">
              {actionLabel}
              <FiArrowRight className="h-3.5 w-3.5" />
            </Link>
          )
        )}
      </div>
      {children}
    </section>
  );
}

function ProfileBanner({ text, actionLabel, actionTo }) {
  return (
    <div className="rounded-xl border border-amber-100 bg-amber-50 px-4 py-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[11px] font-medium text-amber-900 sm:text-xs">{text}</p>
        <Link to={actionTo} className="text-[11px] font-semibold text-amber-900 underline-offset-2 transition hover:underline sm:text-xs">
          {actionLabel}
        </Link>
      </div>
    </div>
  );
}

function ProgressSummary({ stats, courseSummary }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="space-y-2">
        {stats.map((item, i) => (
          <div key={i}>
            <div className="mb-1 flex items-center justify-between text-[10px] text-slate-400 sm:text-[11px]">
              <span>{item.label || item.value + " Progress"}</span>
              <span>{item.value}</span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-100">
              <div
                className="h-1.5 rounded-full bg-rose-400 transition-all"
                style={{ width: `${item.progress}%` }}
              />
            </div>
          </div>
        ))}
        <div className="flex flex-wrap items-center gap-3 pt-2 text-[10px] text-slate-500 sm:text-[11px]">
          <div className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-sm border border-rose-300" />
            <Link to="/courses" className="hover:text-rose-600 transition">
              {courseSummary.total} Total Courses
            </Link>
          </div>
          <div className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-sm border border-amber-300" />
            <Link to="/courses" className="hover:text-rose-600 transition">
              {courseSummary.ongoing} Ongoing course
            </Link>
          </div>
          <div className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-sm border border-slate-300" />
            <Link to="/courses" className="hover:text-rose-600 transition">
              {courseSummary.completed} Completed Courses
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyIllustration({ icon: Icon, title, description, imageSrc, imageAlt, minHeight = "min-h-[170px]" }) {
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

function Avatar({ name, image, className = "" }) {
  if (image) {
    return <img src={image} alt={name} className={cx("rounded-full object-cover", className)} />;
  }
  return (
    <div className={cx("flex items-center justify-center rounded-full bg-gradient-to-br from-rose-100 to-slate-200 font-semibold text-slate-700", className)}>
      {getInitials(name)}
    </div>
  );
}

function MentorGridCard({ mentor }) {
  return (
    <article className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
      <div className="mb-3 h-28 overflow-hidden rounded-xl bg-slate-100">
        {mentor.image ? (
          <img src={mentor.image} alt={mentor.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-rose-100 via-white to-slate-200 text-2xl font-semibold text-slate-700">
            {getInitials(mentor.name)}
          </div>
        )}
      </div>
      <div className="space-y-1">
        <h4 className="text-xs font-semibold text-slate-900 sm:text-sm">{mentor.name}</h4>
        <p className="text-[11px] text-slate-500 sm:text-xs">{mentor.role}</p>
        <p className="text-[11px] text-slate-500 sm:text-xs">Expertise: {mentor.expertise}</p>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button type="button" className="rounded-md border border-rose-200 px-2 py-2 text-[10px] font-semibold text-rose-600 transition hover:bg-rose-50 sm:text-[11px]">
          View Profile
        </button>
        <button type="button" className="rounded-md bg-rose-600 px-2 py-2 text-[10px] font-semibold text-white transition hover:bg-rose-700 sm:text-[11px]">
          Send Request
        </button>
      </div>
    </article>
  );
}

function MentorRow({ mentor }) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <Avatar name={mentor.name} image={mentor.image} className="h-12 w-12 text-sm" />
        <div>
          <h4 className="text-xs font-semibold text-slate-900 sm:text-sm">{mentor.name}</h4>
          <p className="text-[11px] text-slate-500 sm:text-xs">Expertise: {mentor.expertise}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:w-[220px]">
        <button type="button" className="rounded-md border border-rose-200 px-3 py-2 text-[10px] font-semibold text-rose-600 transition hover:bg-rose-50 sm:text-[11px]">
          View Profile
        </button>
        <button type="button" className="rounded-md bg-rose-600 px-3 py-2 text-[10px] font-semibold text-white transition hover:bg-rose-700 sm:text-[11px]">
          Book a Session
        </button>
      </div>
    </div>
  );
}

function MeetingItem({ item }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
      <div className="flex items-start gap-2">
        <span className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-rose-600" />
        <div>
          <h4 className="text-xs font-semibold text-slate-900 sm:text-sm">{item.title}</h4>
          <p className="mt-1 text-[10px] text-slate-500 sm:text-[11px]">Mentor: {item.mentor}</p>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-[10px] text-slate-400 sm:text-[11px]">
            <span>{item.date}</span>
            <span>{item.time}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function DiscussionGroupItem({ item }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
      <div className="flex min-w-0 items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rose-50 text-[11px] font-semibold text-rose-600">
          {item.name?.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
        </div>
        <div className="min-w-0">
          <h4 className="truncate text-xs font-semibold text-slate-900 sm:text-sm">{item.name}</h4>
          <p className="text-[10px] text-slate-500 sm:text-[11px]">{item.subtitle}</p>
          <div className="mt-1 flex flex-wrap items-center gap-3 text-[10px] text-slate-400 sm:text-[11px]">
            <span>{item.mentees || item.members || 0} mentees</span>
            <span>{item.mentors || 0} mentors</span>
          </div>
        </div>
      </div>
      <button
        type="button"
        className={cx(
          "shrink-0 rounded-md px-4 py-2 text-[10px] font-semibold transition sm:text-[11px]",
          item.buttonLabel === "View chats"
            ? "bg-rose-600 text-white hover:bg-rose-700"
            : "border border-rose-300 text-rose-600 hover:bg-rose-50"
        )}
      >
        {item.buttonLabel || "View"}
      </button>
    </div>
  );
}

function JourneyHero({ journey }) {
  return (
    <div className="grid gap-4 rounded-2xl bg-rose-50 p-5 md:grid-cols-[minmax(0,1fr)_180px] md:items-center">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">{journey.title}</h3>
        <p className="mt-2 text-sm font-semibold text-rose-600">{journey.highlight}</p>
        <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">{journey.description}</p>
      </div>
      <div className="flex h-32 items-center justify-center rounded-2xl bg-white/70 text-rose-500">
        <FiTrendingUp className="h-16 w-16" />
      </div>
    </div>
  );
}

// ── EMPTY STATE (unchanged from Doc 4) ──
function EmptyDashboardView({ data, greeting, courseStats, meetings, joinedGroups }) {
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

// ── FIRST-TIME USER (from Doc 3) ──
function FirstTimeDashboardView({ data, greeting, meetings, joinedGroups }) {
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

// ── EXISTING USER (from Doc 3) ──
function ExistingDashboardView({ data, greeting, meetings, joinedGroups }) {
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

// ── DEFAULT EXPORT ──
export default function Dashboard() {
  const { user } = useUser();
  const [searchParams] = useSearchParams();

  const currentUser = useMemo(
    () => ({ ...fallbackUser, ...(user || {}) }),
    [user]
  );

  const courseStats  = readCourseStats();
  const meetings     = readMeetings();
  const joinedGroups = readJoinedGroups();

  const previewState = searchParams.get("state");

  const currentState = useMemo(() => {
    const derived = deriveDashboardState(currentUser);
    const preview = normalizeState(previewState);
    if (process.env.NODE_ENV === "development" && preview) return preview;
    return derived;
  }, [currentUser, previewState]);

  const data = dashboardPresets[currentState];

  const greeting =
    currentState === "existing"
      ? `Welcome Back! ${currentUser.name || "there"} 😇`
      : `Welcome! ${currentUser.name || "there"} 😇`;

  const bannerData = currentState === "empty"
    ? {
        ...data,
        banner: {
          ...data.banner,
          text: `Hey ${currentUser.name || "there"}! kindly complete your VMP profile`,
        },
      }
    : {
        ...data,
        banner: data.banner
          ? {
              ...data.banner,
              text: `Hey ${currentUser.name || "there"}! kindly complete your VMP profile`,
            }
          : undefined,
      };

  if (currentState === "empty") {
    return (
      <EmptyDashboardView
        data={bannerData}
        greeting={greeting}
        courseStats={courseStats}
        meetings={meetings}
        joinedGroups={joinedGroups}
      />
    );
  }

  if (currentState === "first-time") {
    return (
      <FirstTimeDashboardView
        data={bannerData}
        greeting={greeting}
        meetings={meetings}
        joinedGroups={joinedGroups}
      />
    );
  }

  return (
    <ExistingDashboardView
      data={data}
      greeting={greeting}
      meetings={meetings}
      joinedGroups={joinedGroups}
    />
  );
}