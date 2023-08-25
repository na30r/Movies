import React, { createContext, useState } from "react";

type theme = "light" | "dark";
export const ThemeContext = createContext<{
  theme: theme;
  changeTheme: () => void;
}>({
  theme: "light",
  changeTheme: () => {},
});

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<theme>("light");

  const changeTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const value = { theme, changeTheme };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
