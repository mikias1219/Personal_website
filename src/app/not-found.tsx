import { Container, Button } from "@/components/ui";

export default function NotFound() {
  return (
    <Container>
      <header className="page-head not-found">
        <h1>This page doesn’t exist.</h1>
        <p className="page-lead">
          The link may be old or mistyped. Head back home, or ask the assistant
          what you were looking for.
        </p>
        <p className="hero-actions">
          <Button href="/">Back home</Button>
          <Button href="/#work" variant="secondary">
            See selected work
          </Button>
        </p>
      </header>
    </Container>
  );
}
