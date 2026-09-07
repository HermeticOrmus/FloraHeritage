import { useTranslation } from "react-i18next";

export default function SleepingPlan() {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-background" data-testid="sleeping-plan">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("sleep.title")}
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {t("sleep.lead")}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-lg border border-border bg-card p-6">
            <p className="text-sm font-semibold text-casa-blue-deep mb-2">{t("rooms.downstairs")}</p>
            <p className="text-foreground leading-relaxed">{t("sleep.downstairs")}</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6">
            <p className="text-sm font-semibold text-casa-blue-deep mb-2">{t("rooms.upstairs")}</p>
            <p className="text-foreground leading-relaxed">{t("sleep.upstairs")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
