import { createContext, useEffect, useState } from "react";

export const themeContext = createContext();

export function ThemeProvider({children}) {
  const [theme, setTheme] = useState(() => {
    const themeFromStorage = localStorage.getItem("theme");
    return themeFromStorage === "dark" || themeFromStorage === "light"
      ? themeFromStorage
      : window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
  });
    useEffect(() => {
      const body = document.body;
      body.className = `${theme} theme-transition`;
  
      const timeout = setTimeout(() => {
        body.classList.remove("theme-transition");
      }, 300);
  
      localStorage.setItem("theme", theme);
  
      return () => clearTimeout(timeout);
    }, [theme]);
  return (
    <themeContext.Provider value={{ theme, setTheme }}>
      {children}
    </themeContext.Provider>
  );
}
