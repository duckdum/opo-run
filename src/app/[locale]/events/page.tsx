'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Calendar, MapPin, Users, ArrowRight, Clock } from 'lucide-react';
import Image from 'next/image';

// Events data with premium Unsplash images
const upcomingEvents = [
  {
    id: 1,
    title: {
      pt: 'Treino de Grupo - Marginal',
      en: 'Group Training - Waterfront',
    },
    description: {
      pt: 'Treino de corrida em grupo pela marginal de Leça da Palmeira. Todos os níveis são bem-vindos.',
      en: 'Group running session along the Leça da Palmeira waterfront. All levels welcome.',
    },
    date: '2025-02-15',
    time: '08:00',
    location: 'Marginal de Leça da Palmeira',
    spots: 20,
    spotsLeft: 8,
    price: 0,
    image: 'https://images.unsplash.com/photo-1544899489-a083461b088c?w=800&q=80&auto=format&fit=crop',
  },
  {
    id: 2,
    title: {
      pt: 'Workshop de Técnica de Corrida',
      en: 'Running Technique Workshop',
    },
    description: {
      pt: 'Aprende os fundamentos da técnica de corrida com o nosso coach certificado. Inclui análise de vídeo.',
      en: 'Learn the fundamentals of running technique with our certified coach. Includes video analysis.',
    },
    date: '2025-02-22',
    time: '10:00',
    location: 'Oporto Running Lab',
    spots: 15,
    spotsLeft: 5,
    price: 25,
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=80&auto=format&fit=crop',
  },
  {
    id: 3,
    title: {
      pt: 'Corrida Noturna - Cidade do Porto',
      en: 'Night Run - Porto City',
    },
    description: {
      pt: 'Uma corrida especial pelas ruas iluminadas do Porto. Percurso de 10km passando pelos principais monumentos.',
      en: 'A special run through the illuminated streets of Porto. 10km route passing by major monuments.',
    },
    date: '2025-03-08',
    time: '20:30',
    location: 'Ribeira, Porto',
    spots: 30,
    spotsLeft: 18,
    price: 10,
    image: 'https://images.unsplash.com/photo-1555992336-03a23c7b20ee?w=800&q=80&auto=format&fit=crop',
  },
];

const pastEvents = [
  {
    id: 4,
    title: {
      pt: 'Sessão de Lançamento',
      en: 'Launch Session',
    },
    date: '2025-01-10',
    location: 'Leça da Palmeira',
    image: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=800&q=80&auto=format&fit=crop',
    attendees: 45,
  },
  {
    id: 5,
    title: {
      pt: 'Treino de Ano Novo',
      en: 'New Year Training',
    },
    date: '2025-01-01',
    location: 'Foz do Douro',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80&auto=format&fit=crop',
    attendees: 32,
  },
];

function formatDate(dateStr: string, locale: string = 'pt') {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale === 'pt' ? 'pt-PT' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function EventsPage() {
  const t = useTranslations('events');
  const locale = useLocale();

  return (
    <>
      <Navigation />
      <main style={{ minHeight: '100vh', background: 'black', paddingTop: '8rem' }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem', paddingBottom: '6rem' }}>
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
            style={{ marginBottom: '5rem' }}
          >
            <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '1rem' }}>
              {t('title')}
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.5)' }}>{t('subtitle')}</p>
          </motion.div>

          {/* Upcoming Events */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ marginBottom: '5rem' }}
          >
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Calendar style={{ width: '1.5rem', height: '1.5rem', color: 'rgba(255,255,255,0.5)' }} />
              {t('upcoming')}
            </h2>

            {upcomingEvents.length > 0 ? (
              <div className="events-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
                {upcomingEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    whileHover={{ y: -8 }}
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.05)',
                      overflow: 'hidden',
                      transition: 'border-color 0.3s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)')}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}
                  >
                    {/* Event Image */}
                    <div style={{
                      height: '200px',
                      position: 'relative',
                      overflow: 'hidden',
                    }}>
                      <Image
                        src={event.image}
                        alt={event.title[locale as 'pt' | 'en']}
                        fill
                        style={{ objectFit: 'cover', transition: 'transform 0.5s' }}
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)',
                      }} />
                      {/* Price badge */}
                      <div style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        padding: '0.5rem 1rem',
                        background: event.price === 0 ? 'rgba(34,197,94,0.9)' : 'rgba(255,255,255,0.9)',
                        color: event.price === 0 ? 'white' : 'black',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                      }}>
                        {event.price === 0 ? t('free') : `${event.price}€`}
                      </div>
                    </div>

                    <div style={{ padding: '1.5rem' }}>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                        {event.title[locale as 'pt' | 'en']}
                      </h3>
                      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                        {event.description[locale as 'pt' | 'en']}
                      </p>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>
                          <Calendar style={{ width: '1rem', height: '1rem' }} />
                          {formatDate(event.date, locale)}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>
                          <Clock style={{ width: '1rem', height: '1rem' }} />
                          {event.time}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>
                          <MapPin style={{ width: '1rem', height: '1rem' }} />
                          {event.location}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>
                          <Users style={{ width: '1rem', height: '1rem' }} />
                          {event.spotsLeft} {t('spotsLeft')}
                        </div>
                      </div>

                      <button style={{
                        width: '100%',
                        padding: '0.875rem 1.5rem',
                        background: 'white',
                        color: 'black',
                        fontWeight: 500,
                        fontSize: '0.875rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        transition: 'background 0.2s',
                      }}>
                        {t('register')}
                        <ArrowRight style={{ width: '1rem', height: '1rem' }} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', padding: '3rem' }}>{t('noEvents')}</p>
            )}
          </motion.section>

          {/* Past Events */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem', color: 'rgba(255,255,255,0.6)' }}>
              {t('past')}
            </h2>

            {pastEvents.length > 0 ? (
              <div className="events-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                {pastEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      overflow: 'hidden',
                      opacity: 0.8,
                    }}
                  >
                    {/* Past Event Image */}
                    <div style={{
                      height: '160px',
                      position: 'relative',
                      overflow: 'hidden',
                    }}>
                      <Image
                        src={event.image}
                        alt={event.title[locale as 'pt' | 'en']}
                        fill
                        style={{ objectFit: 'cover', filter: 'grayscale(30%)' }}
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)',
                      }} />
                    </div>
                    <div style={{ padding: '1.25rem' }}>
                      <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                        {event.title[locale as 'pt' | 'en']}
                      </h4>
                      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem' }}>{formatDate(event.date, locale)}</p>
                      <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.875rem' }}>{event.location}</p>
                      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', marginTop: '0.5rem' }}>
                        {event.attendees} {locale === 'pt' ? 'participantes' : 'participants'}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : null}
          </motion.section>
        </div>
      </main>
      <Footer />
    </>
  );
}
