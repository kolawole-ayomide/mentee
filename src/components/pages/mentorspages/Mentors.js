// src/components/pages/mentorspages/Mentors.js
import React, { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiLink2,
  FiMail,
  FiMessageSquare,
  FiSearch,
  FiStar,
  FiUser,
} from "react-icons/fi";

const TABS = [
  "All",
  "Recommended Mentors",
  "Skill Development",
  "Personal Development",
  "Career Development",
  "Professional Development",
];

const mentorBaseData = [
  {
    id: "daniel-francis",
    name: "Daniel Francis",
    role: "Head of marketing",
    expertise: "Skill Development",
    category: "Recommended Mentors",
    image: "/boss.png",
    detailImage: "/boss.png",
    available: true,
    email: "danielfrancis20@gmail.com",
    linkedin: "#",
    bio: "Daniel Francis is a dynamic marketing leader with a passion for driving brand excellence. She has successfully spearheaded numerous marketing campaigns for global brands and played a pivotal role in enhancing their market presence. Her creative flair, combined with strategic thinking, makes her a sought-after mentor in the marketing industry.",
    experience: "Over 15 years of experience in marketing strategy and brand management.",
    areas: ["Brand Strategy", "Market Research"],
    mentorshipApproach:
      "Daniel believes in a collaborative mentoring approach. He adapts his style to cater to the unique needs of each mentee, fostering creativity and strategic thinking.",
  },
  {
    id: "daniel-no-reviews",
    name: "Daniel Francis",
    role: "Head of marketing",
    expertise: "Skill Development",
    category: "Skill Development",
    image: "/daniel.png",
    detailImage: "/boss.png",
    available: false,
    email: "danielfrancis20@gmail.com",
    linkedin: "#",
    bio: "Daniel Francis is a dynamic marketing leader with a passion for driving brand excellence. She has successfully spearheaded numerous marketing campaigns for global brands and played a pivotal role in enhancing their market presence. Her creative flair, combined with strategic thinking, makes her a sought-after mentor in the marketing industry.",
    experience: "Over 15 years of experience in marketing strategy and brand management.",
    areas: ["Brand Strategy", "Market Research"],
    mentorshipApproach:
      "Daniel believes in a collaborative mentoring approach. He adapts his style to cater to the unique needs of each mentee, fostering creativity and strategic thinking.",
  },
  {
    id: "mentor-3",
    name: "Daniel Francis",
    role: "Head of marketing",
    expertise: "Skill Development",
    category: "Personal Development",
    image: "/daniel.png",
    detailImage: "/daniel.png",
    available: true,
    email: "danielfrancis20@gmail.com",
    linkedin: "#",
    bio: "Experienced mentor focused on career clarity and growth.",
    experience: "10+ years of leadership and brand experience.",
    areas: ["Leadership", "Communication"],
    mentorshipApproach:
      "Supportive and practical mentoring style for building confidence.",
  },
  {
    id: "mentor-4",
    name: "Daniel Francis",
    role: "Head of marketing",
    expertise: "Skill Development",
    category: "Career Development",
    image: "/boss.png",
    detailImage: "/boss.png",
    available: true,
    email: "danielfrancis20@gmail.com",
    linkedin: "#",
    bio: "Strong background in marketing strategy and positioning.",
    experience: "12+ years of strategy and market development.",
    areas: ["Growth", "Planning"],
    mentorshipApproach:
      "Structured mentoring with clear milestones and feedback.",
  },
  {
    id: "mentor-5",
    name: "Daniel Francis",
    role: "Head of marketing",
    expertise: "Skill Development",
    category: "Professional Development",
    image: "/boss.png",
    detailImage: "/boss.png",
    available: true,
    email: "danielfrancis20@gmail.com",
    linkedin: "#",
    bio: "Experienced in mentoring early career professionals.",
    experience: "14+ years across marketing and business development.",
    areas: ["Market Research", "Execution"],
    mentorshipApproach:
      "Practical sessions focused on real-world outcomes and clarity.",
  },
  {
    id: "mentor-6",
    name: "Daniel Francis",
    role: "Head of marketing",
    expertise: "Skill Development",
    category: "Recommended Mentors",
    image: "/daniel.png",
    detailImage: "/daniel.png",
    available: false,
    email: "danielfrancis20@gmail.com",
    linkedin: "#",
    bio: "Focused on helping mentees develop communication and leadership.",
    experience: "8+ years of mentoring and team leadership.",
    areas: ["Leadership", "Strategy"],
    mentorshipApproach:
      "Encouraging, reflective, and tailored to the mentee's pace.",
  },
  {
    id: "mentor-7",
    name: "Daniel Francis",
    role: "Head of marketing",
    expertise: "Skill Development",
    category: "Skill Development",
    image: "/daniel.png",
    detailImage: "/daniel.png",
    available: true,
    email: "danielfrancis20@gmail.com",
    linkedin: "#",
    bio: "Supports mentees with strategic planning and communication.",
    experience: "11+ years in brand and product marketing.",
    areas: ["Brand Strategy", "Storytelling"],
    mentorshipApproach:
      "Blends accountability with supportive guidance and insight.",
  },
  {
    id: "mentor-8",
    name: "Daniel Francis",
    role: "Head of marketing",
    expertise: "Skill Development",
    category: "Personal Development",
    image: "/daniel.png",
    detailImage: "/daniel.png",
    available: false,
    email: "danielfrancis20@gmail.com",
    linkedin: "#",
    bio: "Supports mentees who want clarity and confidence in their path.",
    experience: "9+ years in coaching and communication growth.",
    areas: ["Career Growth", "Confidence"],
    mentorshipApproach:
      "Gentle but focused style that helps mentees take action.",
  },
];

const initialReviewsByMentor = {
  "daniel-francis": [
    {
      id: 1,
      name: "Anonymous",
      role: "Mentee",
      message:
        "Jane's mentoring has been instrumental in my career growth. Her insights and guidance have helped me achieve my marketing goals.",
      date: "13 August, 2023",
    },
    {
      id: 2,
      name: "Juliana Abel",
      role: "Mentee",
      message:
        "Jane's mentoring has been instrumental in my career growth. Her insights and guidance have helped me achieve my marketing goals.",
      date: "13 August, 2023",
    },
    {
      id: 3,
      name: "Juliana Abel",
      role: "Mentee",
      message:
        "Jane's mentoring has been instrumental in my career growth. Her insights and guidance have helped me achieve my marketing goals.",
      date: "13 August, 2023",
    },
  ],
  "daniel-no-reviews": [],
  "mentor-3": [],
  "mentor-4": [],
  "mentor-5": [],
  "mentor-6": [],
  "mentor-7": [],
  "mentor-8": [],
};

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function normalizeMode(value) {
  return value === "empty" ? "empty" : "live";
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

function SearchInput({ value, onChange }) {
  return (
    <div className="relative w-full max-w-sm">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search"
        className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-4 pr-10 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#312F61]"
      />
      <FiSearch className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
    </div>
  );
}

function FilterTabs({ activeTab, onTabChange }) {
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-3 border-b border-slate-100 pb-4">
      {TABS.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onTabChange(tab)}
          className={cx(
            "text-xs font-medium transition",
            activeTab === tab
              ? "text-amber-500"
              : "text-slate-600 hover:text-slate-900"
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

function MentorImage({
  mentor,
  className = "",
  rounded = "rounded-xl",
  srcOverride = "",
}) {
  const imageSrc = srcOverride || mentor?.detailImage || mentor?.image;

  if (imageSrc) {
    return (
      <img
        src={imageSrc}
        alt={mentor.name}
        className={cx("object-cover", rounded, className)}
      />
    );
  }

  return (
    <div
      className={cx(
        "flex items-center justify-center bg-gradient-to-br from-slate-200 via-slate-100 to-slate-300 text-xl font-semibold text-slate-600",
        rounded,
        className
      )}
    >
      {getInitials(mentor.name)}
    </div>
  );
}

function PageHeader({ title, subtitle, rightContent }) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
        {subtitle ? (
          <p className="mt-1 text-xs text-slate-500 sm:text-sm">{subtitle}</p>
        ) : null}
      </div>
      {rightContent}
    </div>
  );
}

function EmptyStateView() {
  return (
    <div className="space-y-6">
      <PageHeader title="Mentors" />
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <img
          src="/Illustration.svg"
          alt="No mentors"
          className="h-40 w-auto object-contain sm:h-48"
        />
        <h2 className="mt-4 text-sm font-medium text-slate-900">No mentors</h2>
        <p className="mt-2 max-w-md text-xs leading-6 text-slate-500 sm:text-sm">
          It looks like there are no mentors available at the moment. We're
          constantly expanding our network, so keep checking back for new
          mentorship opportunities.
        </p>
      </div>
    </div>
  );
}

function MentorCard({ mentor, isRequested, onToggleRequest }) {
  const handleCardClick = () => {
    if (!mentor.available) {
      return;
    }
    onToggleRequest(mentor.id);
  };

  return (
    <article
      onClick={handleCardClick}
      className={cx(
        "rounded-2xl border bg-white p-3 transition cursor-pointer",
        isRequested
          ? "border-rose-400 shadow-sm"
          : "border-slate-200 hover:border-slate-300",
        !mentor.available && "opacity-70 cursor-not-allowed"
      )}
    >
      <div className="relative overflow-hidden rounded-xl">
        <MentorImage
          mentor={mentor}
          srcOverride={mentor.image}
          className="h-28 w-full"
        />
        {!mentor.available ? (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/30">
            <span className="text-sm font-medium tracking-wide text-white">
              [ Unavailable ]
            </span>
          </div>
        ) : null}
      </div>

      <div className="mt-3 space-y-1">
        <h3 className="text-sm font-semibold text-slate-900">{mentor.name}</h3>
        <p className="text-xs text-slate-600">Role: {mentor.role}</p>
        <p className="text-xs text-slate-600">Expertise: {mentor.expertise}</p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <Link
          to={`/mentors?id=${mentor.id}`}
          onClick={(event) => event.stopPropagation()}
          className={cx(
            "inline-flex items-center justify-center rounded-md px-2 py-2 text-[11px] font-semibold transition",
            mentor.available
              ? "border border-rose-200 text-rose-600 hover:bg-rose-50"
              : "cursor-not-allowed border border-slate-200 bg-slate-100 text-slate-400 pointer-events-none"
          )}
        >
          View Profile
        </Link>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            if (!mentor.available) {
              return;
            }
            onToggleRequest(mentor.id);
          }}
          disabled={!mentor.available}
          className={cx(
            "inline-flex items-center justify-center rounded-md px-2 py-2 text-[11px] font-semibold transition",
            mentor.available
              ? "bg-rose-600 text-white hover:bg-rose-700"
              : "cursor-not-allowed bg-slate-200 text-slate-400"
          )}
        >
          {isRequested ? "Revoke Request" : "Send Request"}
        </button>
      </div>
    </article>
  );
}

function BrowseView({
  mentors,
  requestedMentorIds,
  onToggleRequest,
  search,
  setSearch,
  activeTab,
  setActiveTab,
}) {
  const filteredMentors = useMemo(() => {
    return mentors.filter((mentor) => {
      const matchesTab =
        activeTab === "All" ||
        mentor.category === activeTab ||
        mentor.expertise === activeTab;

      const keyword = search.trim().toLowerCase();
      const matchesSearch =
        keyword.length === 0 ||
        mentor.name.toLowerCase().includes(keyword) ||
        mentor.role.toLowerCase().includes(keyword) ||
        mentor.expertise.toLowerCase().includes(keyword);

      return matchesTab && matchesSearch;
    });
  }, [activeTab, mentors, search]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Mentors"
        subtitle="Your Journey, Your Choice: Discover Your Mentors"
        rightContent={
          <SearchInput
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        }
      />

      <FilterTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {filteredMentors.length === 0 ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 text-center">
          <FiSearch className="h-8 w-8 text-slate-400" />
          <p className="mt-3 text-sm font-medium text-slate-900">
            No mentors found
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Try another keyword or switch category.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {filteredMentors.map((mentor) => (
            <MentorCard
              key={mentor.id}
              mentor={mentor}
              isRequested={requestedMentorIds.has(mentor.id)}
              onToggleRequest={onToggleRequest}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function StarRating({ count }) {
  const safeCount = Number(count || 0);

  return (
    <div className="mt-3 flex items-center gap-1 text-amber-400">
      {[1, 2, 3, 4, 5].map((value) => (
        <FiStar
          key={value}
          className={cx(
            "h-3.5 w-3.5",
            value <= Math.round(safeCount) ? "fill-current" : ""
          )}
        />
      ))}
      <span className="ml-1 text-[11px] text-slate-500">
        ({safeCount.toFixed(1)})
      </span>
    </div>
  );
}

function DetailSection({ title, children, accent = "" }) {
  return (
    <section className="space-y-2">
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      {accent ? (
        <div className="border-l-2 border-l-amber-400 pl-3 text-sm text-slate-500">
          {children}
        </div>
      ) : (
        <div className="text-sm leading-7 text-slate-500">{children}</div>
      )}
    </section>
  );
}

function ReviewCard({ review }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500">
          <FiUser className="h-4 w-4" />
        </div>

        <div className="min-w-0 flex-1">
          <h4 className="text-sm font-semibold text-slate-900">{review.name}</h4>
          <p className="text-[11px] text-slate-500">{review.role}</p>
          <p className="mt-3 text-xs leading-6 text-slate-500">{review.message}</p>
          <p className="mt-4 text-right text-[11px] text-slate-500">{review.date}</p>
        </div>
      </div>
    </article>
  );
}

function NoReviewsCard() {
  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center px-6 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-rose-50 text-rose-600">
        <FiMessageSquare className="h-9 w-9" />
      </div>

      <div className="mt-5 flex items-center gap-1 text-rose-500">
        {[1, 2, 3, 4, 5].map((value) => (
          <FiStar key={value} className="h-3.5 w-3.5" />
        ))}
      </div>

      <p className="mt-4 text-sm font-medium text-slate-900">No reviews yet</p>
    </div>
  );
}

function ReviewForm({ onAddReview }) {
  const [reviewerName, setReviewerName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedName = reviewerName.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedMessage) {
      return;
    }

    const review = {
      id: Date.now(),
      name: trimmedName,
      role: "Mentee",
      message: trimmedMessage,
      date: new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    };

    onAddReview(review);
    setReviewerName("");
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4">
      <h3 className="text-sm font-semibold text-slate-900">Leave a review</h3>
      <input
        type="text"
        value={reviewerName}
        onChange={(event) => setReviewerName(event.target.value)}
        placeholder="Your name"
        className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#312F61]"
      />
      <textarea
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Write your review"
        rows={4}
        className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#312F61]"
      />
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-md bg-rose-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-rose-700"
      >
        Submit Review
      </button>
    </form>
  );
}

function DetailView({
  mentor,
  reviewCount,
  reviews,
  isRequested,
  onToggleRequest,
  onAddReview,
}) {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_320px] xl:divide-x xl:divide-slate-200">
        <div className="space-y-6 xl:pr-8">
          <button
            type="button"
            onClick={() => navigate("/mentors")}
            className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-50"
            aria-label="Back to mentors"
          >
            <FiArrowLeft className="h-3.5 w-3.5" />
          </button>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <MentorImage
              mentor={mentor}
              srcOverride={mentor.detailImage}
              className="h-24 w-24 shrink-0 rounded-full border border-slate-200 shadow-sm"
              rounded="rounded-full"
            />

            <div className="min-w-0">
              <h1 className="text-lg font-semibold text-slate-900">{mentor.name}</h1>
              <p className="text-sm text-slate-600">{mentor.role}</p>

              <div className="mt-2 space-y-1 text-xs text-slate-600">
                <p className="flex flex-wrap items-center gap-2">
                  <FiMail className="h-3.5 w-3.5 text-slate-400" />
                  <span>Email:</span>
                  <a
                    href={`mailto:${mentor.email}`}
                    className="text-[#312F61] underline"
                  >
                    {mentor.email}
                  </a>
                </p>

                <p className="flex flex-wrap items-center gap-2">
                  <FiLink2 className="h-3.5 w-3.5 text-slate-400" />
                  <span>LinkedIn:</span>
                  <a
                    href={mentor.linkedin}
                    className="text-[#312F61] underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    My profile
                  </a>
                </p>
              </div>

              <StarRating count={reviewCount > 0 ? 4.5 : 0} />
            </div>
          </div>

          <DetailSection title="Bio/Summary">{mentor.bio}</DetailSection>
          <DetailSection title="Experience">{mentor.experience}</DetailSection>

          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-900">Areas of Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {mentor.areas.map((area) => (
                <span
                  key={area}
                  className="rounded-md bg-rose-50 px-3 py-2 text-[11px] font-medium text-rose-600"
                >
                  {area}
                </span>
              ))}
            </div>
          </section>

          <DetailSection title="Mentorship Approach" accent="amber">
            {mentor.mentorshipApproach}
          </DetailSection>

          <section className="space-y-3">
            <div className="border-l-2 border-l-rose-500 pl-3">
              <h3 className="text-sm font-semibold text-slate-900">
                Connect with {mentor.name.split(" ")[0]}
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-500">
                Ready to learn from {mentor.name.split(" ")[0]}'s extensive marketing experience? Click the button below to connect and kickstart your mentoring journey.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onToggleRequest(mentor.id)}
              disabled={!mentor.available}
              className={cx(
                "inline-flex items-center justify-center rounded-md px-4 py-2.5 text-xs font-semibold transition",
                mentor.available
                  ? "bg-rose-600 text-white hover:bg-rose-700"
                  : "cursor-not-allowed bg-slate-200 text-slate-400"
              )}
            >
              {isRequested ? "Revoke Request" : "Send Request"}
            </button>
          </section>
        </div>

        <aside className="space-y-4 xl:pl-8">
          <h2 className="text-sm font-semibold text-slate-900">
            Reviews ({reviewCount})
          </h2>

          {reviewCount === 0 ? <NoReviewsCard /> : null}

          {reviewCount > 0 ? (
            <div className="space-y-3">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          ) : null}

          <ReviewForm onAddReview={onAddReview} />
        </aside>
      </div>
    </div>
  );
}

export default function Mentors() {
  const [searchParams] = useSearchParams();
  const mode = normalizeMode(searchParams.get("mode"));
  const mentorId = searchParams.get("id");

  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [requestedMentorIds, setRequestedMentorIds] = useState(new Set());
  const [reviewsByMentor, setReviewsByMentor] = useState(initialReviewsByMentor);

  const mentors = mentorBaseData;

  const selectedMentor = useMemo(() => {
    if (!mentorId) {
      return null;
    }

    return (
      mentorBaseData.find((mentor) => mentor.id === mentorId) || null
    );
  }, [mentorId]);

  const toggleRequest = (id) => {
    setRequestedMentorIds((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const addReview = (id, review) => {
    setReviewsByMentor((current) => ({
      ...current,
      [id]: [...(current[id] || []), review],
    }));
  };

  if (mode === "empty") {
    return <EmptyStateView />;
  }

  if (selectedMentor) {
    const reviews = reviewsByMentor[selectedMentor.id] || [];

    return (
      <DetailView
        mentor={selectedMentor}
        reviewCount={reviews.length}
        reviews={reviews}
        isRequested={requestedMentorIds.has(selectedMentor.id)}
        onToggleRequest={toggleRequest}
        onAddReview={(review) => addReview(selectedMentor.id, review)}
      />
    );
  }

  return (
    <BrowseView
      mentors={mentors}
      requestedMentorIds={requestedMentorIds}
      onToggleRequest={toggleRequest}
      search={search}
      setSearch={setSearch}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    />
  );
}
export { MentorCard };