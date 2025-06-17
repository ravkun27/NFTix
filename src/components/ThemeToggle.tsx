import { useContext } from "react";
import { Sun, Moon } from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";

const ThemeToggle = () => {
  const ctx = useContext(ThemeContext);

  if (!ctx) throw new Error("ThemeToggle must be used within ThemeProvider");

  return (
    <button onClick={ctx.toggleTheme} className="text-accent p-2">
      {ctx.theme === "dark" ? <Sun /> : <Moon />}
    </button>
  );
};

export default ThemeToggle;
