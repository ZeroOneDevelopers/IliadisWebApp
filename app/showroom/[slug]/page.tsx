import { cars } from '@/lib/cars';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import GlowButton from '@/components/ui/GlowButton';
import Script from 'next/script';

export async function generateStaticParams() {
  return cars.map((car) => ({ slug: car.slug }));
}

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props) {
  const car = cars.find((item) => item.slug === params.slug);
  if (!car) return {};
  return {
    title: `${car.name} | Digital Showroom`,
    description: car.description,
    openGraph: {
      title: car.name,
      description: car.description,
      images: [{ url: car.heroImage, width: 1200, height: 675, alt: car.name }]
    }
  };
}

export default function CarDetailsPage({ params }: Props) {
  const car = cars.find((item) => item.slug === params.slug);
  if (!car) {
    return notFound();
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Vehicle',
    name: car.name,
    brand: car.brand,
    model: car.name,
    vehicleEngine: {
      '@type': 'EngineSpecification',
      enginePower: car.power,
      fuelType: car.fuel
    },
    vehicleTransmission: car.transmission,
    accelerationTime: car.zeroToHundred,
    vehicleSeatingCapacity: 2,
    vehicleInteriorColor: 'Bespoke',
    vehicleExteriorColor: 'Custom',
    offers: {
      '@type': 'Offer',
      price: car.price,
      priceCurrency: car.currency
    }
  } as const;

  return (
    <section className="section-padding">
      <div className="mx-auto max-w-6xl space-y-14">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div className="relative h-96 overflow-hidden rounded-3xl border border-white/10">
            <Image src={car.heroImage} alt={car.name} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/10 to-transparent" />
          </div>
          <div className="glass space-y-6 rounded-3xl border border-white/10 bg-black/40 p-10 shadow-innerGlow">
            <p className="text-xs uppercase tracking-[0.55em] text-silver/60">{car.brand}</p>
            <h1 className="font-heading text-4xl text-white">{car.name}</h1>
            <p className="text-sm text-silver/70">{car.description}</p>
            <div className="grid grid-cols-2 gap-4 text-xs uppercase tracking-[0.3em] text-silver/60">
              <div>
                <p className="text-silver/40">Power</p>
                <p className="mt-1 text-lg text-white">{car.power}</p>
              </div>
              <div>
                <p className="text-silver/40">0-100 km/h</p>
                <p className="mt-1 text-lg text-white">{car.zeroToHundred}</p>
              </div>
              <div>
                <p className="text-silver/40">Top Speed</p>
                <p className="mt-1 text-lg text-white">{car.topSpeed}</p>
              </div>
              <div>
                <p className="text-silver/40">Investment</p>
                <p className="mt-1 text-lg text-white">€{car.price.toLocaleString('en-US')}</p>
              </div>
            </div>
            <audio controls className="w-full">
              <source src={car.engineSound ?? '/sounds/rev.mp3'} type="audio/mpeg" />
            </audio>
            <p className="text-xs uppercase tracking-[0.3em] text-silver/50">
              Engine audio placeholder — replace with bespoke rev sample from dashboard upload.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <GlowButton href={`/test-drive?vehicle=${encodeURIComponent(car.name)}`}>Book Test Drive</GlowButton>
              <GlowButton href="https://wa.me/302101234567" variant="secondary">
                WhatsApp Concierge
              </GlowButton>
            </div>
          </div>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="font-heading text-2xl text-white">Exterior Gallery</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {car.gallery.map((image, index) => (
                <div key={image} className="relative h-56 overflow-hidden rounded-3xl border border-white/10">
                  <Image src={image} alt={`${car.name} exterior ${index + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="font-heading text-2xl text-white">Interior Atmosphere</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {car.interior.map((image, index) => (
                <div key={image} className="relative h-56 overflow-hidden rounded-3xl border border-white/10">
                  <Image src={image} alt={`${car.name} interior ${index + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-black/40 p-10 text-sm text-silver/70">
          <p>
            Interested in acquiring the {car.name}? Submit a request for a private test drive or connect with our acquisition
            specialists to tailor financing, trade-ins or custom delivery.
          </p>
        </div>
      </div>
      <Script id={`vehicle-schema-${car.slug}`} type="application/ld+json">
        {JSON.stringify(schema)}
      </Script>
    </section>
  );
}
