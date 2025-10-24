'use client';

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export type CarouselImage = {
  key?: string;
  render: () => React.ReactNode;
  label?: string;
};

export type CarouselProps = {
  slides: CarouselImage[];
  ariaLabel: string;
  className?: string;
  controlsClassName?: string;
  showDots?: boolean;
  onSlideChange?: (index: number) => void;
  loop?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  pauseOnHover?: boolean;
};

export default function Carousel({
  slides,
  ariaLabel,
  className,
  controlsClassName,
  showDots = true,
  onSlideChange,
  loop = false,
  autoPlay = false,
  autoPlayInterval = 6000,
  pauseOnHover = false
}: CarouselProps) {
  const [active, setActive] = useState(0);
  const [announcement, setAnnouncement] = useState('');
  const trackRef = useRef<HTMLDivElement | null>(null);
  const dragState = useRef<{ pointerId: number; startX: number; deltaX: number } | null>(null);
  const dragging = useRef(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isPointerDown, setIsPointerDown] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);
  const trackId = useId();

  const normalizeIndex = useCallback(
    (index: number) => {
      if (slides.length === 0) return 0;
      if (loop) {
        const modulo = index % slides.length;
        return modulo < 0 ? modulo + slides.length : modulo;
      }
      return Math.min(slides.length - 1, Math.max(0, index));
    },
    [loop, slides.length]
  );

  const changeSlide = useCallback(
    (updater: number | ((current: number) => number)) => {
      setActive((current) => {
        const nextIndex = typeof updater === 'function' ? (updater as (value: number) => number)(current) : updater;
        const normalized = normalizeIndex(nextIndex);
        if (normalized !== current) {
          setAnnouncement(`Slide ${normalized + 1} of ${slides.length}`);
          onSlideChange?.(normalized);
        }
        return normalized;
      });
    },
    [normalizeIndex, onSlideChange, slides.length]
  );

  const goToPrevious = useCallback(() => {
    changeSlide((current) => {
      if (!loop && current <= 0) return 0;
      return current - 1;
    });
  }, [changeSlide, loop]);

  const goToNext = useCallback(() => {
    changeSlide((current) => {
      if (!loop && current >= slides.length - 1) return slides.length - 1;
      return current + 1;
    });
  }, [changeSlide, loop, slides.length]);

  useEffect(() => {
    changeSlide(0);
  }, [changeSlide, slides.length]);

  useEffect(() => {
    if (!autoPlay || prefersReducedMotion || slides.length < 2) return;
    if ((pauseOnHover && isHovering) || isPointerDown || isFocused) return;

    const id = window.setInterval(() => {
      changeSlide((current) => {
        if (!loop && current >= slides.length - 1) {
          return current;
        }
        return current + 1;
      });
    }, autoPlayInterval);

    return () => window.clearInterval(id);
  }, [
    autoPlay,
    autoPlayInterval,
    changeSlide,
    isFocused,
    isHovering,
    isPointerDown,
    loop,
    pauseOnHover,
    prefersReducedMotion,
    slides.length
  ]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goToPrevious();
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        goToNext();
      }
    },
    [goToNext, goToPrevious]
  );

  const handlePointerDown = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    trackRef.current.setPointerCapture(event.pointerId);
    dragState.current = { pointerId: event.pointerId, startX: event.clientX, deltaX: 0 };
    dragging.current = false;
    setIsPointerDown(true);
  }, []);

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const state = dragState.current;
    if (!state || state.pointerId !== event.pointerId) return;
    state.deltaX = event.clientX - state.startX;
    if (!dragging.current && Math.abs(state.deltaX) > 12) {
      dragging.current = true;
    }
  }, []);

  const handlePointerUp = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!trackRef.current) return;
      const state = dragState.current;
      if (!state || state.pointerId !== event.pointerId) return;
      trackRef.current.releasePointerCapture(event.pointerId);
      const threshold = trackRef.current.clientWidth * 0.15;
      if (state.deltaX > threshold) {
        goToPrevious();
      } else if (state.deltaX < -threshold) {
        goToNext();
      }
      if (dragging.current) {
        event.preventDefault();
        event.stopPropagation();
      }
      dragState.current = null;
      dragging.current = false;
      setIsPointerDown(false);
    },
    [goToNext, goToPrevious]
  );

  const offset = dragState.current?.deltaX ?? 0;

  return (
    <div
      className={clsx('relative', className)}
      onKeyDown={handleKeyDown}
      onMouseEnter={pauseOnHover ? () => setIsHovering(true) : undefined}
      onMouseLeave={pauseOnHover ? () => setIsHovering(false) : undefined}
      onFocusCapture={() => setIsFocused(true)}
      onBlurCapture={() => setIsFocused(false)}
    >
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label={ariaLabel}
        className="relative"
      >
        <div
          id={trackId}
          ref={trackRef}
          className="flex touch-pan-y select-none"
          style={{
            transform: `translateX(calc(-${active} * 100% + ${offset}px))`,
            transition: dragState.current || prefersReducedMotion ? 'none' : 'transform 500ms ease'
          }}
          tabIndex={0}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {slides.map((slide, index) => (
            <div
              key={slide.key ?? index}
              className="relative w-full flex-shrink-0"
              role="group"
              aria-roledescription="slide"
              aria-label={slide.label ?? `Slide ${index + 1}`}
              aria-hidden={index === active ? undefined : true}
            >
              {slide.render()}
            </div>
          ))}
        </div>
      </div>

      {slides.length > 1 && (
        <div className={clsx('pointer-events-none absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between', controlsClassName)}>
          <button
            type="button"
            className={clsx(
              'pointer-events-auto ml-3 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/70 text-white shadow-lg transition hover:border-white/60 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40',
              !loop && active === 0 && 'opacity-40'
            )}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              goToPrevious();
            }}
            aria-controls={trackId}
            aria-label="Previous slide"
            disabled={!loop && active === 0}
            onKeyDown={(event) => {
              if (event.key === 'ArrowLeft') {
                event.preventDefault();
                goToPrevious();
              }
              if (event.key === 'ArrowRight') {
                event.preventDefault();
                goToNext();
              }
            }}
          >
            <ChevronLeftIcon className="h-5 w-5" aria-hidden />
          </button>
          <button
            type="button"
            className={clsx(
              'pointer-events-auto mr-3 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/70 text-white shadow-lg transition hover:border-white/60 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40',
              !loop && active === slides.length - 1 && 'opacity-40'
            )}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              goToNext();
            }}
            aria-controls={trackId}
            aria-label="Next slide"
            disabled={!loop && active === slides.length - 1}
            onKeyDown={(event) => {
              if (event.key === 'ArrowLeft') {
                event.preventDefault();
                goToPrevious();
              }
              if (event.key === 'ArrowRight') {
                event.preventDefault();
                goToNext();
              }
            }}
          >
            <ChevronRightIcon className="h-5 w-5" aria-hidden />
          </button>
        </div>
      )}

      {slides.length > 1 && showDots && (
        <div className="pointer-events-none absolute inset-x-0 bottom-3 z-20 flex justify-center">
          <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-white/15 bg-black/70 px-4 py-2 backdrop-blur">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                className={clsx(
                  'h-2.5 w-2.5 rounded-full transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40',
                  active === index ? 'bg-white' : 'bg-white/40 hover:bg-white/70'
                )}
                aria-label={`Go to slide ${index + 1}`}
                aria-controls={trackId}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  changeSlide(index);
                }}
              />
            ))}
          </div>
        </div>
      )}

      <span className="sr-only" aria-live="polite" aria-atomic>
        {announcement}
      </span>
    </div>
  );
}

// REQUIRED ASSETS (not included):
// none
