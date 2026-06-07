"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQ_ITEMS = [
  {
    question: "How effective are natural gender selection methods?",
    answer: (
      <p>
        Both the Shettles Method and Chinese Birth Calendar have approximately a 50%
        success rate, which is what would be expected by chance alone. Scientific studies
        have not consistently demonstrated that either method can significantly increase
        the likelihood of conceiving a specific gender. Some families report success with
        these methods, but this may be due to coincidence rather than the effectiveness
        of the method itself.
      </p>
    ),
  },
  {
    question: "Can I combine both the Shettles Method and Chinese Calendar?",
    answer: (
      <p>
        You can try to combine both methods by finding overlap between the Shettles timing
        recommendations and favorable months from the Chinese Calendar. However, there&apos;s
        no evidence that combining methods increases your chances of success. In some cases,
        the recommendations from the two methods might even contradict each other, creating
        confusion about the best approach.
      </p>
    ),
  },
  {
    question: "Are there any risks involved with natural gender selection methods?",
    answer: (
      <p>
        The natural methods described in this application don&apos;t pose physical health
        risks. However, potential emotional disappointment can occur if the desired outcome
        isn&apos;t achieved. It&apos;s important to be prepared for either gender outcome and
        to focus primarily on having a healthy baby. Additionally, being too focused on
        timing intercourse could potentially create stress around conception, which might
        affect fertility in sensitive individuals.
      </p>
    ),
  },
  {
    question: "How do I track ovulation accurately for the Shettles Method?",
    answer: (
      <>
        <p>For the most accurate ovulation tracking, consider using multiple methods together:</p>
        <ul>
          <li>
            <strong>Basal Body Temperature (BBT):</strong> Take your temperature each morning
            before getting out of bed to identify the slight rise that occurs after ovulation
          </li>
          <li>
            <strong>Ovulation Predictor Kits (OPKs):</strong> These test urine for luteinizing
            hormone (LH), which surges 24-36 hours before ovulation
          </li>
          <li>
            <strong>Cervical Mucus Monitoring:</strong> Track changes in vaginal discharge,
            which becomes clear, stretchy, and slippery during your most fertile time
          </li>
          <li>
            <strong>Fertility Tracking Apps:</strong> Use apps that combine multiple indicators
            to predict your fertile window
          </li>
          <li>
            <strong>Fertility Monitor Devices:</strong> More advanced tools can track multiple
            hormones and physiological changes
          </li>
        </ul>
        <p>
          The more methods you use together, the more accurately you can pinpoint ovulation
          for timing purposes.
        </p>
      </>
    ),
  },
  {
    question: "What are the most scientifically reliable methods for gender selection?",
    answer: (
      <>
        <p>The most scientifically reliable methods for gender selection are medical procedures that include:</p>
        <ul>
          <li>
            <strong>Preimplantation Genetic Testing (PGT) with In Vitro Fertilization (IVF):</strong>{" "}
            This involves creating embryos through IVF, testing them for gender, and then
            implanting embryos of the desired gender. This method is nearly 100% effective
            but is expensive, invasive, and may raise ethical considerations.
          </li>
          <li>
            <strong>Sperm Sorting:</strong> Techniques like flow cytometry (such as the
            MicroSort method) can separate X and Y chromosome-bearing sperm before
            intrauterine insemination. This method has shown success rates of 60-80% for
            girls and 70-80% for boys.
          </li>
        </ul>
        <p>
          These medical procedures are typically only available for couples with medical
          reasons for gender selection in many countries, and regulations vary worldwide.
        </p>
      </>
    ),
  },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      <h3>Frequently Asked Questions About Gender Selection</h3>
      <div className="space-y-2 mt-4">
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className="rounded-xl border border-border overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between px-4 py-3 text-left font-semibold bg-neutral hover:bg-primary/5 transition-colors"
                aria-expanded={isOpen}
              >
                {item.question}
                <ChevronDown
                  className={`w-5 h-5 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isOpen && (
                <div className="px-4 py-3 border-t border-border bg-white">{item.answer}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
