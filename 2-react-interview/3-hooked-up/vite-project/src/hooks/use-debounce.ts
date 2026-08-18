import { useEffect, useState } from "react";

// Build a custom hook that delays updating a value until a specified time has passed after the last change.
const useDebounce = (value: string, delay: number, callback = () => {}) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      callback();
    }, delay);

    return () => clearTimeout(handler);
  }, []);

  return debouncedValue;
};

export default useDebounce;
