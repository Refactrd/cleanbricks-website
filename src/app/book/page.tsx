import { BookingWizard } from "@/components/booking/BookingWizard";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Book a Cleaning",
  description: "Request a cleaning with CleanBricks in Lagos. Tell us what you need, step by step, and see your price as you go.",
  path: "/book",
});

export default function BookPage() {
  return <BookingWizard />;
}
