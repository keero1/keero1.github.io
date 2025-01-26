import React from "react";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

import useToggleTheme from "@/components/hooks/useTheme";

const Theme = () => {
  const { theme, toggleTheme, mounted } = useToggleTheme();

  if (!mounted) {
    return (
      <div className="w-6 h-6 bg-background rounded-full animate-pulse flex items-center justify-center"></div>
    );
  }

  return (
    <label className="cursor-pointer select-none hover:scale-110">
      <input
        id="theme-checkbox"
        type="checkbox"
        checked={theme === "dark"}
        onChange={toggleTheme}
        className="hidden"
      />
      {/* Dark Mode Icon */}
      {theme === "dark" ? (
        <MdOutlineDarkMode className="transition-opacity duration-300 h-6 w-6 fill-current" />
      ) : (
        <MdOutlineLightMode className="transition-opacity duration-300 h-6 w-6 fill-current" />
      )}
    </label>
  );
};

export default Theme;
