'use client';

import { Listbox, Transition } from '@headlessui/react';
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
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
  brandOptions: string[];
  fuelOptions: string[];
  transmissionOptions: string[];
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
      {({ open }) => (
        <div className="relative">
          <Listbox.Button
            aria-label={`${label} filter`}
            className="flex min-h-12 w-full items-center justify-between rounded-full border border-white/20 bg-black/40 px-4 py-3 text-xs uppercase tracking-[0.35em] text-silver/80 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 sm:px-5"
          >
            <span className="flex-1 text-left font-medium text-silver/80">
              {label}: <span className="text-white/90">{current.label}</span>
            </span>
            <ChevronUpDownIcon aria-hidden className="ml-3 h-4 w-4 flex-shrink-0" />
          </Listbox.Button>
          {/* Inline dropdown keeps layering predictable against the showroom grid. */}
          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Listbox.Options className="mt-2 max-h-64 w-full overflow-auto rounded-2xl border border-white/10 bg-black/70 p-2 text-xs uppercase tracking-[0.35em] text-silver/80 shadow-2xl backdrop-blur-md">
              {formatted.map((option) => (
                <Listbox.Option key={option.label} value={option.value}>
                  {({ active, selected }) => (
                    <div
                      className={clsx(
                        'flex cursor-pointer items-center justify-between rounded-xl px-4 py-3 transition',
                        active && 'bg-white/10 text-white'
                      )}
                    >
                      <span>{option.label}</span>
                      {selected && <CheckIcon aria-hidden className="h-4 w-4" />}
                    </div>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
}

export default function ShowroomFilters({ value, onChange, brandOptions, fuelOptions, transmissionOptions }: Props) {
  return (
    <div className="relative z-10 mb-6">
      <div className="glass isolate grid gap-3 rounded-3xl border border-white/10 bg-black/30 p-6 shadow-innerGlow md:grid-cols-4">
        <FilterListbox label="Brand" value={value.brand} options={[null, ...brandOptions]} onChange={(brand) => onChange({ ...value, brand })} />
        <FilterListbox label="Fuel" value={value.fuel} options={[null, ...fuelOptions]} onChange={(fuel) => onChange({ ...value, fuel })} />
        <FilterListbox
          label="Transmission"
          value={value.transmission}
          options={[null, ...transmissionOptions]}
          onChange={(transmission) => onChange({ ...value, transmission })}
        />
        <Listbox value={value.maxPrice} onChange={(maxPrice) => onChange({ ...value, maxPrice })}>
          {({ open }) => (
            <div className="relative">
              <Listbox.Button
                aria-label="Price filter"
                className="flex min-h-12 w-full items-center justify-between rounded-full border border-white/20 bg-black/40 px-4 py-3 text-xs uppercase tracking-[0.35em] text-silver/80 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 sm:px-5"
              >
                <span className="flex-1 text-left font-medium text-silver/80">
                  Price:{' '}
                  <span className="text-white/90">
                    {priceOptions.find((option) => option.value === value.maxPrice)?.label ?? 'No Limit'}
                  </span>
                </span>
                <ChevronUpDownIcon aria-hidden className="ml-3 h-4 w-4 flex-shrink-0" />
              </Listbox.Button>
              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Listbox.Options className="mt-2 max-h-64 w-full overflow-auto rounded-2xl border border-white/10 bg-black/70 p-2 text-xs uppercase tracking-[0.35em] text-silver/80 shadow-2xl backdrop-blur-md">
                  {priceOptions.map((option) => (
                    <Listbox.Option key={option.label} value={option.value}>
                      {({ active, selected }) => (
                        <div
                          className={clsx(
                            'flex cursor-pointer items-center justify-between rounded-xl px-4 py-3 transition',
                            active && 'bg-white/10 text-white'
                          )}
                        >
                          <span>{option.label}</span>
                          {selected && <CheckIcon aria-hidden className="h-4 w-4" />}
                        </div>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          )}
        </Listbox>
      </div>
    </div>
  );
}
