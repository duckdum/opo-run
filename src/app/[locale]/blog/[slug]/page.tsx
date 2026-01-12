'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Clock, ArrowLeft, User, Calendar } from 'lucide-react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import { getPostBySlug } from '@/data/blog-posts';
import { notFound } from 'next/navigation';

function formatDate(dateStr: string, locale: string = 'pt') {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale === 'pt' ? 'pt-PT' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function BlogPostPage() {
  const t = useTranslations('blog');
  const locale = useLocale();
  const params = useParams();
  const slug = params.slug as string;

  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Navigation />
      <main style={{ minHeight: '100vh', background: 'black', paddingTop: '6rem' }}>
        {/* Hero Image */}
        <div style={{ position: 'relative', height: '50vh', minHeight: '400px' }}>
          <Image
            src={post.image}
            alt={post.title[locale as 'pt' | 'en']}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, black 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.5) 100%)',
          }} />
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto" style={{ padding: '0 2rem', marginTop: '-8rem', position: 'relative', zIndex: 10 }}>
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: '2rem' }}
          >
            <Link
              href="/blog"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'rgba(255,255,255,0.6)',
                fontSize: '0.875rem',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
            >
              <ArrowLeft style={{ width: '1rem', height: '1rem' }} />
              {t('backToBlog')}
            </Link>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 800,
              lineHeight: 1.2,
              marginBottom: '1.5rem',
            }}
          >
            {post.title[locale as 'pt' | 'en']}
          </motion.h1>

          {/* Meta */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1.5rem',
              marginBottom: '3rem',
              paddingBottom: '2rem',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem' }}>
              <User style={{ width: '1rem', height: '1rem' }} />
              {post.author}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem' }}>
              <Calendar style={{ width: '1rem', height: '1rem' }} />
              {formatDate(post.date, locale)}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem' }}>
              <Clock style={{ width: '1rem', height: '1rem' }} />
              {post.readTime} {t('minRead')}
            </span>
          </motion.div>

          {/* Content */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              fontSize: '1.1rem',
              lineHeight: 1.8,
              color: 'rgba(255,255,255,0.85)',
              paddingBottom: '4rem',
            }}
          >
            {post.content[locale as 'pt' | 'en'].split('\n\n').map((paragraph, index) => {
              // Check if it's a heading
              if (paragraph.startsWith('## ')) {
                return (
                  <h2
                    key={index}
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      marginTop: '2.5rem',
                      marginBottom: '1rem',
                      color: 'white',
                    }}
                  >
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('### ')) {
                return (
                  <h3
                    key={index}
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      marginTop: '2rem',
                      marginBottom: '0.75rem',
                      color: 'white',
                    }}
                  >
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              // Check if it's a list
              if (paragraph.includes('\n1. ') || paragraph.includes('\n- ')) {
                const lines = paragraph.split('\n');
                return (
                  <div key={index} style={{ marginBottom: '1.5rem' }}>
                    {lines.map((line, lineIndex) => {
                      if (line.match(/^\d+\.\s\*\*/)) {
                        // Numbered list with bold
                        const match = line.match(/^(\d+)\.\s\*\*([^*]+)\*\*\s*[-–]?\s*(.*)/);
                        if (match) {
                          return (
                            <p key={lineIndex} style={{ marginBottom: '0.75rem', paddingLeft: '1.5rem' }}>
                              <strong style={{ color: 'white' }}>{match[1]}. {match[2]}</strong>
                              {match[3] && ` - ${match[3]}`}
                            </p>
                          );
                        }
                      }
                      if (line.match(/^-\s\*\*/)) {
                        // Bullet with bold
                        const match = line.match(/^-\s\*\*([^*]+)\*\*:?\s*(.*)/);
                        if (match) {
                          return (
                            <p key={lineIndex} style={{ marginBottom: '0.75rem', paddingLeft: '1.5rem' }}>
                              <span style={{ marginRight: '0.5rem' }}>•</span>
                              <strong style={{ color: 'white' }}>{match[1]}</strong>
                              {match[2] && `: ${match[2]}`}
                            </p>
                          );
                        }
                      }
                      if (line.startsWith('- ')) {
                        return (
                          <p key={lineIndex} style={{ marginBottom: '0.5rem', paddingLeft: '1.5rem' }}>
                            <span style={{ marginRight: '0.5rem' }}>•</span>
                            {line.replace('- ', '')}
                          </p>
                        );
                      }
                      return line ? <p key={lineIndex}>{line}</p> : null;
                    })}
                  </div>
                );
              }
              // Regular paragraph
              return (
                <p key={index} style={{ marginBottom: '1.5rem' }}>
                  {paragraph}
                </p>
              );
            })}
          </motion.article>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: '2rem',
              marginBottom: '4rem',
              textAlign: 'center',
            }}
          >
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>
              {locale === 'pt' ? 'Queres treinar connosco?' : 'Want to train with us?'}
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '1.5rem' }}>
              {locale === 'pt'
                ? 'Junta-te à Oporto Running Lab e leva a tua corrida ao próximo nível.'
                : 'Join Oporto Running Lab and take your running to the next level.'}
            </p>
            <Link
              href="/#contact"
              style={{
                display: 'inline-block',
                padding: '0.75rem 2rem',
                background: 'white',
                color: 'black',
                fontWeight: 500,
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontSize: '0.875rem',
              }}
            >
              {locale === 'pt' ? 'Contactar' : 'Contact Us'}
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
