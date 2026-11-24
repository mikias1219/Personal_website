/**
 * Extra Q&A pairs for the chat assistant. Only restates facts already present
 * in profile, experience, projects or certifications — never new claims.
 */
export interface PersonalFact {
  question: string;
  answer: string;
}

export const personalFacts: PersonalFact[] = [
  {
    question: "Who is Mikias?",
    answer:
      "Mikias Abate is a Tech / Product Engineer based in Addis Ababa, Ethiopia. He currently works at IE Network Solutions.",
  },
  {
    question: "What is Mikias’s current role?",
    answer:
      "Tech / Product Engineer at IE Network Solutions in Addis Ababa, from November 2026 to present.",
  },
  {
    question: "Where is Mikias based?",
    answer: "Addis Ababa, Ethiopia (Africa/Addis_Ababa, UTC+3).",
  },
  {
    question: "Is Mikias available for work?",
    answer:
      "He is open to full-time remote or hybrid roles worldwide. Use the contact form or email mikiyasabate003@gmail.com.",
  },
  {
    question: "Where did Mikias study?",
    answer:
      "B.Sc. Information Systems at Addis Ababa University, June 2020 to July 2024.",
  },
  {
    question: "How do I download Mikias’s CV?",
    answer:
      "Download the current CV from /Mikias_Abate_CV.pdf on this site, or use the Download CV buttons in the header and contact section.",
  },
  {
    question: "Which Microsoft certifications does Mikias hold?",
    answer:
      "Azure AI Engineer Associate (AI-102) and Azure Data Scientist Associate (DP-100). Both have public Microsoft Learn verification links on the certifications page.",
  },
  {
    question: "What AI projects has Mikias built?",
    answer:
      "His AI projects are OKDE (a multi-tenant knowledge and decision engine with RAG chat) and Azure AI Solution (nine Azure AI capabilities, deployed automatically). At IE Network Solutions he also delivered hiring AI on Azure: CV extraction, candidate scoring and job matching.",
  },
];
