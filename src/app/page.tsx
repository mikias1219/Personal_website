import { Container, Section } from "@/components/ui";
import { site } from "@/data/profile";
export default function Home(){return <Container><Section><p className="eyebrow">{site.name} / {site.role}</p><h1>I build products.<br/><span className="accent">And the AI inside.</span></h1><p className="lead">{site.statement}</p></Section></Container>;}
