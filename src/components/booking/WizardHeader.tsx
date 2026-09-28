import { Icon } from "@/components/ui/Icon";
import { site, whatsappHref } from "@/lib/site";

type Props = { onBack?: () => void };

/**
 * Sits below the main site nav (see SiteChrome) — just the wizard-specific
 * controls the nav doesn't cover: step-back, and a WhatsApp escape hatch.
 */
export function WizardHeader({ onBack }: Props) {
  return (
    <div className="flex items-center justify-between px-4 pt-4 sm:px-6">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to the previous step"
          className="grid size-10 place-items-center rounded-full transition-colors hover:bg-mint"
        >
          <Icon name="arrow" className="size-5 rotate-180" />
        </button>
      ) : (
        <span className="size-10" aria-hidden="true" />
      )}

      {site.contact.whatsapp && (
        <a
          href={whatsappHref(site.contact.whatsapp, "Hello CleanBricks, I'd like some help booking a cleaning.")}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Need help? Chat with CleanBricks on WhatsApp (opens in a new tab)"
          className="grid size-10 place-items-center rounded-full text-brand transition-colors hover:bg-mint"
        >
          <Icon name="chat" className="size-5" />
        </a>
      )}
    </div>
  );
}
