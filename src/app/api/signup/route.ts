import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, email, phone, experience, goals } = body;

    // Validate required fields
    if (!name || !email || !experience) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Here you would typically:
    // 1. Store in database
    // 2. Send confirmation email
    // 3. Add to mailing list (Mailchimp, etc.)
    // 4. Send notification to team

    // For now, just log the submission
    console.log('New signup:', { name, email, phone, experience, goals });

    // Example: Send to external service
    // await fetch('https://your-backend.com/api/signups', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ name, email, phone, experience, goals }),
    // });

    return NextResponse.json({ success: true, message: 'Signup successful' }, { status: 200 });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
