"use client";

import { useEffect } from "react";

const CLARITY_ID = "qoebo51gmq";

type ClarityFn = {
  (...args: unknown[]): void;
  q?: unknown[][];
};

export default function ClarityAnalytics() {
  useEffect(() => {
    if (document.getElementById("clarity-script")) return;

    try {
      const w = window as Window & { clarity?: ClarityFn };

      w.clarity =
        w.clarity ||
        function (...args: unknown[]) {
          (w.clarity!.q = w.clarity!.q || []).push(args);
        };

      const script = document.createElement("script");
      script.id = "clarity-script";
      script.async = true;
      script.src = `https://www.clarity.ms/tag/${CLARITY_ID}`;
      script.onerror = () => {
        // Clarity may be blocked by privacy extensions.
      };
      document.head.appendChild(script);
    } catch {
      // Never let analytics break the app.
    }
  }, []);

  return null;
}
