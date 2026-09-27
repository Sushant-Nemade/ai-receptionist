export const sampleFaqs = [
  { question: 'What are your opening hours?', answer: 'We are open Monday to Friday, 9:00 to 17:00.' },
  { question: 'How can I book an appointment?', answer: 'Please leave your preferred date and contact number; our team will reply.' },
  { question: 'Where are you located?', answer: 'Our office is in the city centre. Ask for an exact address when booking.' }
];
export function replyTo(input, faqs = sampleFaqs) {
  const text = String(input).trim().toLowerCase();
  if (!text) return { answer: 'Please tell us what you need help with.', urgent: false };
  const urgent = /\b(urgent|emergency|immediately|asap|danger|hospital)\b/i.test(text);
  const tokens = new Set(text.match(/[a-z]{4,}/g) ?? []);
  const ranked = faqs.map(f => ({ faq: f, score: (String(f.question).toLowerCase().match(/[a-z]{4,}/g) ?? []).filter(word => tokens.has(word)).length })).sort((a, b) => b.score - a.score);
  return { answer: ranked[0]?.score ? ranked[0].faq.answer : 'Thank you. I have recorded your message and a person will follow up.', urgent };
}
