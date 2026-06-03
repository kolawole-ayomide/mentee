// import { createContext, useState, useEffect } from "react";

// export const UserContext = createContext();

// export function UserProvider({ children }) {
//   const [user, setUser] = useState({ name: "", email: "", id: "" });

//   useEffect(() => {
//     const saved = localStorage.getItem("loggedInUser");
//     if (saved) setUser(JSON.parse(saved));
//   }, []);

//   const saveUser = (userData) => {
//     setUser(userData);
//     localStorage.setItem("loggedInUser", JSON.stringify(userData));
//   };

//   return (
//     <UserContext.Provider value={{ user, saveUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// }


import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({ name: "", email: "", id: "" });

  useEffect(() => {
    const saved = localStorage.getItem("vmpUser");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const saveUser = (userData) => {
    setUser(userData);
    localStorage.setItem("vmpUser", JSON.stringify(userData));
  };

  return (
    <UserContext.Provider value={{ user, saveUser }}>
      {children}
    </UserContext.Provider>
  );
}