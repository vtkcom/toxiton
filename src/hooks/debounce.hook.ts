import { useEffect } from "react";

export default function useDebounce(
  handler: () => void,
  watchedValue: unknown,
  delay: number
) {
  useEffect(() => {
    const timeoutHandler = setTimeout(handler, delay);
    return () => {
      clearTimeout(timeoutHandler);
    };
  }, [watchedValue, delay]);
}
