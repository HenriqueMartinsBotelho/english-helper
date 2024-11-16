import { useState, useEffect } from "react";

type UseLocalStorageReturn<T> = {
  value: T | null;
  setValue: (newValue: T) => void;
  removeValue: () => void;
};

export const useLocalStorage = <T>(
  key: string,
  initialValue?: T
): UseLocalStorageReturn<T> => {
  const [value, setValueState] = useState<T | null>(() => {
    if (typeof window === "undefined") return null; // Prevent SSR issues
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue || null;
  });

  useEffect(() => {
    if (value !== null) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  const setValue = (newValue: T) => {
    setValueState(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  const removeValue = () => {
    setValueState(null);
    localStorage.removeItem(key);
  };

  return { value, setValue, removeValue };
};
