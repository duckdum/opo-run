'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Play, X, Award, Briefcase } from 'lucide-react';

// Trainers data
const trainers = [
  {
    id: 1,
    name: 'Herval',
    role: {
      pt: 'Treinador Principal',
      en: 'Head Coach',
    },
    bio: {
      pt: 'Profissional de Educação Física dedicado ao desenvolvimento de corredores de todos os níveis. Com paixão pelo ensino e experiência comprovada, ajuda atletas a alcançarem os seus objetivos.',
      en: 'Physical Education professional dedicated to developing runners of all levels. With a passion for teaching and proven experience, helps athletes achieve their goals.',
    },
    qualifications: [
      { pt: 'Profissional de Educação Física', en: 'Physical Education Professional' },
      { pt: 'Professor de Corrida', en: 'Running Coach' },
    ],
    specialties: {
      pt: ['Técnica de Corrida', 'Treino Personalizado', 'Preparação para Provas'],
      en: ['Running Technique', 'Personalized Training', 'Race Preparation'],
    },
    video: '/videos/herval-coach.mp4',
  },
  {
    id: 2,
    name: 'Gabriela',
    role: {
      pt: 'Atleta & Coach',
      en: 'Athlete & Coach',
    },
    bio: {
      pt: 'Atleta na modalidade de corrida e estudante de Mestrado em Psicologia do Desporto. Combina experiência prática como atleta com conhecimento científico para potenciar o desempenho mental e físico.',
      en: 'Running athlete and Sports Psychology Masters student. Combines practical athlete experience with scientific knowledge to enhance mental and physical performance.',
    },
    qualifications: [
      { pt: 'Atleta de Corrida', en: 'Running Athlete' },
      { pt: 'Mestranda em Psicologia do Desporto', en: 'Sports Psychology Masters Student' },
    ],
    specialties: {
      pt: ['Psicologia do Desporto', 'Mentalidade de Atleta', 'Performance Mental'],
      en: ['Sports Psychology', 'Athlete Mindset', 'Mental Performance'],
    },
    video: '/videos/gabriela-coach.mp4',
  },
  {
    id: 3,
    name: 'Felipe Moura',
    role: {
      pt: 'Treinador de Atletismo',
      en: 'Athletics Coach',
    },
    bio: {
      pt: 'Especialista em atletismo com vasta experiência na modalidade. Traz conhecimento técnico e metodológico do atletismo para potenciar o desempenho dos corredores.',
      en: 'Athletics specialist with extensive experience in the sport. Brings technical and methodological knowledge from athletics to enhance runners\' performance.',
    },
    qualifications: [
      { pt: 'Especialista em Atletismo', en: 'Athletics Specialist' },
      { pt: 'Treinador de Corrida', en: 'Running Coach' },
    ],
    specialties: {
      pt: ['Atletismo', 'Velocidade', 'Técnica de Corrida'],
      en: ['Athletics', 'Speed Training', 'Running Technique'],
    },
    video: '/videos/felipe-coach.mp4',
  },
];

export default function TrainersPage() {
  const t = useTranslations('trainers');
  const locale = useLocale();
  const [selectedTrainer, setSelectedTrainer] = useState<number | null>(null);

  return (
    <>
      <Navigation />
      <main style={{ minHeight: '100vh', background: 'black', paddingTop: '8rem' }}>
        <div className="max-w-6xl mx-auto" style={{ paddingLeft: '2rem', paddingRight: '2rem', paddingBottom: '6rem' }}>
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

          {/* Trainers Grid */}
          <div className="trainers-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {trainers.map((trainer, index) => (
              <motion.div
                key={trainer.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  overflow: 'hidden',
                }}
              >
                {/* Video Thumbnail */}
                <div
                  onClick={() => setSelectedTrainer(trainer.id)}
                  style={{
                    position: 'relative',
                    height: '300px',
                    background: 'black',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    overflow: 'hidden',
                  }}
                >
                  {/* Video preview (muted, no controls) */}
                  <video
                    src={trainer.video}
                    muted
                    playsInline
                    preload="metadata"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'grayscale(30%)',
                    }}
                  />
                  {/* Dark overlay */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0,0,0,0.4)',
                  }} />
                  {/* Play button overlay */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    style={{
                      position: 'relative',
                      zIndex: 10,
                      width: '5rem',
                      height: '5rem',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.1)',
                      border: '2px solid rgba(255,255,255,0.8)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    <Play style={{ width: '2rem', height: '2rem', color: 'white', marginLeft: '0.25rem' }} />
                  </motion.div>
                  <span style={{
                    position: 'absolute',
                    bottom: '1rem',
                    left: '1rem',
                    fontSize: '0.75rem',
                    color: 'rgba(255,255,255,0.8)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    zIndex: 10,
                  }}>
                    {t('watchVideo')}
                  </span>
                </div>

                <div style={{ padding: '2rem' }}>
                  {/* Name & Role */}
                  <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.25rem' }}>{trainer.name}</h2>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                    {trainer.role[locale as 'pt' | 'en']}
                  </p>

                  {/* Bio */}
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                    {trainer.bio[locale as 'pt' | 'en']}
                  </p>

                  {/* Qualifications */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Award style={{ width: '0.875rem', height: '0.875rem' }} />
                      {t('qualifications')}
                    </h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {trainer.qualifications.map((qual, i) => (
                        <li key={i} style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', marginBottom: '0.25rem' }}>
                          • {qual[locale as 'pt' | 'en']}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Specialties */}
                  <div>
                    <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Briefcase style={{ width: '0.875rem', height: '0.875rem' }} />
                      {t('specialties')}
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {trainer.specialties[locale as 'pt' | 'en'].map((specialty, i) => (
                        <span key={i} style={{
                          padding: '0.375rem 0.75rem',
                          background: 'rgba(255,255,255,0.05)',
                          fontSize: '0.75rem',
                          color: 'rgba(255,255,255,0.7)',
                        }}>
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />

      {/* Video Modal */}
      <AnimatePresence>
        {selectedTrainer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedTrainer(null)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 50,
              background: 'rgba(0,0,0,0.95)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <button
              onClick={() => setSelectedTrainer(null)}
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                padding: '0.5rem',
                color: 'rgba(255,255,255,0.7)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <X style={{ width: '2rem', height: '2rem' }} />
            </button>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '800px',
                margin: '0 1.5rem',
              }}
            >
              <video
                src={trainers.find(t => t.id === selectedTrainer)?.video}
                controls
                autoPlay
                playsInline
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '80vh',
                  background: 'black',
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
