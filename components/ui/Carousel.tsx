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
};

export default function Carousel({
  slides,
  ariaLabel,
  className,
  controlsClassName,
  showDots = true,
  onSlideChange
}: CarouselProps) {
  const [active, setActive] = useState(0);
  const [announcement, setAnnouncement] = useState('');
  const trackRef = useRef<HTMLDivElement | null>(null);
  const dragState = useRef<{ pointerId: number; startX: number; deltaX: number } | null>(null);
  const dragging = useRef(false);
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);
  const trackId = useId();

  const clampIndex = useCallback(
    (index: number) => {
      if (slides.length === 0) return 0;
      return Math.min(slides.length - 1, Math.max(0, index));
    },
    [slides.length]
  );

  const changeSlide = useCallback(
    (updater: number | ((current: number) => number)) => {
      setActive((current) => {
        const nextIndex = typeof updater === 'function' ? (updater as (value: number) => number)(current) : updater;
        const clamped = clampIndex(nextIndex);
        if (clamped !== current) {
          setAnnouncement(`Slide ${clamped + 1} of ${slides.length}`);
          onSlideChange?.(clamped);
        }
        return clamped;
      });
    },
    [clampIndex, onSlideChange, slides.length]
  );

  const goToPrevious = useCallback(() => {
    changeSlide((current) => current - 1);
  }, [changeSlide]);

  const goToNext = useCallback(() => {
    changeSlide((current) => current + 1);
  }, [changeSlide]);

  useEffect(() => {
    changeSlide(0);
  }, [changeSlide, slides.length]);

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
    },
    [goToNext, goToPrevious]
  );

  const offset = dragState.current?.deltaX ?? 0;

  return (
    <div className={clsx('relative', className)}>
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
          onKeyDown={handleKeyDown}
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
              active === 0 && 'opacity-40'
            )}
            onClick={(event) => {
              event.stopPropagation();
              goToPrevious();
            }}
            aria-controls={trackId}
            aria-label="Previous slide"
            disabled={active === 0}
          >
            <ChevronLeftIcon className="h-5 w-5" aria-hidden />
          </button>
          <button
            type="button"
            className={clsx(
              'pointer-events-auto mr-3 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/70 text-white shadow-lg transition hover:border-white/60 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40',
              active === slides.length - 1 && 'opacity-40'
            )}
            onClick={(event) => {
              event.stopPropagation();
              goToNext();
            }}
            aria-controls={trackId}
            aria-label="Next slide"
            disabled={active === slides.length - 1}
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
