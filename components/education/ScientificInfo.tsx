export default function ScientificInfo() {
  return (
    <div className="text-sm sm:text-base">
      <h3 className="text-lg sm:text-xl">What science says</h3>

      <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 mb-6">
        <p className="mb-0 font-medium">
          Bottom line: both the Shettles method and the Chinese chart are roughly{" "}
          <strong>50/50</strong> — about the same as leaving it to chance. Neither is
          proven to pick gender reliably.
        </p>
      </div>

      <h4 className="text-base">How gender is actually decided</h4>
      <p>
        At conception, the sperm that reaches the egg decides it: one type leads to a girl,
        another to a boy. That happens before any calendar or timing trick can change it.
      </p>

      <h4 className="text-base">What research found</h4>
      <ul className="space-y-2">
        <li>Timing (Shettles) might shift odds a tiny bit in some studies — results vary a lot.</li>
        <li>The Chinese chart hasn&apos;t held up in scientific tests.</li>
        <li>
          Only medical options (like IVF with genetic testing) can target gender with high
          accuracy — and those come with cost, rules, and medical oversight.
        </li>
      </ul>

      <p className="mb-0 text-foreground-light text-sm">
        It&apos;s fine to explore these tools for fun or curiosity. Just keep expectations
        realistic and focus on a healthy pregnancy above all.
      </p>
    </div>
  );
}
