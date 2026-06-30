"use client";

import { createContext, useContext, useState } from "react";
import { Settings } from "@/types";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const defaultSettings: Settings = {
  workDuration: 1500, // 25 minutes
  shortBreak: 300, // 5 minutes
  longBreak: 600, // 10 minutes
  breakAfterSessionCount: 4,
  displayMode: "dark",
};

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
  isLoaded: boolean;
}

const SettingsContext = createContext<SettingsContextType>({
  settings: defaultSettings,
  updateSettings: () => {},
  isLoaded: false,
});

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  // const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [settings, setSettings, isLoaded] = useLocalStorage<Settings>(
    "pomodoro-settings",
    defaultSettings
  );

  const updateSettings = (newSettings: Partial<Settings>) => {
    // setSettings((prev) => ({ ...prev, ...newSettings }));
    setSettings({ ...settings, ...newSettings });
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, isLoaded }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
