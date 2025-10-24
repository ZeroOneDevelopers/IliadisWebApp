'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { SHIMMER_DATA_URL } from '@/lib/images';
import Lightbox from '@/components/ui/Lightbox';

type Props = {
  images: string[];
  title: string;
  variant?: 'detail' | 'hero';
  priority?: boolean;
  enableLightbox?: boolean;
};

export default function VehicleGallery({ images, title, variant = 'detail', priority = false, enableLightbox = false }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightbox, setLightbox] = useState<{ open: boolean; index: number }>({ open: false, index: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    function updateActive() {
      const width = container.offsetWidth;
      if (width === 0) return;
      const index = Math.round(container.scrollLeft / width);
      setActiveIndex(Math.max(0, Math.min(images.length - 1, index)));
    }

    container.addEventListener('scroll', updateActive, { passive: true } as AddEventListenerOptions);
    window.addEventListener('resize', updateActive);
    updateActive();

    return () => {
      container.removeEventListener('scroll', updateActive);
      window.removeEventListener('resize', updateActive);
    };
  }, [images.length]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const slide = container.children[activeIndex] as HTMLElement | undefined;
    if (!slide) return;
    container.scrollTo({ left: slide.offsetLeft, behavior: 'smooth' });
  }, [activeIndex]);

  useEffect(() => {
    setActiveIndex(0);
  }, [images.join('|')]);

  function scrollTo(index: number) {
    setActiveIndex(Math.max(0, Math.min(images.length - 1, index)));
  }

  const handleSelect = (index: number) => {
    if (!enableLightbox) return;
    setLightbox({ open: true, index });
  };

  const aspectClass = variant === 'hero' ? 'aspect-[16/9]' : 'aspect-[4/3] md:aspect-[16/9]';

  return (
    <div
      className={clsx(
        'relative overflow-hidden rounded-3xl',
        variant === 'hero' ? 'border border-white/10 shadow-innerGlow' : 'border border-white/10'
      )}
    >
      <div
        ref={containerRef}
        className={clsx('flex snap-x snap-mandatory overflow-x-auto scroll-smooth bg-black/40 no-scrollbar')}
      >
        {images.map((src, index) =>
          enableLightbox ? (
            <button
              key={`${src}-${index}`}
              type="button"
              onClick={() => handleSelect(index)}
              className={clsx(
                'relative w-full flex-shrink-0 snap-start',
                aspectClass,
                'cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40'
              )}
            >
              <Image
                src={src}
                alt={`${title} image ${index + 1}`}
                fill
                className="object-cover transition-transform duration-500 hover:scale-[1.01]"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 50vw"
                quality={variant === 'hero' ? 95 : 90}
                priority={priority && index === 0}
                placeholder="blur"
                blurDataURL={SHIMMER_DATA_URL}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            </button>
          ) : (
            <div key={`${src}-${index}`} className={clsx('relative w-full flex-shrink-0 snap-start', aspectClass)}>
              <Image
                src={src}
                alt={`${title} image ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 50vw"
                quality={variant === 'hero' ? 95 : 90}
                priority={priority && index === 0}
                placeholder="blur"
                blurDataURL={SHIMMER_DATA_URL}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            </div>
          )
        )}
      </div>
      {images.length > 1 && (
        <>
          <div className="absolute inset-x-0 bottom-4 flex justify-center">
            <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-4 py-2 backdrop-blur-xl">
              {images.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => scrollTo(index)}
                  className={clsx(
                    'h-2.5 w-2.5 rounded-full transition',
                    index === activeIndex ? 'bg-white' : 'bg-white/40 hover:bg-white/70'
                  )}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={() => scrollTo(activeIndex - 1)}
            className="absolute left-4 top-1/2 hidden -translate-y-1/2 rounded-full border border-white/20 bg-black/60 p-3 text-white backdrop-blur-xl transition hover:border-white/40 hover:text-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 md:flex"
            aria-label="Previous image"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollTo(activeIndex + 1)}
            className="absolute right-4 top-1/2 hidden -translate-y-1/2 rounded-full border border-white/20 bg-black/60 p-3 text-white backdrop-blur-xl transition hover:border-white/40 hover:text-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 md:flex"
            aria-label="Next image"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </>
      )}
      {enableLightbox && lightbox.open && (
        <Lightbox images={images} initial={lightbox.index} onClose={() => setLightbox({ open: false, index: 0 })} />
      )}
    </div>
  );
}
