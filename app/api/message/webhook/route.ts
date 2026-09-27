import twilio from 'twilio';
import { formParams, verify, getFaqs, handleText, logMessage, escalate } from '../../../../lib/webhook';
export const runtime = 'nodejs';
export async function POST(request: Request) {
  const params = formParams(await request.formData());
  if (!verify(request, params)) return new Response('Unauthorized', { status: 401 });
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return new Response('Storage unavailable', { status: 503 });
  const body = (params.Body ?? '').slice(0, 4000); const result = await handleText(body, await getFaqs());
  await logMessage({ channel: params.From?.startsWith('whatsapp:') ? 'whatsapp' : 'sms', external_id: params.MessageSid ?? crypto.randomUUID(), from_number: params.From ?? '', body, answer: result.answer, urgent: result.urgent });
  if (result.urgent) await escalate(body);
  const response = new twilio.twiml.MessagingResponse(); response.message(result.answer);
  return new Response(response.toString(), { headers: { 'Content-Type': 'text/xml' } });
}
