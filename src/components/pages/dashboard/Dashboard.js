// src/components/pages/dashboard/Dashboard.js
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiCalendar,
  FiMessageSquare,
  FiUsers,
} from "react-icons/fi";

const dashboardPresets = {
  empty: {
    banner: {
      text: "Hey! kindly complete your VMP profile",
      actionLabel: "Update Profile",
      actionTo: "/profile",
    },
    subtitle: "Embark on a Journey of Growth and Achievement with Us",
    stats: [
      { value: "0%", progress: 0 },
      { value: "0%", progress: 0 },
    ],
    courseSummary: {
      total: 0,
      ongoing: 0,
      completed: 0,
    },
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

function readStoredUser() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem("vmpUser");
    if (raw) return JSON.parse(raw);
    const legacy = window.localStorage.getItem("dashboardUser");
    return legacy ? JSON.parse(legacy) : null;
  } catch {
    return null;
  }
}

function readCourseStats() {
  try {
    const completedIds = JSON.parse(
      localStorage.getItem("completedCourses") || "[]"
    );
    return {
      total: 0,
      ongoing: 0,
      completed: completedIds.length,
    };
  } catch {
    return { total: 0, ongoing: 0, completed: 0 };
  }
}

function SectionCard({
  title,
  subtitle,
  actionLabel,
  actionTo,
  actionTextOnly = false,
  className = "",
  children,
}) {
  return (
    <section
      className={cx(
        "rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5",
        className
      )}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
            {title}
          </h3>
          {subtitle ? (
            <p className="mt-1 text-[11px] leading-5 text-slate-500 sm:text-xs">
              {subtitle}
            </p>
          ) : null}
        </div>

        {actionLabel && actionTo ? (
          actionTextOnly ? (
            <Link
              to={actionTo}
              className="shrink-0 text-[11px] font-semibold text-rose-600 transition hover:text-rose-700 sm:text-xs"
            >
              {actionLabel}
            </Link>
          ) : (
            <Link
              to={actionTo}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              {actionLabel}
              <FiArrowRight className="h-3.5 w-3.5" />
            </Link>
          )
        ) : null}
      </div>

      {children}
    </section>
  );
}

function ProfileBanner({ text, actionLabel, actionTo }) {
  return (
    <div className="rounded-xl border border-amber-100 bg-amber-50 px-4 py-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[11px] font-medium text-amber-900 sm:text-xs">
          {text}
        </p>
        <Link
          to={actionTo}
          className="text-[11px] font-semibold text-amber-900 underline-offset-2 transition hover:underline sm:text-xs"
        >
          {actionLabel}
        </Link>
      </div>
    </div>
  );
}

function ProgressSummary({ stats, courseSummary }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="space-y-3">
        {stats.map((item, i) => (
          <div key={i}>
            <div className="mb-1 flex items-center justify-between text-[10px] text-slate-400 sm:text-[11px]">
              <span>{item.value} Progress</span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-100">
              <div
                className="h-1.5 rounded-full bg-rose-400 transition-all"
                style={{ width: `${item.progress}%` }}
              />
            </div>
          </div>
        ))}

        <div className="flex flex-wrap items-center gap-4 pt-1 text-[10px] text-slate-500 sm:text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-sm border border-rose-300" />
            <Link to="/courses" className="hover:text-rose-600 transition">
              {courseSummary.total} Total Courses
            </Link>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-sm border border-amber-300" />
            <Link to="/courses" className="hover:text-rose-600 transition">
              {courseSummary.ongoing} Ongoing course
            </Link>
          </div>
          <div className="flex items-center gap-1.5">
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

function EmptyIllustration({
  icon: Icon,
  title,
  description,
  imageSrc,
  imageAlt,
  minHeight = "min-h-[170px]",
}) {
  return (
    <div
      className={cx(
        "flex flex-col items-center justify-center rounded-2xl bg-slate-50 px-6 py-8 text-center",
        minHeight
      )}
    >
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={imageAlt || title}
          className="mb-4 h-24 w-auto object-contain sm:h-28"
        />
      ) : (
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
          <Icon className="h-8 w-8" />
        </div>
      )}
      <h4 className="text-sm font-medium text-slate-900">{title}</h4>
      {description ? (
        <p className="mt-2 max-w-xs text-[11px] leading-5 text-slate-500 sm:text-xs">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function EmptyDashboardView({ data, greeting, courseStats }) {
  return (
    <div className="space-y-4 sm:space-y-5">
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_300px] xl:items-start">
        <div className="space-y-4">
          <ProfileBanner
            text={data.banner.text}
            actionLabel={data.banner.actionLabel}
            actionTo={data.banner.actionTo}
          />
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
              {greeting}
            </h2>
            <p className="mt-1 text-sm text-slate-500">{data.subtitle}</p>
          </div>
        </div>

        <ProgressSummary
          stats={data.stats}
          courseSummary={courseStats}
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.7fr)_300px]">
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
          <SectionCard
            title={data.meetings.title}
            actionLabel="View all"
            actionTo="/meetings"
            actionTextOnly
          >
            <EmptyIllustration
              icon={FiCalendar}
              title={data.meetings.emptyTitle}
              description={data.meetings.emptyDescription}
              minHeight="min-h-[170px]"
            />
          </SectionCard>

          <SectionCard
            title={data.discussionGroups.title}
            actionLabel="View all"
            actionTo="/chat"
            actionTextOnly
          >
            <EmptyIllustration
              icon={FiMessageSquare}
              title={data.discussionGroups.emptyTitle}
              description={data.discussionGroups.emptyDescription}
              minHeight="min-h-[250px]"
            />
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard({ user }) {
  const storedUser = useMemo(() => readStoredUser(), []);
  const courseStats = useMemo(() => readCourseStats(), []);

  const currentUser = useMemo(
    () => ({
      ...fallbackUser,
      ...(storedUser || {}),
      ...(user || {}),
    }),
    [storedUser, user]
  );
  

  const data = dashboardPresets["empty"];

  const bannerData = {
    ...data,
    banner: {
      ...data.banner,
      text: `Hey ${currentUser.name || "there"}! kindly complete your VMP profile`,
    },
  };

  const greeting = `Welcome! ${currentUser.name} 😇`;

  return (
    <EmptyDashboardView
      data={bannerData}
      greeting={greeting}
      courseStats={courseStats}
    />
  );
}