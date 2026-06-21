-- Waitlist signups
create table if not exists public.waitlist_signups (
	id uuid primary key default gen_random_uuid(),
	email text not null,
	source text not null check (source in ('hero', 'signup')),
	created_at timestamptz not null default now(),
	confirmation_sent_at timestamptz,
	constraint waitlist_signups_email_unique unique (email)
);

-- Feedback submissions
create table if not exists public.feedback (
	id uuid primary key default gen_random_uuid(),
	rating smallint not null check (rating >= 1 and rating <= 5),
	message text not null,
	email text,
	created_at timestamptz not null default now()
);

-- Enable RLS — no public policies; service role bypasses RLS for API writes
alter table public.waitlist_signups enable row level security;
alter table public.feedback enable row level security;

-- Revoke direct access from anon/authenticated roles
revoke all on public.waitlist_signups from anon, authenticated;
revoke all on public.feedback from anon, authenticated;
