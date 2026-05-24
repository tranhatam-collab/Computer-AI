interface CompareStripProps { locale?: "vi" | "en"; }

const content = {
  vi: { free: "làm quen với command-first AI work", personal: "cá nhân làm việc độc lập", creator: "nội dung, lịch, landing, script", business: "proposal, memo, report, SOP", studio: "content, media, design, publishing" },
  en: { free: "get started with command-first AI work", personal: "independent individual work", creator: "content, calendar, landing, script", business: "proposal, memo, report, SOP", studio: "content, media, design, publishing" }
} as const;

export function CompareStrip({ locale = "vi" }: CompareStripProps) {
  const t = content[locale];
  return (
    <div className="compare-strip">
      <div className="compare-item"><strong>Free</strong><span>{t.free}</span></div>
      <div className="compare-item"><strong>Personal</strong><span>{t.personal}</span></div>
      <div className="compare-item"><strong>Creator</strong><span>{t.creator}</span></div>
      <div className="compare-item"><strong>Business</strong><span>{t.business}</span></div>
      <div className="compare-item"><strong>Studio</strong><span>{t.studio}</span></div>
    </div>
  );
}
