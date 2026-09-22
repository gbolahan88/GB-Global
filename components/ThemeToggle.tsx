"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "gb-global-theme";

function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
    const initialTheme = savedTheme === "light" || savedTheme === "dark"
      ? savedTheme
      : getSystemTheme();

    // The startup script sets the DOM before hydration; this syncs the button label afterward.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(initialTheme);
    document.documentElement.dataset.theme = initialTheme;

    if (!savedTheme) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleSystemThemeChange = (event: MediaQueryListEvent) => {
        const systemTheme = event.matches ? "dark" : "light";
        setTheme(systemTheme);
        document.documentElement.dataset.theme = systemTheme;
      };

      mediaQuery.addEventListener("change", handleSystemThemeChange);
      return () => mediaQuery.removeEventListener("change", handleSystemThemeChange);
    }
  }, []);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
    document.documentElement.dataset.theme = nextTheme;
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="theme-toggle flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-base text-white/75 transition hover:bg-white/10 hover:text-white"
    >
      <span aria-hidden="true">{isDark ? "☀" : "☾"}</span>
    </button>
  );
}
