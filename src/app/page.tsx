import { Hero } from "@/components/Hero";
import { AskBar } from "@/components/AskBar";
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
      <AskBar />
      <WorkSection />
      <ExperienceSection />
      <SkillsSection />
      <CredentialsSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
