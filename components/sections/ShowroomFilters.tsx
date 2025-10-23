'use client';

import { brands, fuels, transmissions } from '@/lib/cars';
import { Listbox } from '@headlessui/react';
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';

export type FilterState = {
  brand: string | null;
  fuel: string | null;
  transmission: string | null;
  maxPrice: number | null;
};

type Props = {
  value: FilterState;
  onChange: (value: FilterState) => void;
};

const priceOptions = [
  { label: 'No Limit', value: null },
  { label: 'Up to €250K', value: 250000 },
  { label: 'Up to €400K', value: 400000 },
  { label: '€400K+', value: 401000 }
];

function FilterListbox({
  label,
  value,
  options,
  onChange
}: {
  label: string;
  value: string | null;
  options: (string | null)[];
  onChange: (value: string | null) => void;
}) {
  const formatted = options.map((option) => ({
    label: option ?? 'All',
    value: option
  }));
  const current = formatted.find((option) => option.value === value) ?? formatted[0];

  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative">
        <Listbox.Button className="flex w-full items-center justify-between rounded-full border border-white/20 bg-black/40 px-4 py-3 text-sm uppercase tracking-[0.35em] text-silver/80">
          <span>{label}: {current.label}</span>
          <ChevronUpDownIcon className="h-4 w-4" />
        </Listbox.Button>
        <Listbox.Options className="absolute z-10 mt-2 w-full rounded-2xl border border-white/10 bg-black/80 p-2 text-xs uppercase tracking-[0.35em] text-silver/80 shadow-2xl">
          {formatted.map((option) => (
            <Listbox.Option
              key={option.label}
              value={option.value}
              as={Fragment}
            >
              {({ active, selected }) => (
                <li
                  className={`flex cursor-pointer items-center justify-between rounded-xl px-4 py-3 ${
                    active ? 'bg-white/10 text-white' : ''
                  }`}
                >
                  <span>{option.label}</span>
                  {selected && <CheckIcon className="h-4 w-4" />}
                </li>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
}

export default function ShowroomFilters({ value, onChange }: Props) {
  return (
    <div className="glass grid gap-4 rounded-3xl border border-white/10 bg-black/30 p-6 shadow-innerGlow md:grid-cols-4">
      <FilterListbox label="Brand" value={value.brand} options={[null, ...brands]} onChange={(brand) => onChange({ ...value, brand })} />
      <FilterListbox label="Fuel" value={value.fuel} options={[null, ...fuels]} onChange={(fuel) => onChange({ ...value, fuel })} />
      <FilterListbox
        label="Transmission"
        value={value.transmission}
        options={[null, ...transmissions]}
        onChange={(transmission) => onChange({ ...value, transmission })}
      />
      <Listbox value={value.maxPrice} onChange={(maxPrice) => onChange({ ...value, maxPrice })}>
        <div className="relative">
          <Listbox.Button className="flex w-full items-center justify-between rounded-full border border-white/20 bg-black/40 px-4 py-3 text-sm uppercase tracking-[0.35em] text-silver/80">
            <span>Price: {priceOptions.find((option) => option.value === value.maxPrice)?.label ?? 'No Limit'}</span>
            <ChevronUpDownIcon className="h-4 w-4" />
          </Listbox.Button>
          <Listbox.Options className="absolute z-10 mt-2 w-full rounded-2xl border border-white/10 bg-black/80 p-2 text-xs uppercase tracking-[0.35em] text-silver/80 shadow-2xl">
            {priceOptions.map((option) => (
              <Listbox.Option key={option.label} value={option.value} as={Fragment}>
                {({ active, selected }) => (
                  <li className={`flex cursor-pointer items-center justify-between rounded-xl px-4 py-3 ${active ? 'bg-white/10 text-white' : ''}`}>
                    <span>{option.label}</span>
                    {selected && <CheckIcon className="h-4 w-4" />}
                  </li>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}
