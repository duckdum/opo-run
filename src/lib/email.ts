import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailParams {
  recipient: string;
  name: string;
  locale: 'en' | 'pt';
  tshirtEligible: boolean;
}

const content = {
  en: {
    subject: 'Welcome to OPO.RUN - You\'re In!',
    preheader: 'Thank you for joining the OPO.RUN launch',
    greeting: (name: string) => `Hi ${name},`,
    welcome: 'Welcome to the OPO.RUN family! We\'re thrilled to have you join us on this journey.',
    tshirtYes: '🎉 Great news! You\'re among our first 20 members, which means you\'ll receive an exclusive OPO.RUN t-shirt and a special founding member discount!',
    tshirtNo: 'Thank you for signing up! As a founding member, you\'ll receive a special discount when we launch.',
    launchTitle: 'What\'s Coming',
    launchText: 'We\'re launching in February 2025 in Leça da Palmeira, Porto. Get ready for a running experience like no other.',
    packagesTitle: 'Our Packages',
    packages: [
      { name: 'Starter', desc: 'Perfect for beginners - 2 group classes/week' },
      { name: 'Evolution', desc: 'For consistent progress - 3 group classes/week + strength sessions' },
      { name: 'Performance', desc: 'For race preparation - Unlimited classes + premium support' },
      { name: 'Online Mentoring', desc: 'Train from anywhere - Weekly video sessions + personalized plans' },
    ],
    locationTitle: 'Find Us',
    locationText: 'Leça da Palmeira, Porto, Portugal',
    closing: 'We\'ll be in touch soon with more details. In the meantime, follow us on social media for updates!',
    signature: 'The OPO.RUN Team',
    tagline: 'Run better. Run pain-free. Run forever.',
    followUs: 'Follow us:',
  },
  pt: {
    subject: 'Bem-vindo ao OPO.RUN - Estás Dentro!',
    preheader: 'Obrigado por te juntares ao lançamento do OPO.RUN',
    greeting: (name: string) => `Olá ${name},`,
    welcome: 'Bem-vindo à família OPO.RUN! Estamos muito felizes por te teres juntado a nós nesta jornada.',
    tshirtYes: '🎉 Ótimas notícias! Estás entre os nossos primeiros 20 membros, o que significa que vais receber uma t-shirt exclusiva OPO.RUN e um desconto especial de membro fundador!',
    tshirtNo: 'Obrigado por te inscreveres! Como membro fundador, vais receber um desconto especial quando lançarmos.',
    launchTitle: 'O Que Aí Vem',
    launchText: 'Vamos lançar em Fevereiro de 2025 em Leça da Palmeira, Porto. Prepara-te para uma experiência de corrida única.',
    packagesTitle: 'Os Nossos Pacotes',
    packages: [
      { name: 'Starter', desc: 'Perfeito para iniciantes - 2 aulas de grupo/semana' },
      { name: 'Evolution', desc: 'Para progresso consistente - 3 aulas de grupo/semana + sessões de força' },
      { name: 'Performance', desc: 'Para preparação de provas - Aulas ilimitadas + acompanhamento premium' },
      { name: 'Mentoria Online', desc: 'Treina de qualquer lugar - Sessões de vídeo semanais + planos personalizados' },
    ],
    locationTitle: 'Encontra-nos',
    locationText: 'Leça da Palmeira, Porto, Portugal',
    closing: 'Entraremos em contacto em breve com mais detalhes. Entretanto, segue-nos nas redes sociais para atualizações!',
    signature: 'A Equipa OPO.RUN',
    tagline: 'Corre melhor. Corre sem dor. Corre para sempre.',
    followUs: 'Segue-nos:',
  },
};

function generateEmailHtml({ name, locale, tshirtEligible }: Omit<EmailParams, 'recipient'>): string {
  const t = content[locale];

  // Inline SVG logo as base64 for better email client compatibility
  const logoSvg = `<svg width="200" height="50" viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg">
    <text x="50" y="68" font-family="Arial, Helvetica, sans-serif" font-size="48" font-weight="900" fill="#ffffff" letter-spacing="-1">OPO</text>
    <circle cx="175" cy="58" r="5" fill="#666666"/>
    <text x="190" y="68" font-family="Arial, Helvetica, sans-serif" font-size="48" font-weight="300" fill="#ffffff" letter-spacing="3">RUN</text>
  </svg>`;
  const logoBase64 = Buffer.from(logoSvg).toString('base64');

  return `
<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="dark">
  <title>${t.subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #000000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #000000; color: #ffffff;">

    <!-- Header -->
    <div style="padding: 40px 30px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.1);">
      <img src="data:image/svg+xml;base64,${logoBase64}" alt="OPO.RUN" width="200" style="max-width: 200px; height: auto;" />
    </div>

    <!-- Main Content -->
    <div style="padding: 40px 30px;">

      <!-- Greeting -->
      <p style="font-size: 18px; margin: 0 0 20px 0; color: #ffffff;">
        ${t.greeting(name)}
      </p>

      <p style="font-size: 16px; line-height: 1.6; margin: 0 0 25px 0; color: rgba(255,255,255,0.8);">
        ${t.welcome}
      </p>

      <!-- T-shirt Status -->
      <div style="background: ${tshirtEligible ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.05)'}; padding: 20px; margin: 0 0 30px 0; border-left: 3px solid ${tshirtEligible ? '#22c55e' : 'rgba(255,255,255,0.3)'};">
        <p style="font-size: 16px; line-height: 1.6; margin: 0; color: ${tshirtEligible ? '#4ade80' : 'rgba(255,255,255,0.8)'};">
          ${tshirtEligible ? t.tshirtYes : t.tshirtNo}
        </p>
      </div>

      <!-- Launch Info -->
      <h2 style="font-size: 20px; font-weight: 700; margin: 0 0 15px 0; color: #ffffff; text-transform: uppercase; letter-spacing: 0.05em;">
        ${t.launchTitle}
      </h2>
      <p style="font-size: 16px; line-height: 1.6; margin: 0 0 30px 0; color: rgba(255,255,255,0.8);">
        ${t.launchText}
      </p>

      <!-- Packages -->
      <h2 style="font-size: 20px; font-weight: 700; margin: 0 0 15px 0; color: #ffffff; text-transform: uppercase; letter-spacing: 0.05em;">
        ${t.packagesTitle}
      </h2>
      <div style="margin: 0 0 30px 0;">
        ${t.packages.map(pkg => `
          <div style="padding: 15px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
            <strong style="color: #ffffff; font-size: 15px;">${pkg.name}</strong>
            <p style="margin: 5px 0 0 0; font-size: 14px; color: rgba(255,255,255,0.6);">${pkg.desc}</p>
          </div>
        `).join('')}
      </div>

      <!-- Location -->
      <h2 style="font-size: 20px; font-weight: 700; margin: 0 0 15px 0; color: #ffffff; text-transform: uppercase; letter-spacing: 0.05em;">
        ${t.locationTitle}
      </h2>
      <p style="font-size: 16px; line-height: 1.6; margin: 0 0 30px 0; color: rgba(255,255,255,0.8);">
        📍 ${t.locationText}
      </p>

      <!-- Closing -->
      <p style="font-size: 16px; line-height: 1.6; margin: 0 0 25px 0; color: rgba(255,255,255,0.8);">
        ${t.closing}
      </p>

      <p style="font-size: 16px; margin: 0; color: #ffffff;">
        ${t.signature}
      </p>
    </div>

    <!-- Footer -->
    <div style="padding: 30px; text-align: center; border-top: 1px solid rgba(255,255,255,0.1);">
      <p style="font-size: 12px; margin: 0 0 15px 0; color: rgba(255,255,255,0.5); font-style: italic;">
        "${t.tagline}"
      </p>

      <p style="font-size: 12px; margin: 0 0 10px 0; color: rgba(255,255,255,0.5);">
        ${t.followUs}
      </p>

      <div style="margin: 0 0 20px 0;">
        <a href="https://instagram.com/opo.run" style="color: #ffffff; text-decoration: none; margin: 0 10px; font-size: 14px;">Instagram</a>
        <a href="https://strava.com/clubs/oporun" style="color: #ffffff; text-decoration: none; margin: 0 10px; font-size: 14px;">Strava</a>
      </div>

      <p style="font-size: 11px; margin: 0; color: rgba(255,255,255,0.3);">
        OPO.RUN | Leça da Palmeira, Porto, Portugal
      </p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

export async function sendConfirmationEmail({
  recipient,
  name,
  locale,
  tshirtEligible,
}: EmailParams): Promise<{ success: boolean; error?: string }> {
  const t = content[locale];

  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not configured. Skipping email send.');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const { error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'OPO.RUN <hello@oporto.run>',
      to: recipient,
      subject: t.subject,
      html: generateEmailHtml({ name, locale, tshirtEligible }),
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error('Email send error:', err);
    return { success: false, error: 'Failed to send email' };
  }
}

// Welcome email for new authenticated users
interface WelcomeEmailParams {
  recipient: string;
  name: string;
  locale: 'en' | 'pt';
  role: 'runner' | 'coach';
}

export async function sendWelcomeEmail({
  recipient,
  name,
  locale,
  role,
}: WelcomeEmailParams): Promise<{ success: boolean; error?: string }> {
  const isCoach = role === 'coach';

  const subject = locale === 'pt'
    ? `Bem-vindo ao OPO.RUN${isCoach ? ' - Conta de Treinador Criada' : ''}!`
    : `Welcome to OPO.RUN${isCoach ? ' - Coach Account Created' : ''}!`;

  const greeting = locale === 'pt' ? `Olá ${name}` : `Hi ${name}`;

  const welcomeText = locale === 'pt'
    ? isCoach
      ? 'A tua conta de treinador foi criada com sucesso! Estamos muito felizes por te teres juntado à equipa OPO.RUN.'
      : 'A tua conta foi criada com sucesso! Bem-vindo à família OPO.RUN. Estamos ansiosos por te ajudar a atingir os teus objetivos de corrida.'
    : isCoach
      ? 'Your coach account has been created successfully! We\'re thrilled to have you join the OPO.RUN team.'
      : 'Your account has been created successfully! Welcome to the OPO.RUN family. We\'re excited to help you achieve your running goals.';

  const nextSteps = locale === 'pt'
    ? isCoach
      ? 'Em breve serás contactado pelo administrador para começares a trabalhar com os teus corredores.'
      : 'Completa o teu perfil e começa a explorar a plataforma. Entraremos em contacto em breve com mais informações.'
    : isCoach
      ? 'You\'ll be contacted by an administrator soon to start working with your runners.'
      : 'Complete your profile and start exploring the platform. We\'ll be in touch soon with more information.';

  const ctaText = locale === 'pt' ? 'Ir para o Dashboard' : 'Go to Dashboard';
  const ctaUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://opo.run'}/dashboard`;

  const html = `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; background-color: #000; color: #fff; padding: 40px;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #111; padding: 40px; border-radius: 8px;">
    <h1 style="color: #fff; margin-bottom: 20px;">${subject}</h1>
    <p style="font-size: 16px; line-height: 1.6; color: #ddd;">${greeting},</p>
    <p style="font-size: 16px; line-height: 1.6; color: #ddd;">${welcomeText}</p>
    <p style="font-size: 16px; line-height: 1.6; color: #ddd;">${nextSteps}</p>
    <a href="${ctaUrl}" style="display: inline-block; margin-top: 30px; padding: 15px 30px; background-color: #3b82f6; color: #fff; text-decoration: none; border-radius: 6px; font-weight: 600;">${ctaText}</a>
    <p style="margin-top: 40px; font-size: 14px; color: #888;">The OPO.RUN Team</p>
  </div>
</body>
</html>
  `;

  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not configured. Skipping email send.');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const { error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'OPO.RUN <hello@oporto.run>',
      to: recipient,
      subject,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error('Email send error:', err);
    return { success: false, error: 'Failed to send email' };
  }
}

// Coach invitation email
interface CoachInviteParams {
  recipient: string;
  inviterName: string;
  locale: 'en' | 'pt';
}

export async function sendCoachInviteEmail({
  recipient,
  inviterName,
  locale,
}: CoachInviteParams): Promise<{ success: boolean; error?: string }> {
  const subject = locale === 'pt'
    ? 'Convite para ser Treinador no OPO.RUN'
    : 'Invitation to Join OPO.RUN as a Coach';

  const greeting = locale === 'pt' ? 'Olá' : 'Hello';

  const inviteText = locale === 'pt'
    ? `${inviterName} convidou-te para seres treinador na plataforma OPO.RUN.`
    : `${inviterName} has invited you to become a coach on the OPO.RUN platform.`;

  const descriptionText = locale === 'pt'
    ? 'Como treinador, terás acesso a ferramentas para gerir os teus corredores, criar planos de treino personalizados e acompanhar o progresso deles.'
    : 'As a coach, you\'ll have access to tools for managing your runners, creating personalized training plans, and tracking their progress.';

  const ctaText = locale === 'pt' ? 'Aceitar Convite e Criar Conta' : 'Accept Invite & Create Account';
  const ctaUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://opo.run'}/signup?role=coach&email=${encodeURIComponent(recipient)}`;

  const html = `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; background-color: #000; color: #fff; padding: 40px;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #111; padding: 40px; border-radius: 8px;">
    <h1 style="color: #fff; margin-bottom: 20px;">${subject}</h1>
    <p style="font-size: 16px; line-height: 1.6; color: #ddd;">${greeting},</p>
    <p style="font-size: 16px; line-height: 1.6; color: #ddd;">${inviteText}</p>
    <p style="font-size: 16px; line-height: 1.6; color: #ddd;">${descriptionText}</p>
    <a href="${ctaUrl}" style="display: inline-block; margin-top: 30px; padding: 15px 30px; background-color: #22c55e; color: #fff; text-decoration: none; border-radius: 6px; font-weight: 600;">${ctaText}</a>
    <p style="margin-top: 40px; font-size: 14px; color: #888;">The OPO.RUN Team</p>
  </div>
</body>
</html>
  `;

  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not configured. Skipping email send.');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const { error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'OPO.RUN <hello@oporto.run>',
      to: recipient,
      subject,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error('Email send error:', err);
    return { success: false, error: 'Failed to send email' };
  }
}
