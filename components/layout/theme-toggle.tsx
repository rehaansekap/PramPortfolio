"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-8 h-8 rounded border border-border-subtle bg-bg-elevated flex items-center justify-center opacity-50" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      id="theme-toggle-btn"
      aria-label={isDark ? "Ganti ke mode terang" : "Ganti ke mode gelap"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-8 h-8 rounded border border-border-subtle hover:border-border-hover bg-bg-elevated hover:bg-bg-elevated/80 flex items-center justify-center text-text-primary hover:text-accent transition-all duration-200 focus:outline-none shadow-xs"
    >
      {isDark ? (
        <Sun className="w-4 h-4 transition-transform duration-200 hover:rotate-45 stroke-[2.2]" />
      ) : (
        <Moon className="w-4 h-4 transition-transform duration-200 hover:-rotate-12 stroke-[2.2]" />
      )}
    </button>
  );
}
