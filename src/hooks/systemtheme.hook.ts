import { useState, useEffect } from "react";

const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

export function useSystemTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(
    darkModeMediaQuery.matches ? "dark" : "light"
  );

  useEffect(() => {
    darkModeMediaQuery.addEventListener("change", (e) => {
      const isDarked = e.matches;

      setTheme(isDarked ? "dark" : "light");
    });
  }, []);

  return theme;
}
