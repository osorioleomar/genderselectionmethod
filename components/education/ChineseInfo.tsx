export default function ChineseInfo() {
  return (
    <div>
      <h3>The Ancient Wisdom of the Chinese Birth Calendar</h3>
      <p>
        The Chinese Birth Calendar (also known as the Chinese Gender Chart or Chinese
        Pregnancy Calendar) is said to be over 700 years old and was reportedly discovered
        in a royal tomb near Beijing. This ancient method has been passed down through
        generations as a tool for family planning.
      </p>

      <h4>Historical Significance:</h4>
      <p>
        In traditional Chinese culture, this calendar was considered a valuable tool for
        family planning, especially in times when having a male heir was socially important.
        Today, it continues to be consulted by couples worldwide who are interested in
        traditional methods of gender selection.
      </p>

      <h4>How the Chinese Birth Calendar Works:</h4>
      <ol>
        <li>
          <strong>Lunar Age Calculation:</strong> The mother&apos;s lunar age at the time
          of conception is calculated (which is typically one year more than Western age)
        </li>
        <li>
          <strong>Lunar Month Determination:</strong> The lunar month of conception is
          determined using the Chinese lunar calendar
        </li>
        <li>
          <strong>Chart Consultation:</strong> These two values are cross-referenced on the
          traditional chart to predict the baby&apos;s gender
        </li>
      </ol>

      <div className="flex justify-center my-6">
        <div className="rounded-xl border border-line overflow-hidden max-w-md w-full">
          <div className="bg-primary/20 px-4 py-3 font-semibold text-center">
            Chinese Birth Calendar Interpretation
          </div>
          <div className="p-4">
            <p>The chart is presented as a grid where:</p>
            <ul>
              <li>Vertical axis: Mother&apos;s lunar age (18-45)</li>
              <li>Horizontal axis: Lunar month of conception (1-12)</li>
              <li>Each cell contains either &quot;boy&quot; or &quot;girl&quot; prediction</li>
            </ul>
          </div>
        </div>
      </div>

      <p>
        While many people find the Chinese Birth Calendar fascinating for its cultural and
        historical significance, modern scientific studies have not found evidence that it
        can predict gender with accuracy greater than chance (approximately 50%).
      </p>
    </div>
  );
}
