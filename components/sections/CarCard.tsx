'use client';

import { useEffect, useRef, useState } from 'react';
import { ShowroomVehicle, formatCurrency } from '@/lib/vehicles';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { SHIMMER_DATA_URL } from '@/lib/images';

const MotionDiv = motion.div;

export default function CarCard({ vehicle, index }: { vehicle: ShowroomVehicle; index: number }) {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const images = [vehicle.primaryImage, ...vehicle.secondaryImages].filter(Boolean);

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    function handleScroll() {
      const width = container.offsetWidth;
      if (!width) return;
      const index = Math.round(container.scrollLeft / width);
      setActiveIndex(Math.max(0, Math.min(images.length - 1, index)));
    }

    container.addEventListener('scroll', handleScroll, { passive: true } as AddEventListenerOptions);
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [images.length]);

  useEffect(() => {
    setActiveIndex(0);
  }, [images.join('|')]);

  function scrollTo(index: number) {
    const container = carouselRef.current;
    if (!container) return;
    const target = Math.max(0, Math.min(images.length - 1, index));
    const slide = container.children[target] as HTMLElement | undefined;
    if (!slide) return;
    container.scrollTo({ left: slide.offsetLeft, behavior: 'smooth' });
  }

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.05, duration: 0.6, ease: 'easeOut' }}
      className="card-hover"
    >
      <Link
        href={`/showroom/${vehicle.slug}`}
        role="button"
        tabIndex={0}
        className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        aria-label={`View details for ${vehicle.title}`}
      >
        <article className="glass flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-black/40 shadow-innerGlow">
          <div className="relative">
            <div
              ref={carouselRef}
              className="flex snap-x snap-mandatory overflow-x-auto rounded-3xl no-scrollbar"
              aria-hidden={images.length <= 1}
            >
              {images.map((image, imageIndex) => (
                <div key={`${image}-${imageIndex}`} className="relative aspect-[4/3] w-full flex-shrink-0 snap-start">
                  <Image
                    src={image}
                    alt={`${vehicle.title} image ${imageIndex + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    quality={90}
                    placeholder="blur"
                    blurDataURL={SHIMMER_DATA_URL}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
              ))}
            </div>
            {images.length > 1 && (
              <div className="absolute inset-x-0 bottom-4 flex justify-center">
                <div className="flex items-center gap-1 rounded-full border border-white/10 bg-black/60 px-3 py-1 backdrop-blur-xl">
                  {images.map((_, dotIndex) => (
                    <button
                      key={dotIndex}
                      type="button"
                      className={clsx(
                        'h-2 w-2 rounded-full transition',
                        dotIndex === activeIndex ? 'bg-white' : 'bg-white/40 hover:bg-white/70'
                      )}
                      aria-label={`View image ${dotIndex + 1}`}
                      onClick={(event) => {
                        event.preventDefault();
                        scrollTo(dotIndex);
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-1 flex-col gap-5 p-6 sm:p-8">
            <div>
              <p className="text-xs uppercase tracking-[0.45em] text-silver/60">{vehicle.make}</p>
              <h3 className="mt-2 break-words font-heading text-2xl text-white">{vehicle.title}</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 text-xs uppercase tracking-[0.25em] text-silver/60 sm:grid-cols-3">
              <div>
                <p className="text-silver/40">Power</p>
                <p className="mt-1 text-sm text-white">{vehicle.hp} HP</p>
              </div>
              <div>
                <p className="text-silver/40">Engine</p>
                <p className="mt-1 text-sm text-white">{vehicle.engine_cc.toLocaleString()} cc</p>
              </div>
              <div>
                <p className="text-silver/40">Transmission</p>
                <p className="mt-1 text-sm text-white">{vehicle.transmission}</p>
              </div>
            </div>
            {vehicle.description && (
              <p className="text-sm text-silver/70">
                {vehicle.description.slice(0, 120)}
                {vehicle.description.length > 120 ? '…' : ''}
              </p>
            )}
            <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
              <span className="text-lg font-semibold text-white">{formatCurrency(vehicle.price)}</span>
              <span className="text-xs uppercase tracking-[0.35em] text-silver/70 transition-colors group-hover:text-white">
                View Details
              </span>
            </div>
          </div>
        </article>
      </Link>
    </MotionDiv>
  );
}
