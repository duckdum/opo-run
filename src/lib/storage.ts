import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';

let supabase: SupabaseClient | null = null;

function getSupabase(): SupabaseClient {
  if (!supabase) {
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase credentials not configured');
    }
    supabase = createClient(supabaseUrl, supabaseKey);
  }
  return supabase;
}

export interface Submission {
  id: string;
  name: string;
  email: string;
  phone: string;
  experience: string;
  goals: string;
  timestamp: string;
  tshirtEligible: boolean;
  emailSent: boolean;
}

export async function getSubmissions(): Promise<Submission[]> {
  const { data, error } = await getSupabase()
    .from('signups')
    .select('*')
    .order('timestamp', { ascending: false });

  if (error) {
    console.error('Error fetching submissions:', error);
    return [];
  }

  return data.map((row) => ({
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone || '',
    experience: row.experience,
    goals: row.goals || '',
    timestamp: row.timestamp,
    tshirtEligible: row.tshirt_eligible,
    emailSent: row.email_sent,
  }));
}

export async function getSubmissionCount(): Promise<number> {
  const { count, error } = await getSupabase()
    .from('signups')
    .select('*', { count: 'exact', head: true });

  if (error) {
    console.error('Error counting submissions:', error);
    return 0;
  }

  return count || 0;
}

export async function saveSubmission(
  submission: Omit<Submission, 'id' | 'timestamp' | 'tshirtEligible' | 'emailSent'>
): Promise<{ submission: Submission; tshirtEligible: boolean }> {
  const count = await getSubmissionCount();
  const tshirtEligible = count < 20;

  const { data, error } = await getSupabase()
    .from('signups')
    .insert({
      name: submission.name,
      email: submission.email,
      phone: submission.phone || '',
      experience: submission.experience,
      goals: submission.goals || '',
      timestamp: new Date().toISOString(),
      tshirt_eligible: tshirtEligible,
      email_sent: false,
    })
    .select()
    .single();

  if (error) {
    console.error('Error saving submission:', error);
    throw new Error('Failed to save submission');
  }

  const newSubmission: Submission = {
    id: data.id,
    name: data.name,
    email: data.email,
    phone: data.phone || '',
    experience: data.experience,
    goals: data.goals || '',
    timestamp: data.timestamp,
    tshirtEligible: data.tshirt_eligible,
    emailSent: data.email_sent,
  };

  return { submission: newSubmission, tshirtEligible };
}

export async function markEmailSent(id: string): Promise<void> {
  const { error } = await getSupabase()
    .from('signups')
    .update({ email_sent: true })
    .eq('id', id);

  if (error) {
    console.error('Error marking email sent:', error);
  }
}

export async function emailExists(email: string): Promise<boolean> {
  const { data, error } = await getSupabase()
    .from('signups')
    .select('id')
    .ilike('email', email)
    .limit(1);

  if (error) {
    console.error('Error checking email:', error);
    return false;
  }

  return data.length > 0;
}
