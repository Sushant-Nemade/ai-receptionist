'use client';
import { useState } from 'react';
import { replyTo, sampleFaqs } from '../lib/reception.mjs';
export default function Page() {
  const [text, setText] = useState('What are your opening hours?');
  const [messages, setMessages] = useState<{ input: string; answer: string; urgent: boolean }[]>([]);
  function send() { if (!text.trim()) return; const result = replyTo(text, sampleFaqs); setMessages([...messages, { input: text, ...result }]); setText(''); }
  return <main><div className="eyebrow">BUSINESS MESSAGING · DEMO MODE</div><header><h1>AI Receptionist</h1><p>Try the FAQ and urgent-message flow. This preview does not accept real phone calls or send notifications.</p></header><div className="grid"><article><span className="muted">Channels in code</span><div className="metric">Voice · SMS</div></article><article><span className="muted">Escalation</span><div className="metric">Urgent requests</div></article></div><section><h2>Receptionist simulator</h2><label>Customer message<textarea value={text} onChange={e => setText(e.target.value)} /></label><button onClick={send}>Send demo message</button>{messages.map((m, i) => <article key={i}><p><b>Customer:</b> {m.input}</p><p><b>Receptionist:</b> {m.answer}</p>{m.urgent && <span className="pill">Would escalate with configured channels</span>}</article>)}</section><section><h2>Sample FAQ</h2>{sampleFaqs.map(f => <article key={f.question}><h3>{f.question}</h3><p>{f.answer}</p></article>)}</section><footer>Twilio webhooks reject unsigned requests. Real message logging and notifications require configured Twilio, Supabase, and delivery credentials.</footer></main>;
}
