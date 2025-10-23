'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import GlowButton from '@/components/ui/GlowButton';
import { useRef, useEffect } from 'react';

export default function Hero() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.3]);

  useEffect(() => {
    const audio = new Audio('/sounds/rev.mp3');
    audio.volume = 0.25;
    audio.play().catch(() => {
      // Autoplay may be blocked; ignore silently
    });
    return () => audio.pause();
  }, []);

  return (
    <section ref={ref} className="relative flex min-h-[90vh] flex-col justify-end overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="https://cdn.coverr.co/videos/coverr-a-ferrari-on-the-racetrack-6422/1080p.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="video-overlay absolute inset-0" />
      <motion.div style={{ y, opacity }} className="relative z-10 section-padding pb-32">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-6 text-sm uppercase tracking-[0.6em] text-silver/80"
        >
          Redefining Luxury
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.9, ease: 'easeOut' }}
          className="max-w-3xl font-heading text-5xl text-white md:text-6xl lg:text-7xl"
        >
          A cinematic journey through the world&apos;s most prestigious executive vehicles.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.9, ease: 'easeOut' }}
          className="mt-8 max-w-2xl text-lg text-silver/80"
        >
          Iliadis Executive Cars orchestrates bespoke driving experiences with Ferrari, Lamborghini, Rolls-Royce, Bentley and
          more. Step into a digital atelier where each vehicle is presented with cinematic reverence.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9, ease: 'easeOut' }}
          className="mt-12 flex flex-col gap-4 sm:flex-row"
        >
          <GlowButton href="/showroom">Explore Collection</GlowButton>
          <GlowButton href="/test-drive" variant="secondary">
            Book Test Drive
          </GlowButton>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.55 }}
        transition={{ delay: 0.7, duration: 1.5 }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.4),transparent_60%)]"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="absolute inset-x-0 bottom-10 flex justify-center"
      >
        <div className="flex items-center gap-4 text-xs uppercase tracking-[0.5em] text-silver/70">
          <span className="h-px w-12 bg-white/40" />
          Curated for Connoisseurs
          <span className="h-px w-12 bg-white/40" />
        </div>
      </motion.div>
    </section>
  );
}
