import Link from "next/link";
import { Container, Button } from "@/components/ui";

export default function NotFound() {
  return (
    <Container>
      <section className="py-24 md:py-32">
        <p className="text-sm font-medium text-muted">404</p>
        <h1 className="mt-3 text-4xl tracking-tight md:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 max-w-xl text-muted">
          That page is not in Mikias’s portfolio. Head home to see his work,
          experience, and contact details.
        </p>
        <div className="mt-8">
          <Button href="/">Back to home</Button>
        </div>
        <p className="mt-4 text-sm">
          Or{" "}
          <Link href="/#contact" className="font-semibold text-accent underline">
            contact Mikias
          </Link>
          .
        </p>
      </section>
    </Container>
  );
}
