create table if not exists faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  created_at timestamptz not null default now()
);
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  channel text not null check (channel in ('voice','sms','whatsapp')),
  external_id text not null unique,
  from_number text not null,
  body text not null,
  answer text not null,
  urgent boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists messages_created_at_idx on messages (created_at desc);
alter table faqs enable row level security;
alter table messages enable row level security;
-- Service role access only. Add scoped policies before exposing direct client access.
