"use client";

import { useState } from "react";
import ShettlesInfo from "./ShettlesInfo";
import ChineseInfo from "./ChineseInfo";
import ScientificInfo from "./ScientificInfo";
import FAQAccordion from "./FAQAccordion";

const TABS = [
  { id: "shettles-info", label: "Shettles", fullLabel: "Shettles Method" },
  { id: "chinese-info", label: "Chinese", fullLabel: "Chinese Calendar" },
  { id: "scientific-info", label: "Science", fullLabel: "Scientific Context" },
  { id: "faq", label: "FAQ", fullLabel: "FAQ" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function EducationalTabs() {
  const [activeTab, setActiveTab] = useState<TabId>("shettles-info");

  return (
    <section id="education" className="mb-12 scroll-mt-8">
      <div className="rounded-2xl border border-line bg-white p-6 md:p-8 shadow-soft">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6 sm:mb-8">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-xl px-3 py-3 min-h-[44px] text-sm md:text-base font-semibold transition-colors touch-manipulation ${
                activeTab === tab.id
                  ? "bg-primary text-white shadow-soft"
                  : "bg-neutral text-foreground hover:bg-primary/10"
              }`}
            >
              <span className="md:hidden">{tab.label}</span>
              <span className="hidden md:inline">{tab.fullLabel}</span>
            </button>
          ))}
        </div>

        <div className="max-w-none">
          {activeTab === "shettles-info" && <ShettlesInfo />}
          {activeTab === "chinese-info" && <ChineseInfo />}
          {activeTab === "scientific-info" && <ScientificInfo />}
          {activeTab === "faq" && (
            <div id="faq" className="scroll-mt-8">
              <FAQAccordion />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
