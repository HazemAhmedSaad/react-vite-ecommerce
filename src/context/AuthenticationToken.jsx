import { createContext, useContext, useState } from "react";

export const autContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(()=>localStorage.getItem("token") || null);

  return (
    <autContext.Provider value={{ token, setToken }}>
      {children}
    </autContext.Provider>
  );
}
export function useAuth() {
  return useContext(autContext);
}