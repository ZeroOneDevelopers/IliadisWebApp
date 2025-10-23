'use client';

import { ShowroomVehicle, formatCurrency } from '@/lib/vehicles';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CarCard({ vehicle, index }: { vehicle: ShowroomVehicle; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.05, duration: 0.6, ease: 'easeOut' }}
      className="group glass card-hover flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-black/40 shadow-innerGlow"
    >
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={vehicle.primaryImage}
          alt={vehicle.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-8">
        <div>
          <p className="text-xs uppercase tracking-[0.45em] text-silver/60">{vehicle.make}</p>
          <h3 className="mt-2 font-heading text-2xl text-white">{vehicle.title}</h3>
        </div>
        <div className="grid grid-cols-3 gap-4 text-xs uppercase tracking-[0.25em] text-silver/60">
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
          <p className="text-sm text-silver/70">{vehicle.description.slice(0, 120)}{vehicle.description.length > 120 ? '…' : ''}</p>
        )}
        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg font-semibold text-white">{formatCurrency(vehicle.price)}</span>
          <Link href={`/showroom/${vehicle.slug}`} className="text-xs uppercase tracking-[0.35em] text-silver/70 transition-colors group-hover:text-white">
            View Details
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
