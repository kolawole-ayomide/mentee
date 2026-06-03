// export const C = {
// red:   "#CF173C",
// navy:  "#312F61",
// dark:  "#1B1A23",
// grey:  "#616E7C",
// redBg: "#FFEDED",
// white: "#FFFFFF",
// };

// export const INITIAL_USER = {
// firstName:    "Grace",
// lastName:     "Femi",
// username:     "NIL",
// phone:        "09023437489",
// workEmail:    "gracefemi1230@ekedc.io",
// staffId:      "Grace12D890",
// designation:  "Personal Assistant",
// bio:          "A driven and resourceful personal assistant with a passion for organization and efficiency. With an extensive background in managing schedules, travel itineraries, and administrative tasks...",
// avatar:       "/user.png",
// areasOfImprovement: ["Skill Development", "Personal Development"],
// };

// export const IMPROVEMENT_OPTIONS = [
// { label: "Skill Development",    emoji: "🛠️" },
// { label: "Personal Development", emoji: "🌱" },
// { label: "Career Development",   emoji: "⭐" },
// { label: "Professional Development", emoji: "💼" },
// ];

export const C = {
  red:   "#CF173C",
  navy:  "#312F61",
  dark:  "#1B1A23",
  grey:  "#616E7C",
  redBg: "#FFEDED",
  white: "#FFFFFF",
};

// ── CHANGED: reads real user name from localStorage instead of hardcoding Grace Femi ──
function getStoredUser() {
  try {
    const raw = localStorage.getItem("vmpUser");
    const parsed = raw ? JSON.parse(raw) : null;
    if (parsed?.name) {
      const parts = parsed.name.trim().split(" ");
      return {
        firstName: parts[0] || "User",
        lastName: parts.slice(1).join(" ") || "",
      };
    }
  } catch {
    // fall through
  }
  return { firstName: "User", lastName: "" };
}

const storedName = getStoredUser();

export const INITIAL_USER = {
  firstName:    storedName.firstName,
  lastName:     storedName.lastName,
  username:     "NIL",
  phone:        "09023437489",
  workEmail:    "user@ekedc.io",
  staffId:      "Grace12D890",
  designation:  "Personal Assistant",
  bio:          "A driven and resourceful personal assistant with a passion for organization and efficiency. With an extensive background in managing schedules, travel itineraries, and administrative tasks...",
  avatar:       "/user.png",
  areasOfImprovement: ["Skill Development", "Personal Development"],
};

export const IMPROVEMENT_OPTIONS = [
  { label: "Skill Development",        emoji: "🛠️" },
  { label: "Personal Development",     emoji: "🌱" },
  { label: "Career Development",       emoji: "⭐" },
  { label: "Professional Development", emoji: "💼" },
];