'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { Play, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

// Type definitions for media items
type ImageItem = {
  id: number;
  type: 'image';
  src: string;
  alt: string;
  blurUrl: string;
};

type VideoItem = {
  id: number;
  type: 'video';
  videoSrc: string;
  thumbnail: string;
  alt: string;
  blurUrl: string;
};

type MediaItem = ImageItem | VideoItem;

// High-quality running gallery with images and videos
// Videos from Google's sample CDN (reliable, allows direct embedding)
const mediaItems: MediaItem[] = [
  {
    id: 1,
    type: 'image',
    src: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800&q=80',
    alt: 'Running session',
    blurUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMCwsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgIBAwQDAAAAAAAAAAAAAQIDBAURAAYhBxITQVFh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAaEQACAgMAAAAAAAAAAAAAAAABAgADESEx/9oADAMBAAIRAxEAPwDV+oG8ZMXu/E0IKdSzXx9WvYmjsSyIZJHdysXdGwYKqR9wP3qumH3/ALDp0o6f7txkcCKgX8pAA9vxpNMqbCxYnuf/2Q=='
  },
  {
    id: 2,
    type: 'video',
    videoSrc: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=80',
    alt: 'Training session',
    blurUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMCwsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgIBAwQDAAAAAAAAAAAAAQIDBAURAAYhBxITQVFh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAaEQACAgMAAAAAAAAAAAAAAAABAgADESEx/9oADAMBAAIRAxEAPwDV+oG8ZMXu/E0IKdSzXx9WvYmjsSyIZJHdysXdGwYKqR9wP3qumH3/ALDp0o6f7txkcCKgX8pAA9vxpNMqbCxYnuf/2Q=='
  },
  {
    id: 3,
    type: 'image',
    src: 'https://images.unsplash.com/photo-1483721310020-03333e577078?w=800&q=80',
    alt: 'Marathon runners',
    blurUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMCwsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgIBAwQDAAAAAAAAAAAAAQIDBAURAAYhBxITQVFh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAaEQACAgMAAAAAAAAAAAAAAAABAgADESEx/9oAMAMBAAIRAxEAPwDV+oG8ZMXu/E0IKdSzXx9WvYmjsSyIZJHdysXdGwYKqR9wP3qumH3/ALDp0o6f7txkcCKgX8pAA9vxpNMqbCxYnuf/2Q=='
  },
  {
    id: 4,
    type: 'image',
    src: 'https://images.unsplash.com/photo-1544216717-3bbf52512659?w=800&q=80',
    alt: 'Trail running',
    blurUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMCwsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgIBAwQDAAAAAAAAAAAAAQIDBAURAAYhBxITQVFh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAaEQACAgMAAAAAAAAAAAAAAAABAgADESEx/9oADAMBAAIRAxEAPwDV+oG8ZMXu/E0IKdSzXx9WvYmjsSyIZJHdysXdGwYKqR9wP3qumH3/ALDp0o6f7txkcCKgX8pAA9vxpNMqbCxYnuf/2Q=='
  },
  {
    id: 5,
    type: 'video',
    videoSrc: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1594882645126-14020914d58d?w=800&q=80',
    alt: 'Outdoor activity',
    blurUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMCwsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgIBAwQDAAAAAAAAAAAAAQIDBAURAAYhBxITQVFh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAaEQACAgMAAAAAAAAAAAAAAAABAgADESEx/9oADAMBAAIRAxEAPwDV+oG8ZMXu/E0IKdSzXx9WvYmjsSyIZJHdysXdGwYKqR9wP3qumH3/ALDp0o6f7txkcCKgX8pAA9vxpNMqbCxYnuf/2Q=='
  },
  {
    id: 6,
    type: 'image',
    src: 'https://images.unsplash.com/photo-1596727362302-b8d891c42ab8?w=800&q=80',
    alt: 'Runner portrait',
    blurUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMCwsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgIBAwQDAAAAAAAAAAAAAQIDBAURAAYhBxITQVFh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAaEQACAgMAAAAAAAAAAAAAAAABAgADESEx/9oADAMBAAIRAxEAPwDV+oG8ZMXu/E0IKdSzXx9WvYmjsSyIZJHdysXdGwYKqR9wP3qumH3/ALDp0o6f7txkcCKgX8pAA9vxpNMqbCxYnuf/2Q=='
  },
  {
    id: 7,
    type: 'image',
    src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
    alt: 'Strength training',
    blurUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMCwsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgIBAwQDAAAAAAAAAAAAAQIDBAURAAYhBxITQVFh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAaEQACAgMAAAAAAAAAAAAAAAABAgADESEx/9oADAMBAAIRAxEAPwDV+oG8ZMXu/E0IKdSzXx9WvYmjsSyIZJHdysXdGwYKqR9wP3qumH3/ALDp0o6f7txkcCKgX8pAA9vxpNMqbCxYnuf/2Q=='
  },
  {
    id: 8,
    type: 'video',
    videoSrc: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1502904550040-7534597429ae?w=800&q=80',
    alt: 'Active lifestyle',
    blurUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMCwsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgIBAwQDAAAAAAAAAAAAAQIDBAURAAYhBxITQVFh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAaEQACAgMAAAAAAAAAAAAAAAABAgADESEx/9oADAMBAAIRAxEAPwDV+oG8ZMXu/E0IKdSzXx9WvYmjsSyIZJHdysXdGwYKqR9wP3qumH3/ALDp0o6f7txkcCKgX8pAA9vxpNMqbCxYnuf/2Q=='
  },
  {
    id: 9,
    type: 'image',
    src: 'https://images.unsplash.com/photo-1486218119243-13883505764c?w=800&q=80',
    alt: 'Running shoes',
    blurUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMCwsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgIBAwQDAAAAAAAAAAAAAQIDBAURAAYhBxITQVFh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAaEQACAgMAAAAAAAAAAAAAAAABAgADESEx/9oADAMBAAIRAxEAPwDV+oG8ZMXu/E0IKdSzXx9WvYmjsSyIZJHdysXdGwYKqR9wP3qumH3/ALDp0o6f7txkcCKgX8pAA9vxpNMqbCxYnuf/2Q=='
  },
];

// Helper function to get image URL for thumbnails
const getImageUrl = (item: MediaItem): string => {
  return item.type === 'video' ? item.thumbnail : item.src;
};

export default function Gallery() {
  const t = useTranslations('gallery');
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const goNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % mediaItems.length);
    }
  };

  const goPrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + mediaItems.length) % mediaItems.length);
    }
  };

  return (
    <section id="gallery" className="relative bg-black overflow-hidden" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>

      <div ref={containerRef} className="max-w-6xl mx-auto" style={{ paddingLeft: '2rem', paddingRight: '2rem' }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
          style={{ marginBottom: '5rem' }}
        >
          <h2 style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '1rem' }}>
            {t('title')}
          </h2>
          <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.5)' }}>{t('subtitle')}</p>
        </motion.div>

        {/* Gallery Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {mediaItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={() => openLightbox(index)}
              whileHover={{ scale: 1.02 }}
              style={{
                position: 'relative',
                aspectRatio: '4/3',
                cursor: 'pointer',
                overflow: 'hidden',
              }}
            >
              <Image
                src={getImageUrl(item)}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{
                  objectFit: 'cover',
                  filter: 'grayscale(30%)',
                  transition: 'all 0.5s ease',
                }}
                placeholder="blur"
                blurDataURL={item.blurUrl}
              />
              {/* Overlay on hover */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
                opacity: 0.7,
                transition: 'opacity 0.3s ease',
              }} />

              {/* Play button for videos */}
              {item.type === 'video' && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    style={{
                      width: '4rem',
                      height: '4rem',
                      borderRadius: '50%',
                      border: '2px solid rgba(255,255,255,0.8)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(0,0,0,0.5)',
                      backdropFilter: 'blur(4px)',
                    }}>
                    <Play style={{ width: '1.5rem', height: '1.5rem', color: 'white', marginLeft: '0.25rem' }} />
                  </motion.div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '0.875rem', marginTop: '3rem' }}>
          {t('note')}
        </p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 50,
              background: 'rgba(0,0,0,0.95)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <button
              onClick={closeLightbox}
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', padding: '0.5rem', color: 'rgba(255,255,255,0.7)', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <X style={{ width: '2rem', height: '2rem' }} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              style={{ position: 'absolute', left: '1.5rem', padding: '0.5rem', color: 'rgba(255,255,255,0.7)', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <ChevronLeft style={{ width: '2.5rem', height: '2.5rem' }} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              style={{ position: 'absolute', right: '1.5rem', padding: '0.5rem', color: 'rgba(255,255,255,0.7)', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <ChevronRight style={{ width: '2.5rem', height: '2.5rem' }} />
            </button>

            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              style={{ position: 'relative', maxWidth: '60rem', width: '100%', margin: '0 1.5rem', aspectRatio: '16/9' }}
            >
              {mediaItems[selectedIndex].type === 'video' ? (
                <video
                  src={(mediaItems[selectedIndex] as VideoItem).videoSrc}
                  controls
                  autoPlay
                  playsInline
                  preload="auto"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    background: 'black',
                  }}
                />
              ) : (
                <Image
                  src={(mediaItems[selectedIndex] as ImageItem).src}
                  alt={mediaItems[selectedIndex].alt}
                  fill
                  sizes="100vw"
                  style={{ objectFit: 'contain' }}
                  priority
                />
              )}
            </motion.div>

            <div style={{ position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem' }}>
              {selectedIndex + 1} / {mediaItems.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
