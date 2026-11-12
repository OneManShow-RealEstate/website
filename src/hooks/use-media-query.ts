"use client";

import { useSyncExternalStore } from "react";

// True when the media query matches. On the server (and the first client render) it's false.
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const media = matchMedia(query);
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    () => matchMedia(query).matches,
    () => false
  );
}
