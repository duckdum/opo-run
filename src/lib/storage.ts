import { promises as fs } from 'fs';
import path from 'path';

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

const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const SIGNUPS_FILE = path.join(DATA_DIR, 'signups.json');

async function ensureDataFile(): Promise<void> {
  try {
    await fs.access(SIGNUPS_FILE);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(SIGNUPS_FILE, JSON.stringify({ submissions: [] }, null, 2));
  }
}

export async function getSubmissions(): Promise<Submission[]> {
  await ensureDataFile();
  const data = await fs.readFile(SIGNUPS_FILE, 'utf-8');
  const parsed = JSON.parse(data);
  return parsed.submissions || [];
}

export async function getSubmissionCount(): Promise<number> {
  const submissions = await getSubmissions();
  return submissions.length;
}

export async function saveSubmission(
  submission: Omit<Submission, 'id' | 'timestamp' | 'tshirtEligible' | 'emailSent'>
): Promise<{ submission: Submission; tshirtEligible: boolean }> {
  await ensureDataFile();

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
  await fs.writeFile(SIGNUPS_FILE, JSON.stringify({ submissions }, null, 2));

  return { submission: newSubmission, tshirtEligible };
}

export async function markEmailSent(id: string): Promise<void> {
  const submissions = await getSubmissions();
  const index = submissions.findIndex((s) => s.id === id);

  if (index !== -1) {
    submissions[index].emailSent = true;
    await fs.writeFile(SIGNUPS_FILE, JSON.stringify({ submissions }, null, 2));
  }
}

export async function emailExists(email: string): Promise<boolean> {
  const submissions = await getSubmissions();
  return submissions.some((s) => s.email.toLowerCase() === email.toLowerCase());
}
