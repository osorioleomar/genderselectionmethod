import type { Gender } from "@/lib/dates";

interface StepGenderProps {
  selectedGender: Gender | null;
  onSelect: (gender: Gender) => void;
}

export default function StepGender({ selectedGender, onSelect }: StepGenderProps) {
  return (
    <div>
      <h2 className="text-center mb-6">Which gender are you hoping to conceive?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
        <button
          type="button"
          onClick={() => onSelect("boy")}
          className={`card-selectable text-center ${selectedGender === "boy" ? "active" : ""}`}
        >
          <div className="text-5xl mb-3">👦</div>
          <h3 className="text-boy mb-0">Boy</h3>
        </button>
        <button
          type="button"
          onClick={() => onSelect("girl")}
          className={`card-selectable text-center ${selectedGender === "girl" ? "active" : ""}`}
        >
          <div className="text-5xl mb-3">👧</div>
          <h3 className="text-girl mb-0">Girl</h3>
        </button>
      </div>
    </div>
  );
}
