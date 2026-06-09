import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../ThemeProvider";
import { Switch } from "@/components/ui/switch";

export function ThemeToggle({ className }) {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={`flex items-center justify-center ${className || ''}`}>
      <Switch
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        icon={isDark ? <Moon size={12} className="text-primary" /> : <Sun size={12} className="text-orange-500" />}
        title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      />
    </div>
  );
}
