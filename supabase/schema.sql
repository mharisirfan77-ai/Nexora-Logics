create table if not exists public.cms_state (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.cms_state enable row level security;

-- No public RLS policies are required because the Vercel serverless API
-- accesses this table with SUPABASE_SERVICE_ROLE_KEY on the server only.
