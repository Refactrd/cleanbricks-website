import { Icon } from "@/components/ui/Icon";
import { CleaningTypeCards } from "@/components/pricing/CleaningTypeCards";
import { cleaningTypeInfo } from "@/lib/pricing-engine/config";
import type { CleaningType } from "@/lib/pricing-engine/types";
import { otherServices, type WizardValues } from "../wizard-types";

type Props = { values: WizardValues; update: (patch: Partial<WizardValues>) => void };

export function ServiceStep({ values, update }: Props) {
  const selectTier = (t: CleaningType) => update({ service: cleaningTypeInfo[t].name, cleaningType: t });
  const selectOther = (value: string) => update({ service: value, cleaningType: null });

  return (
    <div className="space-y-8">
      <div>
        <p className="mb-3 text-sm text-ink/75">A home clean? Choose Light, Standard or Deep to see your price as you go.</p>
        <CleaningTypeCards value={values.cleaningType} onChange={selectTier} />
      </div>

      <div>
        <p className="mb-3 text-sm text-ink/75">Something else?</p>
        <div role="radiogroup" aria-label="Other services" className="grid gap-3 sm:grid-cols-2">
          {otherServices.map((s) => {
            const selected = values.service === s.value;
            return (
              <button
                key={s.value}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => selectOther(s.value)}
                className={`flex items-start gap-3 rounded-2xl border-2 p-4 text-left transition-colors duration-200 ${
                  selected ? "border-brand bg-paper" : "border-transparent bg-mint hover:bg-mint/70"
                }`}
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-paper text-ink">
                  <Icon name={s.icon} className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className="block font-medium">{s.title}</span>
                  <span className="block text-sm text-ink/70">{s.description}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
