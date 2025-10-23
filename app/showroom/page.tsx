'use client';

import { useMemo, useState } from 'react';
import { cars } from '@/lib/cars';
import ShowroomFilters, { FilterState } from '@/components/sections/ShowroomFilters';
import CarCard from '@/components/sections/CarCard';
import { motion } from 'framer-motion';
import GlowButton from '@/components/ui/GlowButton';

const initialFilters: FilterState = {
  brand: null,
  fuel: null,
  transmission: null,
  maxPrice: null
};

export default function ShowroomPage() {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const matchesBrand = filters.brand ? car.brand === filters.brand : true;
      const matchesFuel = filters.fuel ? car.fuel === filters.fuel : true;
      const matchesTransmission = filters.transmission ? car.transmission === filters.transmission : true;
      const matchesPrice = filters.maxPrice
        ? filters.maxPrice === 401000
          ? car.price >= 400000
          : car.price <= filters.maxPrice
        : true;
      return matchesBrand && matchesFuel && matchesTransmission && matchesPrice;
    });
  }, [filters]);

  return (
    <section className="section-padding">
      <div className="mx-auto max-w-6xl space-y-12">
        <div className="space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.55em] text-silver/60">The Digital Atelier</p>
          <h1 className="font-heading text-4xl text-white md:text-5xl">Showroom Collection</h1>
          <p className="text-sm text-silver/70">
            Filter by marque, powertrain and investment bracket to uncover vehicles tailored to your driving philosophy.
          </p>
        </div>
        <ShowroomFilters value={filters} onChange={setFilters} />
        <motion.div layout className="grid gap-8 md:grid-cols-2">
          {filteredCars.map((car, index) => (
            <CarCard key={car.id} car={car} index={index} />
          ))}
        </motion.div>
        {filteredCars.length === 0 && (
          <div className="rounded-3xl border border-white/10 bg-black/40 p-12 text-center text-sm text-silver/60">
            No vehicles found for this combination. Our concierge can source it privately.
            <div className="mt-6 flex justify-center">
              <GlowButton href="mailto:liaison@iliadis.gr" variant="secondary">
                Contact Concierge
              </GlowButton>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
