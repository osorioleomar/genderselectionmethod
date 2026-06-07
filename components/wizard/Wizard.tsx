"use client";

import { useCallback, useState } from "react";
import WizardProgress from "./WizardProgress";
import StepGender from "./StepGender";
import StepMethod, { type Method } from "./StepMethod";
import ShettlesForm from "./ShettlesForm";
import ChineseForm from "./ChineseForm";
import ShettlesResultsView from "./ShettlesResults";
import ChineseResultsView from "./ChineseResults";
import ShareButtons from "@/components/ShareButtons";
import type { Gender } from "@/lib/dates";
import { getResultsSharePayload } from "@/lib/share";
import { useSiteOrigin } from "@/lib/useSiteOrigin";
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

  const handleTryShettlesFromChinese = useCallback(() => {
    setState((prev) => ({
      ...prev,
      method: "shettles",
      step: 3,
      shettlesResults: null,
      chineseResults: null,
      error: null,
      chineseFormError: null,
    }));
  }, []);

  const goToStep = (step: 1 | 2 | 3 | 4) => {
    setState((prev) => ({ ...prev, step, error: null }));
  };

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

  const handleNext = () => {
    if (state.step === 4) {
      resetWizard();
      return;
    }
    validateAndAdvance();
  };

  const showShettlesForm = state.method === "shettles" && state.gender;
  const showChineseForm = state.method === "chinese" && state.gender;
  const siteOrigin = useSiteOrigin();
  const resultsSharePayload =
    siteOrigin && getResultsSharePayload(state.shettlesResults, state.chineseResults, siteOrigin);

  return (
    <section id="wizard" className="scroll-mt-8 mb-6 sm:mb-12">
      <div className="rounded-none sm:rounded-2xl border-0 sm:border border-line bg-white sm:p-6 md:p-8 sm:shadow-soft flex flex-col min-h-[calc(100dvh-88px)] sm:min-h-0 max-w-7xl mx-auto">
        <WizardProgress currentStep={state.step} />

        <div className="flex-1 overflow-y-auto overflow-x-hidden sm:overflow-visible pb-[88px] sm:pb-0 min-h-0 px-4 sm:px-0">
          {state.step === 1 && (
            <StepGender
              selectedGender={state.gender}
              onSelect={(gender) => setState((prev) => ({ ...prev, gender, error: null }))}
              onAutoAdvance={() => goToStep(2)}
            />
          )}

          {state.step === 2 && (
            <StepMethod
              selectedMethod={state.method}
              onSelect={(method) => setState((prev) => ({ ...prev, method, error: null }))}
              onAutoAdvance={() => goToStep(3)}
            />
          )}

          {state.step === 3 && state.gender && (
            <div>
              <h2 className="text-center mb-4 sm:mb-6 text-xl sm:text-2xl">Your details</h2>
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
              <h2 className="text-center mb-4 sm:mb-6 text-xl sm:text-2xl">Your results</h2>
              {state.shettlesResults && (
                <ShettlesResultsView results={state.shettlesResults} />
              )}
              {state.chineseResults && (
                <ChineseResultsView
                  results={state.chineseResults}
                  onTryShettles={handleTryShettlesFromChinese}
                />
              )}
            </div>
          )}

          {state.error && (
            <p className="text-red-600 text-sm text-center mt-4" role="alert">
              {state.error}
            </p>
          )}
        </div>

        {/* Sticky bottom nav on mobile */}
        <div className="fixed bottom-0 left-0 right-0 z-40 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-white border-t border-line sm:static sm:border-0 sm:px-0 sm:py-0 sm:mt-6">
          <div
            className={`flex max-w-7xl mx-auto gap-3 ${
              state.step === 4 && resultsSharePayload ? "justify-stretch sm:justify-end" : "justify-end"
            }`}
          >
            {state.step === 4 && resultsSharePayload && (
              <ShareButtons
                variant="compact"
                message={resultsSharePayload.message}
                url={resultsSharePayload.url}
                title={resultsSharePayload.title}
              />
            )}
            <button
              type="button"
              onClick={handleNext}
              className={`min-h-[48px] ${
                state.step === 4 && resultsSharePayload
                  ? "btn-outline flex-[3] sm:flex-none sm:min-w-[140px]"
                  : "w-full sm:w-auto"
              } ${state.step === 4 ? "btn-outline" : "btn-primary"}`}
            >
              {state.step === 4 ? "Start Over" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
