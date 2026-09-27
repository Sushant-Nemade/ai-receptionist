export type Faq = { question: string; answer: string };
export const sampleFaqs: Faq[];
export function replyTo(input: string, faqs?: Faq[]): { answer: string; urgent: boolean };
