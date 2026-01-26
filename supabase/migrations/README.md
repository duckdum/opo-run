# Supabase Database Migrations

This directory contains SQL migrations for the OPO.RUN authentication system.

## Running Migrations

### Option 1: Supabase Dashboard (Recommended for Production)

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor (left sidebar)
3. Run each migration file in order:
   - `001_create_profiles.sql`
   - `002_create_coach_profiles.sql`
   - `003_create_assignments.sql`
   - `004_enable_rls.sql`
   - `005_create_triggers.sql`

### Option 2: Supabase CLI (For Local Development)

```bash
# Install Supabase CLI if not already installed
npm install -g supabase

# Link to your project
supabase link --project-ref your-project-ref

# Run all migrations
supabase db push
```

## Migration Files

1. **001_create_profiles.sql** - Creates the profiles table for user data
2. **002_create_coach_profiles.sql** - Creates coach-specific data table
3. **003_create_assignments.sql** - Creates coach-runner assignment table
4. **004_enable_rls.sql** - Enables Row Level Security policies
5. **005_create_triggers.sql** - Creates triggers for auto-profile creation

## Verifying Migrations

After running migrations, verify in Supabase dashboard:

1. **Tables** - Check that profiles, coach_profiles, and coach_assignments tables exist
2. **Policies** - Verify RLS policies are enabled under "Authentication" > "Policies"
3. **Triggers** - Check that the `on_auth_user_created` trigger exists

## Rolling Back

If you need to rollback, run these commands in reverse order:

```sql
-- Drop triggers
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Drop policies (RLS will remain enabled)
DROP POLICY IF EXISTS "Coaches and admins can delete assignments" ON coach_assignments;
-- ... (drop all policies)

-- Drop tables
DROP TABLE IF EXISTS coach_assignments;
DROP TABLE IF EXISTS coach_profiles;
DROP TABLE IF EXISTS profiles;
```
