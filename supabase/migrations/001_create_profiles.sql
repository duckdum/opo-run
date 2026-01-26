-- Create profiles table for public user data
CREATE TABLE IF NOT EXISTS profiles (
  id uuid REFERENCES auth.users(id) PRIMARY KEY,
  role text NOT NULL DEFAULT 'runner' CHECK (role IN ('runner', 'coach', 'admin')),
  full_name text NOT NULL,
  phone text,
  avatar_url text,
  experience_level text CHECK (experience_level IN ('beginner', 'intermediate', 'advanced')),
  goals text,
  bio text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create index on role for faster queries
CREATE INDEX IF NOT EXISTS profiles_role_idx ON profiles(role);

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
