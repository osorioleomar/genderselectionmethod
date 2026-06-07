export default function ChineseInfo() {
  return (
    <div className="text-sm sm:text-base">
      <h3 className="text-lg sm:text-xl">How the Chinese birth chart works</h3>
      <p>
        This chart is an old tradition — over 700 years, people have used it to guess baby
        gender from the mother&apos;s age and the month of conception.
      </p>

      <p>
        Think of it like a lookup table: find your age on one side, find the month of
        conception on the other, and the chart says boy or girl. Our calculator does that
        math for you.
      </p>

      <div className="rounded-xl border border-line bg-neutral p-4 my-6">
        <p className="font-semibold mb-2">What you need:</p>
        <ul className="ml-4 mb-2 space-y-1">
          <li>Your date of birth</li>
          <li>The year you hope to conceive</li>
          <li>Whether you&apos;re hoping for a boy or girl</li>
        </ul>
        <p className="font-semibold mb-2">How to use your results:</p>
        <ul className="ml-4 mb-0 space-y-1">
          <li>
            Highlighted months are when to <strong>try to conceive</strong> — plan sex around
            your fertile window in those months
          </li>
          <li>
            The chart cares about the <strong>calendar month</strong> conception happens in,
            not a specific day
          </li>
          <li>Gray months are ones to skip if you&apos;re following this tradition</li>
        </ul>
      </div>

      <p className="mb-0 text-foreground-light text-sm">
        It&apos;s cultural fun for many families. Science hasn&apos;t shown it works better
        than guessing — about 50/50 either way.
      </p>
    </div>
  );
}
