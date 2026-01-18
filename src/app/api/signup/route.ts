import { NextRequest, NextResponse } from 'next/server';
import { saveSubmission, markEmailSent, emailExists } from '@/lib/storage';
import { sendConfirmationEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, experience, goals } = body;

    // Validate required fields
    if (!name || !email || !experience) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check for duplicate email
    const isDuplicate = await emailExists(email);
    if (isDuplicate) {
      return NextResponse.json(
        { success: false, error: 'Email already registered' },
        { status: 409 }
      );
    }

    // Save submission to JSON storage
    const { submission, tshirtEligible } = await saveSubmission({
      name,
      email,
      phone: phone || '',
      experience,
      goals: goals || '',
    });

    // Determine locale from Accept-Language header
    const acceptLanguage = request.headers.get('accept-language') || '';
    const locale: 'en' | 'pt' = acceptLanguage.toLowerCase().includes('pt') ? 'pt' : 'en';

    // Send confirmation email
    let emailSent = false;
    const emailResult = await sendConfirmationEmail({
      recipient: email,
      name,
      locale,
      tshirtEligible,
    });

    if (emailResult.success) {
      emailSent = true;
      await markEmailSent(submission.id);
    } else {
      console.warn('Email not sent:', emailResult.error);
    }

    console.log('New signup:', {
      id: submission.id,
      name,
      email,
      experience,
      tshirtEligible,
      emailSent,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Signup successful',
        tshirtEligible,
        emailSent,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
