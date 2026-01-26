-- Create coach-runner assignments table
CREATE TABLE IF NOT EXISTS coach_assignments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  coach_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  runner_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  assigned_at timestamp with time zone DEFAULT now(),
  is_active boolean DEFAULT true,
  UNIQUE(coach_id, runner_id)
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS coach_assignments_coach_idx ON coach_assignments(coach_id);
CREATE INDEX IF NOT EXISTS coach_assignments_runner_idx ON coach_assignments(runner_id);
CREATE INDEX IF NOT EXISTS coach_assignments_active_idx ON coach_assignments(is_active);
