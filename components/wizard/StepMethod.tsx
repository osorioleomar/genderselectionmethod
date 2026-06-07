export type Method = "shettles" | "chinese";

interface StepMethodProps {
  selectedMethod: Method | null;
  onSelect: (method: Method) => void;
}

export default function StepMethod({ selectedMethod, onSelect }: StepMethodProps) {
  return (
    <div>
      <h2 className="text-center mb-6">Choose your preferred method:</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => onSelect("shettles")}
          className={`card-selectable text-left h-full ${selectedMethod === "shettles" ? "active" : ""}`}
        >
          <h3 className="text-primary mb-3">Shettles Method Calculator</h3>
          <p className="text-text-light mb-0 text-sm">
            Developed by Dr. Landrum Shettles, this scientifically-based approach
            suggests that timing intercourse relative to ovulation can influence
            whether you conceive a boy or girl.
          </p>
        </button>
        <button
          type="button"
          onClick={() => onSelect("chinese")}
          className={`card-selectable text-left h-full ${selectedMethod === "chinese" ? "active" : ""}`}
        >
          <h3 className="text-primary mb-3">Chinese Birth Calendar</h3>
          <p className="text-text-light mb-0 text-sm">
            This ancient method, dating back over 700 years, uses the mother&apos;s
            lunar age and conception month to predict baby gender.
          </p>
        </button>
      </div>
    </div>
  );
}
