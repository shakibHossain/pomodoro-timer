import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(defaultValue);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored && stored !== "undefined") {
        setValue(JSON.parse(stored));
      }
    } catch {
      setValue(defaultValue);
    }
  }, [key]);

  const setStoredValue = (newValue: T) => {
    try {
      localStorage.setItem(key, JSON.stringify(newValue));
      setValue(newValue);
    } catch {
      console.error("localStorage error");
    }
  };

  return [value, setStoredValue] as const;
}
