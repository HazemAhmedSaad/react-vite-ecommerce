import { createContext, useEffect, useState } from "react";

export const themeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const themeFromStorage = localStorage.getItem("theme");

    if (themeFromStorage === "dark" || themeFromStorage === "light") {
      return themeFromStorage;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    const html = document.documentElement;

    // شيل أي ثيم قديم
    html.classList.remove("dark", "light");

    // ضيف الثيم الجديد
    html.classList.add(theme);

    // animation class
    html.classList.add("theme-transition");

    const timeout = setTimeout(() => {
      html.classList.remove("theme-transition");
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
