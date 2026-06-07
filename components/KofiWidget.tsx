"use client";

import { useEffect, useRef } from "react";

const KOFI_SCRIPT_ID = "kofi-widget-script";
const KOFI_SCRIPT_SRC = "https://storage.ko-fi.com/cdn/widget/Widget_2.js";

type KofiWidget = {
  init: (text: string, color: string, id: string) => void;
  draw: () => void;
};

declare global {
  interface Window {
    kofiwidget2?: KofiWidget;
  }
}

function initKofiWidget() {
  if (!window.kofiwidget2) return;
  window.kofiwidget2.init("Little donation is big help", "#72a4f2", "R6R61BYW41");
  window.kofiwidget2.draw();
}

export default function KofiWidget() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;

    const existingScript = document.getElementById(KOFI_SCRIPT_ID) as HTMLScriptElement | null;

    if (window.kofiwidget2) {
      initialized.current = true;
      try {
        initKofiWidget();
      } catch {
        // Widget already drawn or blocked.
      }
      return;
    }

    if (existingScript) {
      existingScript.addEventListener("load", () => {
        if (initialized.current) return;
        initialized.current = true;
        try {
          initKofiWidget();
        } catch {
          // Ignore duplicate draw errors.
        }
      });
      return;
    }

    const script = document.createElement("script");
    script.id = KOFI_SCRIPT_ID;
    script.src = KOFI_SCRIPT_SRC;
    script.async = true;
    script.onload = () => {
      if (initialized.current) return;
      initialized.current = true;
      try {
        initKofiWidget();
      } catch {
        // Ignore duplicate draw errors.
      }
    };
    script.onerror = () => {
      // Ko-fi may be blocked; ignore load failures.
    };
    document.body.appendChild(script);
  }, []);

  return null;
}
