create table audits (
  id uuid primary key default gen_random_uuid(),
  tools jsonb not null,
  total_monthly_savings numeric,
  total_annual_savings numeric,
  ai_summary text,
  public_slug text unique,
  created_at timestamp default now()
);

create table leads (
  id uuid primary key default gen_random_uuid(),
  audit_id uuid references audits(id),
  email text not null,
  company text,
  role text,
  team_size integer,
  created_at timestamp default now()
);

create table public_reports (
  id uuid primary key default gen_random_uuid(),
  audit_id uuid references audits(id),
  public_slug text unique,
  sanitized_data jsonb,
  created_at timestamp default now()
);
