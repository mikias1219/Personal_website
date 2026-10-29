export interface ChatTurn {
  role: "user" | "assistant";
  content: string;
}
export const MAX_QUESTION = 2000;
export const MAX_ANSWER = 24000;
export const MAX_HISTORY_CHARS = 60000;
export const MAX_HISTORY_MESSAGES = 20;
/** Keep recent complete turns while preserving room for detailed assistant replies. */
export function prepareHistory<T extends ChatTurn>(messages: T[]): T[] {
  const normalized: T[] = [];
  for (const m of messages.filter(m => m.content.trim())) {
    if (normalized.at(-1)?.role === m.role) normalized[normalized.length - 1] = m;
    else normalized.push(m);
  }
  const result = normalized.slice(-MAX_HISTORY_MESSAGES);
  while (result.length > 1 && (result[0].role !== "user" || result.reduce((n,m) => n + m.content.length, 0) > MAX_HISTORY_CHARS)) result.shift();
  return result;
}
/** Resolve references only; prior conversation never becomes trusted portfolio evidence. */
export function contextualQuestion(question: string, history: ChatTurn[] = []) {
  const followup = /\b(it|its|that|those|them|these|this|both|first|second|third|more|continue|further|deeper|same|former|latter)\b/i.test(question) || (/\b(stack|architecture|technologies|details|how|why)\b/i.test(question) && question.length < 100);
  if (!followup || !history.length) return question;
  const users = history.filter(m => m.role === "user").slice(-4).map(m => m.content);
  const answer = history.filter(m => m.role === "assistant").at(-1)?.content.slice(0, 16000) || "";
  return `${question}\n\nConversation references (not additional facts):\n${users.join("\n")}\n${answer}`;
}
