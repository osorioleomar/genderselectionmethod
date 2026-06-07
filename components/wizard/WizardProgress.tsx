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
  const activeLabel = STEPS.find((s) => s.number === currentStep)?.label ?? "";

  return (
    <div className="mb-4 sm:mb-8">
      {/* Mobile: compact dots + active step label */}
      <div className="sm:hidden">
        <p className="text-center text-sm font-semibold text-primary mb-3">{activeLabel}</p>
        <div className="flex justify-center items-center gap-2">
          {STEPS.map((step) => {
            const isActive = step.number === currentStep;
            const isCompleted = step.number < currentStep;
            return (
              <div
                key={step.number}
                className={`rounded-full transition-all ${
                  isActive
                    ? "w-8 h-2 bg-primary"
                    : isCompleted
                      ? "w-2 h-2 bg-accent"
                      : "w-2 h-2 bg-line"
                }`}
                aria-hidden
              />
            );
          })}
        </div>
      </div>

      {/* Desktop: full step indicators */}
      <div className="hidden sm:flex justify-between relative">
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-line -z-10 mx-8" />
        {STEPS.map((step) => {
          const isActive = step.number === currentStep;
          const isCompleted = step.number < currentStep;

          return (
            <div
              key={step.number}
              className={`flex flex-col items-center flex-1 ${isActive || isCompleted ? "opacity-100" : "opacity-60"}`}
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
    </div>
  );
}
