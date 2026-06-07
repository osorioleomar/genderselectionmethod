"use client";

import { useSyncExternalStore } from "react";

function subscribe() {
  return () => {};
}

function getSnapshot() {
  return window.location.origin;
}

function getServerSnapshot() {
  return null;
}

/** Current page origin (e.g. https://example.com). Null during SSR. */
export function useSiteOrigin(): string | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
