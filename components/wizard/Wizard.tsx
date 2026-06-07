"use client";

import { useCallback, useState } from "react";
import WizardProgress from "./WizardProgress";
import StepGender from "./StepGender";
import StepMethod, { type Method } from "./StepMethod";
import ShettlesForm from "./ShettlesForm";
import ChineseForm from "./ChineseForm";
import ShettlesResultsView from "./ShettlesResults";
import ChineseResultsView from "./ChineseResults";
import type { Gender } from "@/lib/dates";
import type { ShettlesResults } from "@/lib/shettles";
import type { ChineseResults } from "@/lib/chinese-calendar";

function createInitialState() {
  return {
    step: 1 as 1 | 2 | 3 | 4,
    gender: null as Gender | null,
    method: null as Method | null,
    shettlesResults: null as ShettlesResults | null,
    chineseResults: null as ChineseResults | null,
    error: null as string | null,
    lastPeriod: null as Date | null,
    cycleLength: 28,
    motherBirthDate: null as Date | null,
    conceptionYear: new Date().getFullYear(),
    chineseFormError: null as string | null,
  };
}

export default function Wizard() {
  const [state, setState] = useState(createInitialState);

  const resetWizard = useCallback(() => {
    setState(createInitialState());
  }, []);

  const handleShettlesResults = useCallback((results: ShettlesResults) => {
    setState((prev) => ({
      ...prev,
      shettlesResults: results,
      chineseResults: null,
      step: prev.step === 3 ? 4 : prev.step,
      error: null,
    }));
  }, []);

  const handleChineseResults = useCallback((results: ChineseResults) => {
    setState((prev) => ({
      ...prev,
      chineseResults: results,
      shettlesResults: null,
      step: 4,
      error: null,
      chineseFormError: null,
    }));
  }, []);

  const validateAndAdvance = () => {
    if (state.step === 1) {
      if (!state.gender) {
        setState((prev) => ({ ...prev, error: "Please select a gender before proceeding." }));
        return;
      }
      setState((prev) => ({ ...prev, step: 2, error: null }));
      return;
    }

    if (state.step === 2) {
      if (!state.method) {
        setState((prev) => ({ ...prev, error: "Please select a method before proceeding." }));
        return;
      }
      setState((prev) => ({ ...prev, step: 3, error: null }));
      return;
    }

    if (state.step === 3) {
      if (state.method === "shettles" && !state.shettlesResults) {
        setState((prev) => ({
          ...prev,
          error: "Please enter your last menstrual period date to calculate results.",
        }));
        return;
      }
      if (state.method === "chinese" && !state.chineseResults) {
        setState((prev) => ({
          ...prev,
          error: 'Please fill in the form and click "Find Favorable Months".',
        }));
        return;
      }
      setState((prev) => ({ ...prev, step: 4, error: null }));
    }
  };

  const goBack = () => {
    if (state.step > 1) {
      setState((prev) => ({
        ...prev,
        step: (prev.step - 1) as 1 | 2 | 3 | 4,
        error: null,
      }));
    }
  };

  const handleNext = () => {
    if (state.step === 4) {
      resetWizard();
      return;
    }
    validateAndAdvance();
  };

  const showShettlesForm = state.method === "shettles" && state.gender;
  const showChineseForm = state.method === "chinese" && state.gender;

  return (
    <section id="wizard" className="mb-12 scroll-mt-8">
      <div className="rounded-2xl border border-line bg-white p-6 md:p-8 shadow-soft">
        <WizardProgress currentStep={state.step} />

        <div className="min-h-[200px] mb-8">
          {state.step === 1 && (
            <StepGender
              selectedGender={state.gender}
              onSelect={(gender) =>
                setState((prev) => ({ ...prev, gender, error: null }))
              }
            />
          )}

          {state.step === 2 && (
            <StepMethod
              selectedMethod={state.method}
              onSelect={(method) =>
                setState((prev) => ({ ...prev, method, error: null }))
              }
            />
          )}

          {state.step === 3 && state.gender && (
            <div>
              <h2 className="text-center mb-6">Enter Your Details</h2>
              {showShettlesForm && (
                <ShettlesForm
                  gender={state.gender}
                  lastPeriod={state.lastPeriod}
                  cycleLength={state.cycleLength}
                  onLastPeriodChange={(lastPeriod) =>
                    setState((prev) => ({ ...prev, lastPeriod }))
                  }
                  onCycleLengthChange={(cycleLength) =>
                    setState((prev) => ({ ...prev, cycleLength }))
                  }
                  onResults={handleShettlesResults}
                />
              )}
              {showChineseForm && (
                <ChineseForm
                  gender={state.gender}
                  motherBirthDate={state.motherBirthDate}
                  conceptionYear={state.conceptionYear}
                  onMotherBirthDateChange={(motherBirthDate) =>
                    setState((prev) => ({ ...prev, motherBirthDate }))
                  }
                  onConceptionYearChange={(conceptionYear) =>
                    setState((prev) => ({ ...prev, conceptionYear }))
                  }
                  onResults={handleChineseResults}
                  error={state.chineseFormError}
                  onError={(chineseFormError) =>
                    setState((prev) => ({ ...prev, chineseFormError }))
                  }
                />
              )}
            </div>
          )}

          {state.step === 4 && (
            <div>
              <h2 className="text-center mb-6">Your Results</h2>
              {state.shettlesResults && (
                <ShettlesResultsView results={state.shettlesResults} />
              )}
              {state.chineseResults && (
                <ChineseResultsView results={state.chineseResults} />
              )}
            </div>
          )}
        </div>

        {state.error && (
          <p className="text-red-600 text-sm text-center mb-4" role="alert">
            {state.error}
          </p>
        )}

        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <button
            type="button"
            onClick={goBack}
            disabled={state.step === 1}
            className="btn-outline w-full sm:w-auto disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={handleNext}
            className={
              state.step === 4 ? "btn-outline w-full sm:w-auto" : "btn-primary w-full sm:w-auto"
            }
          >
            {state.step === 4 ? "Start Over" : "Next"}
          </button>
        </div>
      </div>
    </section>
  );
}
