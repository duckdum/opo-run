'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Clock, ArrowRight, User } from 'lucide-react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { getAllPosts } from '@/data/blog-posts';

const posts = getAllPosts();

function formatDate(dateStr: string, locale: string = 'pt') {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale === 'pt' ? 'pt-PT' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function BlogPage() {
  const t = useTranslations('blog');
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

          {/* Blog Posts Grid */}
          {posts.length > 0 ? (
            <div className="blog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
              {posts.map((post, index) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <motion.article
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    whileHover={{ y: -8 }}
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.05)',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'border-color 0.3s',
                      height: '100%',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)')}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}
                  >
                    {/* Post Image */}
                    <div style={{
                      height: '220px',
                      position: 'relative',
                      overflow: 'hidden',
                    }}>
                      <Image
                        src={post.image}
                        alt={post.title[locale as 'pt' | 'en']}
                        fill
                        style={{ objectFit: 'cover', transition: 'transform 0.5s' }}
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)',
                      }} />
                    </div>

                    <div style={{ padding: '1.5rem' }}>
                      {/* Meta */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <User style={{ width: '0.75rem', height: '0.75rem' }} />
                          {post.author}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <Clock style={{ width: '0.75rem', height: '0.75rem' }} />
                          {post.readTime} {t('minRead')}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem', lineHeight: 1.3 }}>
                        {post.title[locale as 'pt' | 'en']}
                      </h2>

                      {/* Excerpt */}
                      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                        {post.excerpt[locale as 'pt' | 'en']}
                      </p>

                      {/* Date & Read More */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>
                          {formatDate(post.date, locale)}
                        </span>
                        <span style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          fontSize: '0.875rem',
                          fontWeight: 500,
                          color: 'white',
                        }}>
                          {t('readMore')}
                          <ArrowRight style={{ width: '1rem', height: '1rem' }} />
                        </span>
                      </div>
                    </div>
                  </motion.article>
                </Link>
              ))}
            </div>
          ) : (
            <p style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', padding: '3rem' }}>{t('noPosts')}</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
