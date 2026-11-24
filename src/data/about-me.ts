/**
 * Extra things visitors might ask about Mikias that are not covered by his
 * projects, roles or credentials: languages, working style, interests,
 * relocation, notice period, and so on.
 *
 * Everything listed here is given to the chat assistant as trusted facts, so
 * it can answer those questions clearly instead of saying "not documented".
 * Only add what is true and what you are happy to make public. Leave the list
 * empty and the assistant simply says it does not have that information and
 * points the visitor to the contact form.
 *
 * Example:
 *   { question: "Which languages does Mikias speak?", answer: "Amharic and English." }
 */
export interface PersonalFact {
  question: string;
  answer: string;
}

export const personalFacts: PersonalFact[] = [];
