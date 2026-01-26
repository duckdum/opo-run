-- Create coach-specific data table
CREATE TABLE IF NOT EXISTS coach_profiles (
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE PRIMARY KEY,
  certifications text[],
  specialties text[],
  years_experience integer,
  max_clients integer DEFAULT 10,
  is_verified boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now()
);

-- Create index for verified coaches
CREATE INDEX IF NOT EXISTS coach_profiles_verified_idx ON coach_profiles(is_verified);
