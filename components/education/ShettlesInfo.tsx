export default function ShettlesInfo() {
  return (
    <div>
      <h3>The Complete Guide to the Shettles Method</h3>
      <p>
        Developed by Dr. Landrum Shettles in the 1960s, this method is based on research
        indicating that sperm carrying the Y chromosome (leading to a boy) have different
        characteristics than those carrying the X chromosome (leading to a girl). Dr.
        Shettles observed that Y-chromosome sperm are faster swimmers but more fragile,
        while X-chromosome sperm are slower but more resilient.
      </p>

      <h4>Biological Foundation of the Shettles Method:</h4>
      <p>
        The key to the Shettles Method is understanding that Y-chromosome and X-chromosome
        sperm respond differently to the conditions in the female reproductive tract. These
        differences in survival and swimming speed form the basis for timing recommendations.
      </p>

      <h4>Key Principles for Gender Selection:</h4>
      <ul>
        <li>
          <strong>For conceiving a boy:</strong> Intercourse should occur as close to
          ovulation as possible, ideally on the day of ovulation or the day before. This
          gives the faster Y-chromosome sperm the advantage of reaching the egg first while
          they&apos;re still viable.
        </li>
        <li>
          <strong>For conceiving a girl:</strong> Intercourse should occur 2-4 days before
          ovulation. This allows most of the more fragile Y-chromosome sperm to die off,
          while the hardier X-chromosome sperm survive longer to fertilize the egg when
          it&apos;s released.
        </li>
        <li>
          <strong>Additional factors:</strong> The method also suggests various factors
          that may influence gender selection:
        </li>
      </ul>

      <div className="mb-6">
        <h5 className="font-heading font-semibold mb-4">Secondary Factors in the Shettles Method:</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-line overflow-hidden">
            <div className="bg-boy/20 px-4 py-3 font-semibold">For Conceiving a Boy</div>
            <ul className="list-none ml-0 px-4 py-3 space-y-2">
              <li>Deep penetration during intercourse</li>
              <li>Female orgasm, which creates alkaline secretions</li>
              <li>Alkaline diet for the woman</li>
            </ul>
          </div>
          <div className="rounded-xl border border-line overflow-hidden">
            <div className="bg-girl/20 px-4 py-3 font-semibold">For Conceiving a Girl</div>
            <ul className="list-none ml-0 px-4 py-3 space-y-2">
              <li>Shallow penetration during intercourse</li>
              <li>Avoiding female orgasm during conception</li>
              <li>Slightly acidic diet for the woman</li>
            </ul>
          </div>
        </div>
      </div>

      <p>
        While the Shettles Method is one of the most well-known natural gender selection
        approaches, it&apos;s important to remember that scientific studies have shown mixed
        results regarding its effectiveness. Some couples report success, while others find
        the method no more effective than chance.
      </p>
    </div>
  );
}
