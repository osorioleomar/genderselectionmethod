interface WizardProgressProps {
  currentStep: number;
}

const STEPS = [
  { number: 1, label: "Choose Gender" },
  { number: 2, label: "Select Method" },
  { number: 3, label: "Enter Details" },
  { number: 4, label: "View Results" },
];

export default function WizardProgress({ currentStep }: WizardProgressProps) {
  return (
    <div className="flex justify-between mb-8 relative">
      <div className="absolute top-5 left-0 right-0 h-0.5 bg-border -z-10 mx-8 hidden sm:block" />
      {STEPS.map((step) => {
        const isActive = step.number === currentStep;
        const isCompleted = step.number < currentStep;

        return (
          <div
            key={step.number}
            className={`flex flex-col items-center flex-1 ${isActive ? "opacity-100" : isCompleted ? "opacity-100" : "opacity-60"}`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-heading font-semibold text-sm mb-2 transition-colors ${
                isActive
                  ? "bg-primary text-white shadow-soft"
                  : isCompleted
                    ? "bg-accent text-white"
                    : "bg-neutral text-foreground-light border-2 border-line"
              }`}
            >
              {isCompleted ? "✓" : step.number}
            </div>
            <span
              className={`text-xs sm:text-sm text-center font-medium ${
                isActive ? "text-primary" : "text-foreground-light"
              }`}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
