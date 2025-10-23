import Image from 'next/image';
import GlowButton from '@/components/ui/GlowButton';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { enrichVehicle, formatCurrency } from '@/lib/vehicles';

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const vehicles = await prisma.vehicle.findMany({ select: { slug: true } });
  return vehicles.map((vehicle) => ({ slug: vehicle.slug }));
}

export async function generateMetadata({ params }: Props) {
  const vehicle = await prisma.vehicle.findUnique({ where: { slug: params.slug } });
  if (!vehicle) return {};
  const showroomVehicle = enrichVehicle(vehicle);
  return {
    title: `${showroomVehicle.title} | Digital Showroom`,
    description: showroomVehicle.description ?? undefined,
    openGraph: {
      title: showroomVehicle.title,
      description: showroomVehicle.description ?? undefined,
      images: [{ url: showroomVehicle.primaryImage, width: 1200, height: 675, alt: showroomVehicle.title }]
    }
  };
}

export default async function CarDetailsPage({ params }: Props) {
  const vehicle = await prisma.vehicle.findUnique({ where: { slug: params.slug } });
  if (!vehicle) {
    return notFound();
  }

  const showroomVehicle = enrichVehicle(vehicle);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Vehicle',
    name: showroomVehicle.title,
    brand: showroomVehicle.make,
    model: showroomVehicle.model,
    vehicleEngine: {
      '@type': 'EngineSpecification',
      enginePower: `${showroomVehicle.hp} hp`,
      fuelType: showroomVehicle.fuel
    },
    vehicleTransmission: showroomVehicle.transmission,
    mileageFromOdometer: showroomVehicle.mileage,
    vehicleInteriorColor: showroomVehicle.color ?? 'Custom',
    vehicleBodyType: showroomVehicle.body,
    offers: {
      '@type': 'Offer',
      price: showroomVehicle.price,
      priceCurrency: 'EUR'
    }
  } as const;

  const galleryImages = [showroomVehicle.primaryImage, ...showroomVehicle.secondaryImages];

  return (
    <section className="section-padding">
      <div className="mx-auto max-w-6xl space-y-14">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div className="relative h-96 overflow-hidden rounded-3xl border border-white/10">
            <Image src={showroomVehicle.primaryImage} alt={showroomVehicle.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/10 to-transparent" />
          </div>
          <div className="glass space-y-6 rounded-3xl border border-white/10 bg-black/40 p-10 shadow-innerGlow">
            <p className="text-xs uppercase tracking-[0.55em] text-silver/60">{showroomVehicle.make}</p>
            <h1 className="font-heading text-4xl text-white">{showroomVehicle.title}</h1>
            {showroomVehicle.description && <p className="text-sm text-silver/70">{showroomVehicle.description}</p>}
            <div className="grid grid-cols-2 gap-4 text-xs uppercase tracking-[0.3em] text-silver/60">
              <div>
                <p className="text-silver/40">Power</p>
                <p className="mt-1 text-lg text-white">{showroomVehicle.hp} HP</p>
              </div>
              <div>
                <p className="text-silver/40">Engine</p>
                <p className="mt-1 text-lg text-white">{showroomVehicle.engine_cc.toLocaleString()} cc</p>
              </div>
              <div>
                <p className="text-silver/40">Mileage</p>
                <p className="mt-1 text-lg text-white">{showroomVehicle.mileage.toLocaleString()} km</p>
              </div>
              <div>
                <p className="text-silver/40">Transmission</p>
                <p className="mt-1 text-lg text-white">{showroomVehicle.transmission}</p>
              </div>
              <div>
                <p className="text-silver/40">Fuel</p>
                <p className="mt-1 text-lg text-white">{showroomVehicle.fuel}</p>
              </div>
              <div>
                <p className="text-silver/40">Investment</p>
                <p className="mt-1 text-lg text-white">{formatCurrency(showroomVehicle.price)}</p>
              </div>
            </div>
            <audio controls className="w-full">
              <source src={showroomVehicle.audioSample ?? '/sounds/rev.mp3'} type="audio/mpeg" />
            </audio>
            <p className="text-xs uppercase tracking-[0.3em] text-silver/50">
              Engine audio placeholder — replace with bespoke rev sample from dashboard upload.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <GlowButton href={`/test-drive?vehicle=${encodeURIComponent(showroomVehicle.title)}`}>
                Book Test Drive
              </GlowButton>
              <GlowButton href="https://wa.me/302101234567" variant="secondary">
                WhatsApp Concierge
              </GlowButton>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="font-heading text-2xl text-white">Gallery</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {galleryImages.map((image, index) => (
              <div key={`${image}-${index}`} className="relative h-56 overflow-hidden rounded-3xl border border-white/10">
                <Image src={image} alt={`${showroomVehicle.title} gallery ${index + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-black/40 p-10 text-sm text-silver/70">
          <p>
            Interested in acquiring the {showroomVehicle.title}? Submit a request for a private test drive or connect with our
            acquisition specialists to tailor financing, trade-ins or custom delivery.
          </p>
        </div>
      </div>
      <Script id={`vehicle-schema-${showroomVehicle.slug}`} type="application/ld+json">
        {JSON.stringify(schema)}
      </Script>
    </section>
  );
}
