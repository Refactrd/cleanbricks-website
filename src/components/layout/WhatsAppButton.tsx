import { Icon } from "@/components/ui/Icon";
import { site, whatsappHref } from "@/lib/site";

/** Quick-enquiry shortcut, fixed to the corner on every page. */
export function WhatsAppButton() {
  if (!site.contact.whatsapp) return null;
  return (
    <a
      href={whatsappHref(site.contact.whatsapp, "Hello CleanBricks, I'd like to make a quick enquiry.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with CleanBricks on WhatsApp (opens in a new tab)"
      className="group fixed right-4 bottom-4 z-40 inline-flex h-14 items-center gap-2 rounded-full bg-brand px-4 font-medium text-ink shadow-[0_14px_30px_-10px_rgba(16,185,129,0.8)] transition duration-300 ease-out-soft hover:-translate-y-0.5 hover:bg-lime sm:right-6 sm:bottom-6 sm:px-5"
    >
      <Icon name="chat" className="size-6" />
      <span className="hidden sm:inline">Chat on WhatsApp</span>
    </a>
  );
}
