import { Hero } from "@/components/Hero";
import { TechMarquee } from "@/components/TechMarquee";
import {
  WorkSection,
  ExperienceSection,
  SkillsSection,
  CredentialsSection,
  AboutSection,
  ContactSection,
} from "@/components/Sections";

export default function Home() {
  return (
    <>
      <Hero />
      <TechMarquee />
      <WorkSection />
      <ExperienceSection />
      <SkillsSection />
      <CredentialsSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
