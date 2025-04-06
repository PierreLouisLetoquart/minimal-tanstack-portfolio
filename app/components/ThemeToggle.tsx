import { createServerFn } from "@tanstack/react-start";
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { getCookie, setCookie } from "vinxi/http";
import { z } from "zod";
import { create } from "zustand";

const themeModeSchema = z.enum(["light", "dark", "auto"]);
const prefersModeSchema = z.enum(["light", "dark"]);

type ThemeMode = z.infer<typeof themeModeSchema>;
type PrefersMode = z.infer<typeof prefersModeSchema>;

interface ThemeStore {
  mode: ThemeMode;
  prefers: PrefersMode;
  toggleMode: () => void;
  setPrefers: (prefers: PrefersMode) => void;
}

const updateThemeCookie = createServerFn({ method: "POST" })
  .validator(themeModeSchema)
  .handler((ctx) => {
    setCookie("theme", ctx.data, {
      httpOnly: false,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 365 * 10,
    });
  });

export const getThemeCookie = createServerFn().handler(() => {
  return (
    themeModeSchema.catch("auto").parse(getCookie("theme") ?? "null") || "auto"
  );
});

export const useThemeStore = create<ThemeStore>((set, get) => ({
  mode: "auto",
  prefers: (() => {
    if (typeof document !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }

    return "light";
  })(),
  toggleMode: () =>
    set((s) => {
      const newMode =
        s.mode === "auto" ? "light" : s.mode === "light" ? "dark" : "auto";

      updateThemeClass(newMode, s.prefers);
      updateThemeCookie({
        data: newMode,
      });

      return {
        mode: newMode,
      };
    }),
  setPrefers: (prefers) => {
    set({ prefers });
    updateThemeClass(get().mode, prefers);
  },
}));

if (typeof document !== "undefined") {
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (event) => {
      if (useThemeStore.getState().mode === "auto") {
      }
      useThemeStore.getState().setPrefers(event.matches ? "dark" : "light");
    });
}

// Helper to update <body> class
function updateThemeClass(mode: ThemeMode, prefers: PrefersMode) {
  document.documentElement.classList.remove("dark");
  if (mode === "dark" || (mode === "auto" && prefers === "dark")) {
    document.documentElement.classList.add("dark");
  }
}

export function ThemeToggle() {
  const mode = useThemeStore((s) => s.mode);
  const toggleMode = useThemeStore((s) => s.toggleMode);

  const handleToggleMode = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    toggleMode();
  };

  return (
    <button
      className="font-light hover:underline hover:underline-offset-4 transition-all"
      onClick={handleToggleMode}
    >
      theme : {mode}
    </button>
  );
}
