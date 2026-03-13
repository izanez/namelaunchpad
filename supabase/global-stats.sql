create table if not exists public.nl_daily_stats (
  stat_date date primary key,
  total_generated bigint not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.nl_generator_usage (
  bucket text not null,
  bucket_key text not null,
  generator_slug text not null,
  run_count bigint not null default 0,
  usernames_generated bigint not null default 0,
  updated_at timestamptz not null default now(),
  primary key (bucket, bucket_key, generator_slug)
);

create table if not exists public.nl_username_trends (
  username text primary key,
  usage_count bigint not null default 0,
  updated_at timestamptz not null default now()
);

create or replace function public.nl_track_generation_event(
  p_generator_slug text,
  p_amount integer,
  p_usernames text[]
)
returns void
language plpgsql
security definer
as $$
declare
  today_key text := to_char(current_date, 'YYYY-MM-DD');
  week_key text := to_char(date_trunc('week', now() at time zone 'utc'), 'IYYY-"W"IW');
  month_key text := to_char(date_trunc('month', now() at time zone 'utc'), 'YYYY-MM');
  cleaned_username text;
begin
  insert into public.nl_daily_stats (stat_date, total_generated, updated_at)
  values (current_date, greatest(p_amount, 0), now())
  on conflict (stat_date)
  do update set
    total_generated = public.nl_daily_stats.total_generated + excluded.total_generated,
    updated_at = now();

  insert into public.nl_generator_usage (bucket, bucket_key, generator_slug, run_count, usernames_generated, updated_at)
  values
    ('all_time', 'all_time', p_generator_slug, 1, greatest(p_amount, 0), now()),
    ('today', today_key, p_generator_slug, 1, greatest(p_amount, 0), now()),
    ('week', week_key, p_generator_slug, 1, greatest(p_amount, 0), now()),
    ('month', month_key, p_generator_slug, 1, greatest(p_amount, 0), now())
  on conflict (bucket, bucket_key, generator_slug)
  do update set
    run_count = public.nl_generator_usage.run_count + 1,
    usernames_generated = public.nl_generator_usage.usernames_generated + excluded.usernames_generated,
    updated_at = now();

  foreach cleaned_username in array p_usernames
  loop
    cleaned_username := btrim(cleaned_username);
    if cleaned_username <> '' then
      insert into public.nl_username_trends (username, usage_count, updated_at)
      values (cleaned_username, 1, now())
      on conflict (username)
      do update set
        usage_count = public.nl_username_trends.usage_count + 1,
        updated_at = now();
    end if;
  end loop;
end;
$$;

create or replace function public.nl_get_stats_summary()
returns jsonb
language sql
security definer
as $$
  with
  today_total as (
    select coalesce(sum(total_generated), 0) as total
    from public.nl_daily_stats
    where stat_date = current_date
  ),
  all_time_usage as (
    select generator_slug as slug, run_count as count
    from public.nl_generator_usage
    where bucket = 'all_time' and bucket_key = 'all_time'
    order by run_count desc, generator_slug asc
    limit 50
  ),
  top_today as (
    select generator_slug as slug, run_count as count
    from public.nl_generator_usage
    where bucket = 'today' and bucket_key = to_char(current_date, 'YYYY-MM-DD')
    order by run_count desc, generator_slug asc
    limit 10
  ),
  top_week as (
    select generator_slug as slug, run_count as count
    from public.nl_generator_usage
    where bucket = 'week' and bucket_key = to_char(date_trunc('week', now() at time zone 'utc'), 'IYYY-"W"IW')
    order by run_count desc, generator_slug asc
    limit 10
  ),
  top_month as (
    select generator_slug as slug, run_count as count
    from public.nl_generator_usage
    where bucket = 'month' and bucket_key = to_char(date_trunc('month', now() at time zone 'utc'), 'YYYY-MM')
    order by run_count desc, generator_slug asc
    limit 10
  ),
  popular_names as (
    select username as name, usage_count as count
    from public.nl_username_trends
    order by usage_count desc, username asc
    limit 20
  ),
  total_generated as (
    select coalesce(sum(total_generated), 0) as total
    from public.nl_daily_stats
  )
  select jsonb_build_object(
    'totalUsernamesGenerated', (select total from total_generated),
    'dailyGenerationCount', (select total from today_total),
    'mostPopularUsernames', coalesce((select jsonb_agg(to_jsonb(popular_names)) from popular_names), '[]'::jsonb),
    'generatorUsage', coalesce((select jsonb_agg(to_jsonb(all_time_usage)) from all_time_usage), '[]'::jsonb),
    'mostUsedGenerator', coalesce((select to_jsonb(all_time_usage) from all_time_usage limit 1), 'null'::jsonb),
    'topGeneratorsToday', coalesce((select jsonb_agg(to_jsonb(top_today)) from top_today), '[]'::jsonb),
    'topGeneratorsThisWeek', coalesce((select jsonb_agg(to_jsonb(top_week)) from top_week), '[]'::jsonb),
    'topGeneratorsThisMonth', coalesce((select jsonb_agg(to_jsonb(top_month)) from top_month), '[]'::jsonb),
    'source', 'global'
  );
$$;
