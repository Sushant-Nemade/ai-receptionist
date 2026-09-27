import twilio from 'twilio';
import { formParams, verify, getFaqs, handleText, logMessage, escalate } from '../../../../lib/webhook';
export const runtime = 'nodejs';
export async function POST(request: Request) {
  const params = formParams(await request.formData());
  if (!verify(request, params)) return new Response('Unauthorized', { status: 401 });
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return new Response('Storage unavailable', { status: 503 });
  const response = new twilio.twiml.VoiceResponse();
  if (!params.SpeechResult) { const gather = response.gather({ input: ['speech'], action: '/api/voice/webhook', method: 'POST', speechTimeout: 'auto' }); gather.say('Hello. Please tell me how I can help.'); response.say('Sorry, I did not hear anything. Goodbye.'); return new Response(response.toString(), { headers: { 'Content-Type': 'text/xml' } }); }
  const body = params.SpeechResult.slice(0, 4000); const result = await handleText(body, await getFaqs());
  await logMessage({ channel: 'voice', external_id: `${params.CallSid ?? crypto.randomUUID()}:${params.SequenceNumber ?? '1'}`, from_number: params.From ?? '', body, answer: result.answer, urgent: result.urgent });
  if (result.urgent) await escalate(body);
  response.say(result.answer); response.hangup();
  return new Response(response.toString(), { headers: { 'Content-Type': 'text/xml' } });
}
