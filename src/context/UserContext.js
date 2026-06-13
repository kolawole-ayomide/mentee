import { createContext, useContext, useState } from "react";

export const UserContext = createContext();

// ── CHANGED: initialise directly from localStorage so first render already has the name ──
// ── No more useEffect delay that caused "Welcome there" on first load ──
function loadUserFromStorage() {
  try {
    const saved = localStorage.getItem("vmpUser");
    return saved ? JSON.parse(saved) : { name: "", email: "", id: "" };
  } catch {
    return { name: "", email: "", id: "" };
  }
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => loadUserFromStorage());

  const saveUser = (userData) => {
    setUser(userData);
    localStorage.setItem("vmpUser", JSON.stringify(userData));
  };

  // ── CHANGED: clearUser ONLY resets in-memory state, never touches localStorage ──
  // ── localStorage must stay intact so user can log back in with their details ──
  const clearUser = () => {
    setUser({ name: "", email: "", id: "" });
  };

  return (
    <UserContext.Provider value={{ user, saveUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
































// import { createContext, useState, useEffect, useContext } from "react";

// export const UserContext = createContext();

// export function UserProvider({ children }) {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // ── read on mount ──
//     const saved = localStorage.getItem("vmpUser");
//     if (saved) {
//       try { setUser(JSON.parse(saved)); } catch {}
//     }
//   }, []);

//   const saveUser = (userData) => {
//     setUser(userData);
//     localStorage.setItem("vmpUser", JSON.stringify(userData));
//   };

//   const clearUser = () => {
//     setUser(null);
//     localStorage.removeItem("vmpUser");
//   };

//   return (
//     <UserContext.Provider value={{ user, saveUser, clearUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// }

// // ── handy hook ──
// export function useUser() {
//   return useContext(UserContext);
// }