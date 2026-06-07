export type Method = "shettles" | "chinese";

interface StepMethodProps {
  selectedMethod: Method | null;
  onSelect: (method: Method) => void;
  onAutoAdvance: () => void;
}

export default function StepMethod({
  selectedMethod,
  onSelect,
  onAutoAdvance,
}: StepMethodProps) {
  const handleSelect = (method: Method) => {
    onSelect(method);
    onAutoAdvance();
  };

  return (
    <div>
      <h2 className="text-center mb-4 sm:mb-6 text-xl sm:text-2xl">
        Pick a method
      </h2>
      <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3 sm:gap-4 p-1 sm:p-0">
        <button
          type="button"
          onClick={() => handleSelect("shettles")}
          className={`card-selectable text-left p-4 sm:p-6 min-h-[88px] ${selectedMethod === "shettles" ? "active" : ""}`}
        >
          <h3 className="text-primary mb-2 text-lg">Shettles timing</h3>
          <p className="text-foreground-light mb-0 text-sm">
            Uses your cycle dates to suggest the best days to try, based on when you
            ovulate.
          </p>
        </button>
        <button
          type="button"
          onClick={() => handleSelect("chinese")}
          className={`card-selectable text-left p-4 sm:p-6 min-h-[88px] ${selectedMethod === "chinese" ? "active" : ""}`}
        >
          <h3 className="text-primary mb-2 text-lg">Chinese birth chart</h3>
          <p className="text-foreground-light mb-0 text-sm">
            Shows which months to try conceiving in, based on your age and the calendar month
            you hope to get pregnant.
          </p>
        </button>
      </div>
    </div>
  );
}
