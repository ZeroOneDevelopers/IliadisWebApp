'use client';

import { useMemo, useState } from 'react';
import ShowroomFilters, { FilterState } from '@/components/sections/ShowroomFilters';
import CarCard from '@/components/sections/CarCard';
import { motion } from 'framer-motion';
import GlowButton from '@/components/ui/GlowButton';
import type { ShowroomVehicle } from '@/lib/vehicles';

const initialFilters: FilterState = {
  brand: null,
  fuel: null,
  transmission: null,
  maxPrice: null
};

type Props = {
  vehicles: ShowroomVehicle[];
  brandOptions: string[];
  fuelOptions: string[];
  transmissionOptions: string[];
};

export default function ShowroomClient({ vehicles, brandOptions, fuelOptions, transmissionOptions }: Props) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      const matchesBrand = filters.brand ? vehicle.make === filters.brand : true;
      const matchesFuel = filters.fuel ? vehicle.fuel === filters.fuel : true;
      const matchesTransmission = filters.transmission ? vehicle.transmission === filters.transmission : true;
      const matchesPrice = filters.maxPrice
        ? filters.maxPrice === 401000
          ? vehicle.price >= 400000
          : vehicle.price <= filters.maxPrice
        : true;

      return matchesBrand && matchesFuel && matchesTransmission && matchesPrice;
    });
  }, [filters, vehicles]);

  return (
    <>
      <ShowroomFilters
        value={filters}
        onChange={setFilters}
        brandOptions={brandOptions}
        fuelOptions={fuelOptions}
        transmissionOptions={transmissionOptions}
      />
      <motion.div layout className="relative z-0 grid gap-6 overflow-visible sm:grid-cols-2 xl:grid-cols-3">
        {filteredVehicles.map((vehicle, index) => (
          <CarCard key={vehicle.id} vehicle={vehicle} index={index} />
        ))}
      </motion.div>
      {filteredVehicles.length === 0 && (
        <div className="rounded-3xl border border-white/10 bg-black/40 p-12 text-center text-sm text-silver/60">
          No vehicles found for this combination. Our concierge can source it privately.
          <div className="mt-6 flex justify-center">
            <GlowButton href="mailto:liaison@iliadis.gr" variant="secondary">
              Contact Concierge
            </GlowButton>
          </div>
        </div>
      )}
    </>
  );
}
