"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQ_ITEMS = [
  {
    question: "Do these methods actually work?",
    answer: (
      <p className="mb-0">
        About as often as a coin flip — roughly 50/50. Studies haven&apos;t shown a big,
        reliable boost from either the Shettles timing or the Chinese chart.
      </p>
    ),
  },
  {
    question: "Can I use both methods together?",
    answer: (
      <p className="mb-0">
        You can, but they don&apos;t always agree. One might say &quot;try in March&quot; while
        the other says &quot;try next week.&quot; There&apos;s no proof that combining them helps.
      </p>
    ),
  },
  {
    question: "Are there any risks?",
    answer: (
      <p className="mb-0">
        No physical harm from the methods themselves. The main risk is disappointment if
        the outcome isn&apos;t what you hoped for — and stress from over-planning timing.
      </p>
    ),
  },
  {
    question: "How do I know when I ovulate (for Shettles)?",
    answer: (
      <>
        <p className="mb-2">Helpful tools people use:</p>
        <ul className="ml-4 mb-0 space-y-1 text-sm">
          <li>Ovulation test strips from the pharmacy</li>
          <li>Period tracking apps</li>
          <li>Watching for clear, stretchy cervical mucus</li>
          <li>Morning temperature tracking (rises slightly after ovulation)</li>
        </ul>
      </>
    ),
  },
  {
    question: "What actually works for choosing gender?",
    answer: (
      <p className="mb-0">
        Medically, IVF with embryo testing is the most reliable — but it&apos;s expensive,
        invasive, and not available everywhere for non-medical reasons. Sperm sorting exists
        too, with moderate success rates, under a doctor&apos;s care.
      </p>
    ),
  },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      <h3 className="text-lg sm:text-xl">Common questions</h3>
      <div className="space-y-2 mt-4">
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className="rounded-xl border border-line overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between gap-2 px-4 py-3 text-left font-semibold text-sm sm:text-base bg-neutral hover:bg-primary/5 transition-colors touch-manipulation min-h-[48px]"
                aria-expanded={isOpen}
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`w-5 h-5 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isOpen && (
                <div className="px-4 py-3 border-t border-line bg-white text-sm sm:text-base">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
