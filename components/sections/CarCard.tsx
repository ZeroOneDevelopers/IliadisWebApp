'use client';

import { ShowroomVehicle, formatCurrency } from '@/lib/vehicles';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SHIMMER_DATA_URL } from '@/lib/images';

const MotionDiv = motion.div;

export default function CarCard({ vehicle, index }: { vehicle: ShowroomVehicle; index: number }) {
  const images = [vehicle.primaryImage, ...vehicle.secondaryImages].filter(Boolean);
  const coverImage = images[0] ?? '/images/showroom-preview.svg';

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.05, duration: 0.6, ease: 'easeOut' }}
    >
      <Link
        href={`/showroom/${vehicle.slug}`}
        className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        aria-label={`View details for ${vehicle.title}`}
      >
        <article className="group flex h-full flex-col overflow-hidden rounded-3xl surface-panel transition-shadow duration-500">
          <div className="relative aspect-[16/10] w-full bg-black">
            <Image
              src={coverImage}
              alt={vehicle.title}
              fill
              priority={vehicle.featured}
              quality={92}
              sizes="(max-width:640px) 100vw, (max-width:1024px) 45vw, 30vw"
              className="object-contain object-center transition-transform duration-500 group-hover:scale-[1.02]"
              placeholder="blur"
              blurDataURL={SHIMMER_DATA_URL}
              loading={vehicle.featured ? 'eager' : 'lazy'}
              draggable={false}
            />
            {/* Keep imagery crisp while allowing gentle letterboxing when ratios differ */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" aria-hidden />
          </div>
          <div className="flex flex-1 flex-col gap-5 px-6 pb-6 pt-6 sm:px-7">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.3em] text-silver/60 line-clamp-1">{vehicle.make}</p>
              <h3 className="font-heading text-xl text-white line-clamp-2">{vehicle.title}</h3>
              <p className="text-xs uppercase tracking-[0.3em] text-silver/50 line-clamp-1">
                {vehicle.make} · {vehicle.model}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-[0.65rem] uppercase tracking-[0.25em] text-silver/60 sm:grid-cols-3">
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
            {vehicle.description && <p className="text-sm text-silver/70 line-clamp-3">{vehicle.description}</p>}
            <div className="mt-auto flex flex-wrap items-center justify-between gap-3 text-white">
              <span className="text-lg font-semibold">{formatCurrency(vehicle.price)}</span>
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
