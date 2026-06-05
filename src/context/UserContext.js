import { createContext, useState, useEffect, useContext } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // ── read on mount ──
    const saved = localStorage.getItem("vmpUser");
    if (saved) {
      try { setUser(JSON.parse(saved)); } catch {}
    }
  }, []);

  const saveUser = (userData) => {
    setUser(userData);
    localStorage.setItem("vmpUser", JSON.stringify(userData));
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("vmpUser");
  };

  return (
    <UserContext.Provider value={{ user, saveUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
}

// ── handy hook ──
export function useUser() {
  return useContext(UserContext);
}