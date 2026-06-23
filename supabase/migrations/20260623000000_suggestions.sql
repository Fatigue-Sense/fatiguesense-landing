-- User feature suggestions
create table if not exists public.suggestions (
	id uuid primary key default gen_random_uuid(),
	suggestion text not null,
	email text,
	created_at timestamptz not null default now()
);

-- Enable RLS - no public policies; service role bypasses RLS for API writes
alter table public.suggestions enable row level security;

-- Revoke direct access from anon/authenticated roles
revoke all on public.suggestions from anon, authenticated;
