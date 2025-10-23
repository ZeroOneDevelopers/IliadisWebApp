import { Vehicle } from '@prisma/client';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1400&q=80';
const DEFAULT_AUDIO = '/sounds/engine-start.mp3';

export type ShowroomVehicle = Vehicle & {
  primaryImage: string;
  secondaryImages: string[];
  audioSample: string | null;
};

export function enrichVehicle(vehicle: Vehicle): ShowroomVehicle {
  const [primaryImage, ...rest] = vehicle.images.length > 0 ? vehicle.images : [DEFAULT_IMAGE];
  const audioSample = vehicle.audio_urls.length > 0 ? vehicle.audio_urls[0] : DEFAULT_AUDIO;

  return {
    ...vehicle,
    primaryImage,
    secondaryImages: rest,
    audioSample
  };
}

export function getUniqueOptions(values: (string | null)[]): string[] {
  return Array.from(new Set(values.filter(Boolean) as string[])).sort();
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
}
