export const C = {
  red:   "#CF173C",
  navy:  "#312F61",
  dark:  "#1B1A23",
  grey:  "#616E7C",
  redBg: "#FFEDED",
  white: "#FFFFFF",
};

function getStoredUser() {
  try {
    const raw = localStorage.getItem("vmpUser");
    const parsed = raw ? JSON.parse(raw) : null;
    if (parsed) {
      const parts = (parsed.name || "").trim().split(" ");
      return {
        firstName:          parts[0] || "",
        lastName:           parts.slice(1).join(" ") || "",
        workEmail:          parsed.email              || "",
        staffId:            parsed.staffId            || "",
        designation:        parsed.designation        || "",
        phone:              parsed.phone              || "",
        bio:                parsed.bio                || "",
        avatar:             parsed.avatar             || null,
        areasOfImprovement: parsed.areasOfImprovement || [],
      };
    }
  } catch {
    // fall through
  }
  return {
    firstName: "", lastName: "", workEmail: "",
    staffId: "", designation: "", phone: "",
    bio: "", avatar: null, areasOfImprovement: [],
  };
}

const storedUser = getStoredUser();

export const INITIAL_USER = {
  firstName:          storedUser.firstName,
  lastName:           storedUser.lastName,
  username:           "NIL",
  phone:              storedUser.phone,
  workEmail:          storedUser.workEmail,
  staffId:            storedUser.staffId,
  designation:        storedUser.designation,
  bio:                storedUser.bio,
  avatar:             storedUser.avatar,
  areasOfImprovement: storedUser.areasOfImprovement,
};

export const IMPROVEMENT_OPTIONS = [
  { label: "Skill Development",        emoji: "🛠️" },
  { label: "Personal Development",     emoji: "🌱" },
  { label: "Career Development",       emoji: "⭐" },
  { label: "Professional Development", emoji: "💼" },
];