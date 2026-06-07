import type { Gender } from "@/lib/dates";

interface StepGenderProps {
  selectedGender: Gender | null;
  onSelect: (gender: Gender) => void;
  onAutoAdvance: () => void;
}

export default function StepGender({ selectedGender, onSelect, onAutoAdvance }: StepGenderProps) {
  const handleSelect = (gender: Gender) => {
    onSelect(gender);
    onAutoAdvance();
  };

  return (
    <div>
      <h2 className="text-center mb-4 sm:mb-6 text-xl sm:text-2xl">
        Which gender are you hoping for?
      </h2>
      <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3 sm:gap-4 max-w-2xl mx-auto p-1 sm:p-0">
        <button
          type="button"
          onClick={() => handleSelect("boy")}
          className={`card-selectable flex items-center sm:flex-col sm:text-center gap-4 sm:gap-0 p-4 sm:p-6 min-h-[72px] sm:min-h-0 ${selectedGender === "boy" ? "active" : ""}`}
        >
          <div className="text-4xl sm:text-5xl sm:mb-3 shrink-0">👦</div>
          <h3 className="text-boy mb-0 text-lg sm:text-xl">Boy</h3>
        </button>
        <button
          type="button"
          onClick={() => handleSelect("girl")}
          className={`card-selectable flex items-center sm:flex-col sm:text-center gap-4 sm:gap-0 p-4 sm:p-6 min-h-[72px] sm:min-h-0 ${selectedGender === "girl" ? "active" : ""}`}
        >
          <div className="text-4xl sm:text-5xl sm:mb-3 shrink-0">👧</div>
          <h3 className="text-girl mb-0 text-lg sm:text-xl">Girl</h3>
        </button>
      </div>
    </div>
  );
}
