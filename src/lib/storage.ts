import { kv } from '@vercel/kv';

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

const SIGNUPS_KEY = 'signups';

export async function getSubmissions(): Promise<Submission[]> {
  const submissions = await kv.get<Submission[]>(SIGNUPS_KEY);
  return submissions || [];
}

export async function getSubmissionCount(): Promise<number> {
  const submissions = await getSubmissions();
  return submissions.length;
}

export async function saveSubmission(
  submission: Omit<Submission, 'id' | 'timestamp' | 'tshirtEligible' | 'emailSent'>
): Promise<{ submission: Submission; tshirtEligible: boolean }> {
  const submissions = await getSubmissions();
  const count = submissions.length;
  const tshirtEligible = count < 20;

  const newSubmission: Submission = {
    id: `signup_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    ...submission,
    timestamp: new Date().toISOString(),
    tshirtEligible,
    emailSent: false,
  };

  submissions.push(newSubmission);
  await kv.set(SIGNUPS_KEY, submissions);

  return { submission: newSubmission, tshirtEligible };
}

export async function markEmailSent(id: string): Promise<void> {
  const submissions = await getSubmissions();
  const index = submissions.findIndex((s) => s.id === id);

  if (index !== -1) {
    submissions[index].emailSent = true;
    await kv.set(SIGNUPS_KEY, submissions);
  }
}

export async function emailExists(email: string): Promise<boolean> {
  const submissions = await getSubmissions();
  return submissions.some((s) => s.email.toLowerCase() === email.toLowerCase());
}
