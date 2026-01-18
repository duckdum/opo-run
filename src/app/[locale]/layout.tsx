import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';
import SignUpModal from '@/components/SignUpModal';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Oporto Running Lab | Corre Melhor. Corre Sem Dor.',
  description:
    'Laboratorio de corrida em Leca da Palmeira. Treino tecnico, aulas de grupo e prescricao personalizada para correr melhor, com mais eficiencia e menos dores.',
  keywords: ['corrida', 'running', 'Porto', 'Leca da Palmeira', 'treino', 'tecnica de corrida'],
  openGraph: {
    title: 'Oporto Running Lab',
    description: 'Corre melhor. Corre sem dor. Corre para sempre.',
    type: 'website',
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth">
      <body className="bg-black text-white antialiased">
        <NextIntlClientProvider messages={messages}>
          <div className="noise-overlay" />
          {children}
          <SignUpModal />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
