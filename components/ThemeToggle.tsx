// components/ThemeToggle.tsx
"use client";

import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = (mounted ? resolvedTheme : theme) === "dark";

  if (!mounted) {
    return (
      <button
        type="button"
        className="focus-ring glass hover-lift hover-glow inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200 ease-out"
        aria-label="Toggle theme"
        disabled
      >
        <span className="sr-only">Toggle light/dark theme</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="focus-ring glass hover-lift hover-glow inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200 ease-out"
      aria-label="Toggle theme"
    >
      <span className="sr-only">Toggle light/dark theme</span>
      <div className="relative">
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.span
              key="moon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              aria-hidden="true"
            >
              <Moon className="h-5 w-5" />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              aria-hidden="true"
            >
              <Sun className="h-5 w-5" />
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </button>
  );
}
