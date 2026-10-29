import { Container, Section, Button } from "@/components/ui";
export default function NotFound() {
  return (
    <Container>
      <Section>
        <p className="eyebrow">404 / Page not found</p>
        <h1>
          A loose end.
          <br />
          <span className="accent">Let’s get you back.</span>
        </h1>
        <p className="lead">
          This page doesn’t exist. Explore the work or head back home.
        </p>
        <div className="actions">
          <Button href="/">Back home</Button>
          <Button href="/work" variant="secondary">
            Explore work ↗
          </Button>
        </div>
      </Section>
    </Container>
  );
}
