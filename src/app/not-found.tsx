import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="grid min-h-[80vh] place-items-center bg-mint pt-[var(--nav-h)] pb-16">
      <Container className="text-center">
        <p className="font-display text-8xl font-bold tracking-tight text-brand sm:text-9xl">404</p>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">This page is not here.</h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-ink/75">The link may be old, or the page may have moved. Let us get you back on track.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Button href="/" arrow>
            Back to home
          </Button>
          <Button href="/contact" variant="outline">
            Contact us
          </Button>
        </div>
      </Container>
    </section>
  );
}
