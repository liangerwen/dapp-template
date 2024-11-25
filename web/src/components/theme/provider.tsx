"use client";

import { THEME_KEY, ThemeType } from "./constants";
import { useCookie } from "@/hooks/use-cookie";
import { createContext, ReactNode, useContext, useEffect } from "react";

interface ThemeProviderProps {
  children?: ReactNode;
}

const ThemeContext = createContext<{
  theme?: ThemeType;
  setTheme?: (theme: ThemeType) => void;
}>({});

export const useTheme = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggle = () => {
    setTheme?.(theme === ThemeType.LIGHT ? ThemeType.DARK : ThemeType.LIGHT);
  };

  return {
    theme,
    setTheme,
    toggle,
  };
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useCookie(THEME_KEY, ThemeType.LIGHT);

  useEffect(() => {
    const html = document.querySelector("html");
    if (html) {
      html.classList[theme === ThemeType.DARK ? "add" : "remove"](
        ThemeType.DARK
      );
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
