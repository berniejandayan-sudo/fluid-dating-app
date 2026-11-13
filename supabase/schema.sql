-- ==============================================================================
-- FLUID DATING APP - SUPABASE DATABASE SCHEMA
-- ==============================================================================
-- Run this in the Supabase SQL Editor:
-- https://supabase.com/dashboard/project/pnhzkargitcdhadhvsqx/sql/new
-- ==============================================================================

-- 1. Create the `profiles` table
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  chosen_name text,
  email text,
  pronouns text[] default '{}',
  pledged_charter boolean default false,
  ghost_mode boolean default false,
  bio text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Enable Row Level Security (RLS)
alter table public.profiles enable row level security;

-- 3. Create RLS Policies
-- Allow authenticated users to view profiles
drop policy if exists "Authenticated users can view profiles" on public.profiles;
create policy "Authenticated users can view profiles"
  on public.profiles for select
  to authenticated
  using (true);

-- Allow users to insert their own profile
drop policy if exists "Users can insert their own profile" on public.profiles;
create policy "Users can insert their own profile"
  on public.profiles for insert
  to authenticated
  with check ((select auth.uid()) = id);

-- Allow users to update their own profile
drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
  on public.profiles for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- 4. Automatically sync new users from Supabase Auth into `public.profiles`
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, chosen_name, pronouns, pledged_charter, ghost_mode)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'chosen_name', ''),
    coalesce(
      (select array_agg(x) from jsonb_array_elements_text(coalesce(new.raw_user_meta_data->'pronouns', '[]'::jsonb)) as x),
      '{}'::text[]
    ),
    coalesce((new.raw_user_meta_data->>'pledged_charter')::boolean, false),
    coalesce((new.raw_user_meta_data->>'ghost_mode')::boolean, false)
  )
  on conflict (id) do update set
    email = excluded.email,
    chosen_name = coalesce(excluded.chosen_name, profiles.chosen_name),
    pronouns = coalesce(excluded.pronouns, profiles.pronouns),
    pledged_charter = coalesce(excluded.pledged_charter, profiles.pledged_charter),
    ghost_mode = coalesce(excluded.ghost_mode, profiles.ghost_mode),
    updated_at = now();
  return new;
end;
$$ language plpgsql security definer;

-- 5. Attach the trigger to auth.users
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
