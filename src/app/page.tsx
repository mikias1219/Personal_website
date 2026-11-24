import { Container } from "@/components/ui";
import { Hero } from "@/components/Hero";
import {
  WorkSection,
  AboutSection,
  ExperienceSection,
  SkillsSection,
  CredentialsSection,
  ContactSection,
} from "@/components/Sections";

export default function Home() {
  return (
    <>
      <Hero />
      <Container>
        <WorkSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <CredentialsSection />
        <ContactSection />
      </Container>
    </>
  );
}
