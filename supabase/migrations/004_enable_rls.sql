-- Enable Row Level Security on profiles table
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Public profiles are viewable by everyone
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Users can update own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Admins can update any profile
CREATE POLICY "Admins can update any profile"
  ON profiles FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Enable RLS on coach_profiles table
ALTER TABLE coach_profiles ENABLE ROW LEVEL SECURITY;

-- Authenticated users can view coach profiles
CREATE POLICY "Authenticated users can view coach profiles"
  ON coach_profiles FOR SELECT
  TO authenticated
  USING (true);

-- Coaches can insert their own coach profile
CREATE POLICY "Coaches can insert own coach profile"
  ON coach_profiles FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('coach', 'admin')
    )
  );

-- Coaches can update own coach profile
CREATE POLICY "Coaches can update own coach profile"
  ON coach_profiles FOR UPDATE
  USING (
    auth.uid() = user_id
    OR EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Admins can update any coach profile
CREATE POLICY "Admins can update any coach profile"
  ON coach_profiles FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Enable RLS on coach_assignments table
ALTER TABLE coach_assignments ENABLE ROW LEVEL SECURITY;

-- Users can view their own assignments (as coach or runner)
CREATE POLICY "Users can view their assignments"
  ON coach_assignments FOR SELECT
  USING (
    auth.uid() = coach_id OR auth.uid() = runner_id
  );

-- Coaches and admins can create assignments
CREATE POLICY "Coaches and admins can create assignments"
  ON coach_assignments FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('coach', 'admin')
    )
  );

-- Coaches can update their own assignments
CREATE POLICY "Coaches can update their assignments"
  ON coach_assignments FOR UPDATE
  USING (
    auth.uid() = coach_id
    OR EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Coaches and admins can delete assignments
CREATE POLICY "Coaches and admins can delete assignments"
  ON coach_assignments FOR DELETE
  USING (
    auth.uid() = coach_id
    OR EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );
