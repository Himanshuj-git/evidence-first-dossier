create table if not exists public.purchases (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  stripe_session_id text not null unique,
  stripe_payment_intent_id text,
  amount_cents integer,
  currency text,
  dossier_id text,
  access_token uuid not null unique default gen_random_uuid(),
  environment text not null default 'sandbox',
  status text not null default 'paid',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_purchases_access_token on public.purchases(access_token);
create index if not exists idx_purchases_email on public.purchases(email);

alter table public.purchases enable row level security;

-- No public access. Only service role (used by server functions) can read/write.
create policy "Service role manages purchases"
  on public.purchases for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');
