'use client';

import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import { Fragment, useState } from 'react';

type GalleryImage = {
  src: string;
  alt: string;
};

type Props = {
  images: GalleryImage[];
  title: string;
};

export default function VehicleGallery({ images, title }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isOpen = activeIndex !== null;

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        {images.map((image, index) => (
          <button
            key={`${image.src}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group relative aspect-[4/3] cursor-zoom-in overflow-hidden rounded-3xl border border-white/10 bg-black/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition md:group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="sr-only">View {title} gallery image {index + 1}</span>
          </button>
        ))}
      </div>
      <Transition show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[80]" onClose={() => setActiveIndex(null)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/80 backdrop-blur-md" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-150"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="glass w-full max-w-4xl rounded-3xl border border-white/10 bg-black/70 p-4 shadow-glow sm:p-6">
                  <Dialog.Title className="text-center font-heading text-2xl text-white">{title}</Dialog.Title>
                  <div className="mt-4 relative aspect-[16/9] overflow-hidden rounded-3xl border border-white/10">
                    {activeIndex !== null && (
                      <Image
                        src={images[activeIndex].src}
                        alt={images[activeIndex].alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 70vw"
                        className="object-contain"
                      />
                    )}
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setActiveIndex(null)}
                      className="rounded-full border border-white/20 px-5 py-2 text-xs uppercase tracking-[0.35em] text-silver/70 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
