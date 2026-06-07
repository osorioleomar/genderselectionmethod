export default function ShettlesInfo() {
  return (
    <div className="text-sm sm:text-base">
      <h3 className="text-lg sm:text-xl">How the Shettles method works</h3>
      <p>
        The idea is simple: sperm that make boys swim faster but don&apos;t last long. Sperm
        that make girls are slower but tougher. So <strong>when</strong> you try matters.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
        <div className="rounded-xl border border-line overflow-hidden">
          <div className="bg-boy/20 px-4 py-3 font-semibold text-boy">Trying for a boy</div>
          <div className="px-4 py-3">
            <p className="mb-2 text-sm">
              Try as close to ovulation as you can — ideally the day before or the day of.
            </p>
            <ul className="list-none ml-0 space-y-1 text-sm mb-0">
              <li>· Time it right before or on ovulation day</li>
              <li>· Track ovulation with apps or test strips if you can</li>
            </ul>
          </div>
        </div>
        <div className="rounded-xl border border-line overflow-hidden">
          <div className="bg-girl/20 px-4 py-3 font-semibold text-girl">Trying for a girl</div>
          <div className="px-4 py-3">
            <p className="mb-2 text-sm">
              Try 2–4 days <em>before</em> you expect to ovulate, not on ovulation day.
            </p>
            <ul className="list-none ml-0 space-y-1 text-sm mb-0">
              <li>· Plan a few days ahead of ovulation</li>
              <li>· Know your cycle length for better timing</li>
            </ul>
          </div>
        </div>
      </div>

      <p className="mb-0 text-foreground-light text-sm">
        Dr. Shettles popularized this in the 1960s. Studies don&apos;t agree on how well it
        works — many couples still land around a 50/50 chance.
      </p>
    </div>
  );
}
