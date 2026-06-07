"use client";

import { useEffect } from "react";
import Script from "next/script";

export default function Footer() {
  useEffect(() => {
    const drawKofi = () => {
      const kofi = (window as Window & { kofiwidget2?: { init: (text: string, color: string, id: string) => void; draw: () => void } }).kofiwidget2;
      if (kofi) {
        kofi.init("Little donation is big help", "#72a4f2", "R6R61BYW41");
        kofi.draw();
      }
    };

    if ((window as Window & { kofiwidget2?: unknown }).kofiwidget2) {
      drawKofi();
    }
  }, []);

  return (
    <footer className="bg-gradient-to-br from-primary to-accent text-white py-8 mt-12 rounded-t-[20px]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center md:text-left">
          <div>
            <h4 className="text-white mb-3 text-xl font-heading font-semibold">
              Natural Gender Selection Methods
            </h4>
            <p className="mb-2 opacity-90">
              Explore traditional approaches to family planning with our free
              calculators and educational resources.
            </p>
            <p className="text-sm opacity-80 mb-2">
              This application is for informational and entertainment purposes only.
              Always consult healthcare professionals for medical advice.
            </p>
            <p className="mb-0">
              <strong>Contact:</strong>{" "}
              <a href="mailto:genderselectionm@gmail.com" className="text-white hover:underline">
                genderselectionm@gmail.com
              </a>
            </p>
          </div>
          <div>
            <h4 className="text-white mb-3 text-xl font-heading font-semibold">
              Quick Links
            </h4>
            <nav>
              <ul className="space-y-2 list-none ml-0 md:max-w-xs md:mx-auto lg:mx-0">
                <li>
                  <a href="#wizard" className="text-white hover:underline">
                    Shettles Method Calculator
                  </a>
                </li>
                <li>
                  <a href="#wizard" className="text-white hover:underline">
                    Chinese Birth Calendar
                  </a>
                </li>
                <li>
                  <a href="#education" className="text-white hover:underline">
                    Educational Resources
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-white hover:underline">
                    Frequently Asked Questions
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="mt-6 flex justify-center" id="kofi-widget" />
        <Script
          src="https://storage.ko-fi.com/cdn/widget/Widget_2.js"
          strategy="lazyOnload"
          onLoad={() => {
            const kofi = (window as Window & { kofiwidget2?: { init: (text: string, color: string, id: string) => void; draw: () => void } }).kofiwidget2;
            if (kofi) {
              kofi.init("Little donation is big help", "#72a4f2", "R6R61BYW41");
              kofi.draw();
            }
          }}
        />
        <hr className="border-white/30 my-6" />
        <p className="text-center mb-0 opacity-90">
          &copy; {new Date().getFullYear()} Gender Selection Methods App. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
