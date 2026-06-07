export default function Disclaimer() {
  return (
    <section className="mb-8 sm:mb-12 scroll-mt-8">
      <details className="group rounded-2xl bg-neutral border border-line overflow-hidden">
        <summary className="cursor-pointer list-none px-4 py-3 sm:px-6 sm:py-4 font-semibold text-primary flex items-center justify-between gap-2 [&::-webkit-details-marker]:hidden">
          <span>Important disclaimer</span>
          <span className="text-foreground-light text-sm font-normal group-open:hidden">
            Tap to read
          </span>
          <span className="text-foreground-light text-sm font-normal hidden group-open:inline">
            Tap to close
          </span>
        </summary>
        <div className="px-4 pb-4 sm:px-6 sm:pb-6 pt-0 border-t border-line">
          <p className="mb-0 text-sm sm:text-base text-foreground-light">
            These methods are traditional ideas, not proven science. They are not
            guaranteed to work. This app is for information and fun only. For medical
            advice about getting pregnant, talk to your doctor.
          </p>
        </div>
      </details>
    </section>
  );
}
