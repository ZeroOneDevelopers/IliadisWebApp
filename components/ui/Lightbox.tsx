'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline';

type LightboxProps = {
  images: string[];
  initial?: number;
  onClose?: () => void;
};

export default function Lightbox({ images, initial = 0, onClose }: LightboxProps) {
  if (images.length === 0) return null;

  const [open, setOpen] = useState(true);
  const [index, setIndex] = useState(initial);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  useEffect(() => {
    setIndex(initial);
  }, [initial]);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  const prev = useCallback(() => {
    setIndex((current) => (current - 1 + images.length) % images.length);
  }, [images.length]);

  const next = useCallback(() => {
    setIndex((current) => (current + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        prev();
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        next();
      }
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
      }
    }

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [close, next, prev]);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchStart(event.touches[0]?.clientX ?? null);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStart === null) return;
    const delta = event.touches[0]?.clientX ?? touchStart;
    const diff = delta - touchStart;
    if (Math.abs(diff) > 60) {
      if (diff > 0) {
        prev();
      } else {
        next();
      }
      setTouchStart(null);
    }
  };

  const handleTouchEnd = () => {
    setTouchStart(null);
  };

  return (
    <Transition show={open} as={Fragment} appear afterLeave={onClose}>
      <Dialog onClose={close} className="relative z-[100]">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/90 backdrop-blur" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 translate-y-2"
            enterTo="opacity-100 translate-y-0"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-2"
          >
            <Dialog.Panel className="relative w-full max-w-5xl">
              <button
                type="button"
                onClick={close}
                className="absolute right-4 top-4 z-20 rounded-full border border-white/20 bg-black/60 p-2 text-white transition hover:border-white/50 hover:text-white"
                aria-label="Close gallery"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
              <div
                className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-white/10 bg-black"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <Image
                  src={images[index]}
                  alt="Vehicle gallery image"
                  fill
                  sizes="100vw"
                  quality={95}
                  className="object-contain"
                  priority
                />
              </div>
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prev}
                    className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-black/50 p-3 text-white backdrop-blur transition hover:border-white/60"
                    aria-label="Previous image"
                  >
                    <ChevronLeftIcon className="h-6 w-6" />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-black/50 p-3 text-white backdrop-blur transition hover:border-white/60"
                    aria-label="Next image"
                  >
                    <ChevronRightIcon className="h-6 w-6" />
                  </button>
                  <div className="mt-4 flex justify-center">
                    <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-4 py-2 text-xs uppercase tracking-[0.35em] text-silver/70">
                      {index + 1} / {images.length}
                    </div>
                  </div>
                </>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
