import React from 'react';
import {
  SiPython, SiMicrosoftazure, SiOpenai, SiTypescript, SiReact, SiNextdotjs, SiNestjs, SiNodedotjs,
  SiDjango, SiFastapi, SiPostgresql, SiMongodb, SiDocker, SiJenkins, SiFlutter, SiTensorflow,
  SiPrisma, SiRedis, SiTailwindcss, SiLinux,
} from 'react-icons/si';

const tech = [
  { name: 'Python', icon: SiPython },
  { name: 'Azure', icon: SiMicrosoftazure },
  { name: 'OpenAI', icon: SiOpenai },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'React', icon: SiReact },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'NestJS', icon: SiNestjs },
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'Django', icon: SiDjango },
  { name: 'FastAPI', icon: SiFastapi },
  { name: 'PostgreSQL', icon: SiPostgresql },
  { name: 'MongoDB', icon: SiMongodb },
  { name: 'Docker', icon: SiDocker },
  { name: 'Jenkins', icon: SiJenkins },
  { name: 'Flutter', icon: SiFlutter },
  { name: 'TensorFlow', icon: SiTensorflow },
  { name: 'Prisma', icon: SiPrisma },
  { name: 'Redis', icon: SiRedis },
  { name: 'Tailwind', icon: SiTailwindcss },
  { name: 'Linux', icon: SiLinux },
];

const TechMarquee: React.FC = () => {
  return (
    <section className="marquee" aria-label="Technologies I work with">
      <ul className="sr-only">
        {tech.map((t) => <li key={t.name}>{t.name}</li>)}
      </ul>
      <div className="marquee-track" aria-hidden="true">
        {[0, 1].map((copy) => (
          <div className="marquee-group" key={copy}>
            {tech.map(({ name, icon: Icon }) => (
              <span className="marquee-item" key={name}>
                <Icon /> {name}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechMarquee;
