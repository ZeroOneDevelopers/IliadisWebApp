'use client';

import { Listbox, Portal } from '@headlessui/react';
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/24/outline';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';

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

type DropdownPosition = {
  top: number;
  left: number;
  width: number;
};

function useDropdownPosition() {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<DropdownPosition>({ top: 0, left: 0, width: 0 });

  const updatePosition = useCallback(() => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setPosition({
      top: rect.bottom + window.scrollY + 8,
      left: rect.left + window.scrollX,
      width: rect.width
    });
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    updatePosition();
    const handleResize = () => updatePosition();
    const handleScroll = () => updatePosition();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsVisible(false);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, true);
    document.addEventListener('keydown', handleKey);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll, true);
      document.removeEventListener('keydown', handleKey);
    };
  }, [isVisible, updatePosition]);

  return { buttonRef, isVisible, setIsVisible, position, updatePosition } as const;
}

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
  const { buttonRef, isVisible, setIsVisible, position, updatePosition } = useDropdownPosition();

  return (
    <Listbox
      value={value}
      onChange={(selected) => {
        onChange(selected);
        setIsVisible(false);
      }}
    >
      <div className="relative">
        <Listbox.Button
          ref={buttonRef}
          onClick={() => {
            updatePosition();
            setIsVisible((prev) => !prev);
          }}
          onBlur={() => setIsVisible(false)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              setTimeout(() => {
                updatePosition();
                setIsVisible(true);
              }, 0);
            }
          }}
          className="flex w-full items-center justify-between rounded-full border border-white/20 bg-black/40 px-4 py-3 text-sm uppercase tracking-[0.35em] text-silver/80"
        >
          <span>{label}: {current.label}</span>
          <ChevronUpDownIcon className="h-4 w-4" />
        </Listbox.Button>
        {isVisible && (
          <Portal>
            <Listbox.Options
              static
              className="z-[70] max-h-72 overflow-auto rounded-2xl border border-white/10 bg-black/80 p-2 text-xs uppercase tracking-[0.35em] text-silver/80 shadow-2xl"
              style={{ position: 'absolute', top: position.top, left: position.left, width: position.width }}
            >
              {formatted.map((option) => (
                <Listbox.Option key={option.label} value={option.value} as={Fragment}>
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
          </Portal>
        )}
      </div>
    </Listbox>
  );
}

export default function ShowroomFilters({ value, onChange, brandOptions, fuelOptions, transmissionOptions }: Props) {
  const priceDropdown = useDropdownPosition();
  return (
    <div className="glass relative z-50 isolate grid gap-4 rounded-3xl border border-white/10 bg-black/30 p-6 shadow-innerGlow md:grid-cols-4">
      <FilterListbox label="Brand" value={value.brand} options={[null, ...brandOptions]} onChange={(brand) => onChange({ ...value, brand })} />
      <FilterListbox label="Fuel" value={value.fuel} options={[null, ...fuelOptions]} onChange={(fuel) => onChange({ ...value, fuel })} />
      <FilterListbox
        label="Transmission"
        value={value.transmission}
        options={[null, ...transmissionOptions]}
        onChange={(transmission) => onChange({ ...value, transmission })}
      />
      <Listbox
        value={value.maxPrice}
        onChange={(maxPrice) => {
          onChange({ ...value, maxPrice });
          priceDropdown.setIsVisible(false);
        }}
      >
        <div className="relative">
          <Listbox.Button
            ref={priceDropdown.buttonRef}
            onClick={() => {
              priceDropdown.updatePosition();
              priceDropdown.setIsVisible((prev) => !prev);
            }}
            onBlur={() => priceDropdown.setIsVisible(false)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                setTimeout(() => {
                  priceDropdown.updatePosition();
                  priceDropdown.setIsVisible(true);
                }, 0);
              }
            }}
            className="flex w-full items-center justify-between rounded-full border border-white/20 bg-black/40 px-4 py-3 text-sm uppercase tracking-[0.35em] text-silver/80"
          >
            <span>Price: {priceOptions.find((option) => option.value === value.maxPrice)?.label ?? 'No Limit'}</span>
            <ChevronUpDownIcon className="h-4 w-4" />
          </Listbox.Button>
          {priceDropdown.isVisible && (
            <Portal>
              <Listbox.Options
                static
                className="z-[70] max-h-72 overflow-auto rounded-2xl border border-white/10 bg-black/80 p-2 text-xs uppercase tracking-[0.35em] text-silver/80 shadow-2xl"
                style={{ position: 'absolute', top: priceDropdown.position.top, left: priceDropdown.position.left, width: priceDropdown.position.width }}
              >
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
            </Portal>
          )}
        </div>
      </Listbox>
    </div>
  );
}
