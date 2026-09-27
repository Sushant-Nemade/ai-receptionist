# AI Receptionist

Next.js receptionist with Twilio Voice and Messaging webhook routes, signature validation, FAQ lookup, Supabase log schema, urgent keyword escalation, optional GPT-4o answering, and optional Twilio SMS/SendGrid alerts. The public page is a local simulator only.

Run `pnpm install`, `pnpm --filter ai-receptionist dev`, and open `http://127.0.0.1:3001`. Copy `.env.example` to `.env` to configure integrations. Apply `schema.sql` in Supabase. Set `PUBLIC_BASE_URL` to the exact HTTPS origin configured in Twilio. Configure Twilio Voice POST to `/api/voice/webhook` and Messaging POST to `/api/message/webhook`.

The webhook handlers refuse unsigned requests and refuse to process without storage. Real phone, SMS, FAQ database, AI, and escalation flows have not been verified because credentials are absent. Do not route customer calls to this preview before end-to-end tests and privacy/retention review. The public Quick Tunnel is temporary and can change URL.
