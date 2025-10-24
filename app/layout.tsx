import type { Metadata } from 'next';
import { Manrope, Poppins } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ReactNode } from 'react';
import Script from 'next/script';

const heading = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading'
});

const body = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  variable: '--font-body'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://iliadiscars.car.gr'),
  title: {
    default: 'Iliadis Executive Cars | Redefining Luxury Mobility',
    template: '%s | Iliadis Executive Cars'
  },
  description:
    'Iliadis Executive Cars curates Ferrari, Lamborghini, Rolls-Royce and bespoke executive vehicles in Athens. Explore the cinematic digital showroom and book a test drive.',
  icons: {
    icon: '/images/iliadis-logo.svg'
  },
  openGraph: {
    title: 'Iliadis Executive Cars Digital Showroom',
    description:
      'Immerse yourself in a cinematic collection of Ferrari, Lamborghini, and executive vehicles. Book a private test drive and experience luxury mobility in Athens.',
    url: 'https://iliadiscars.car.gr',
    siteName: 'Iliadis Executive Cars',
    images: [
      {
        url: '/images/showroom-preview.svg',
        width: 1200,
        height: 630,
        alt: 'Iliadis Executive Cars Showroom'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Iliadis Executive Cars Digital Showroom',
    description:
      'Cinematic, luxury-grade experience to explore Ferrari, Lamborghini, and executive vehicles in Athens.',
    images: ['/images/showroom-preview.svg']
  }
};

const asBackgroundValue = (value?: string) => {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  // Accept raw CSS gradients/urls while still allowing plain asset paths.
  return /^(url\(|linear-gradient|radial-gradient)/.test(trimmed) ? trimmed : `url('${trimmed}')`;
};

const bg = (...values: (string | undefined)[]) => {
  for (const candidate of values) {
    const parsed = asBackgroundValue(candidate);
    if (parsed) return parsed;
  }
  return undefined;
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const backgroundStyles: React.CSSProperties & Record<`--${string}`, string> = {};

  const fallbackBackgrounds = {
    home: "linear-gradient(140deg, rgba(11,12,16,0.95) 0%, rgba(33,36,45,0.8) 45%, rgba(11,12,16,0.92) 100%)",
    showroom: "linear-gradient(135deg, rgba(11,12,16,0.94) 10%, rgba(24,27,35,0.88) 55%, rgba(11,12,16,0.94) 95%)",
    details: "linear-gradient(130deg, rgba(8,9,13,0.94) 5%, rgba(17,19,26,0.9) 60%, rgba(8,9,13,0.94) 100%)",
    dashboard: "linear-gradient(145deg, rgba(9,10,14,0.95) 0%, rgba(28,31,40,0.88) 55%, rgba(9,10,14,0.95) 100%)"
  } as const;

  backgroundStyles['--page-bg-home'] =
    bg(process.env.NEXT_PUBLIC_BG_HOME, process.env.NEXT_PUBLIC_BG_IMAGE_1, fallbackBackgrounds.home) ?? fallbackBackgrounds.home;
  backgroundStyles['--page-bg-showroom'] =
    bg(
      process.env.NEXT_PUBLIC_BG_SHOWROOM,
      process.env.NEXT_PUBLIC_BG_IMAGE_2,
      process.env.NEXT_PUBLIC_BG_IMAGE_1,
      fallbackBackgrounds.showroom
    ) ?? fallbackBackgrounds.showroom;
  backgroundStyles['--page-bg-details'] =
    bg(process.env.NEXT_PUBLIC_BG_DETAILS, process.env.NEXT_PUBLIC_BG_IMAGE_3, fallbackBackgrounds.details) ??
    fallbackBackgrounds.details;
  backgroundStyles['--page-bg-dashboard'] =
    bg(process.env.NEXT_PUBLIC_BG_DASHBOARD, process.env.NEXT_PUBLIC_BG_IMAGE_2, fallbackBackgrounds.dashboard) ??
    fallbackBackgrounds.dashboard;

  backgroundStyles['--page-overlay-home'] = '0.58';
  backgroundStyles['--page-overlay-showroom'] = '0.6';
  backgroundStyles['--page-overlay-details'] = '0.68';
  backgroundStyles['--page-overlay-dashboard'] = '0.7';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AutoDealer',
    name: 'Iliadis Executive Cars',
    url: 'https://iliadiscars.car.gr',
    logo: 'https://iliadiscars.car.gr/logo.png',
    description:
      'Premium showroom in Athens specialising in Ferrari, Lamborghini, Rolls-Royce and executive vehicles.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Varis Koropiou Ave 2',
      addressLocality: 'Voula 166 73',
      addressCountry: 'GR'
    },
    openingHours: 'Mo-Fr 10:00-19:00',
    telephone: '+30 694 606 1486'
  } as const;

  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body className="relative min-h-screen overflow-x-hidden bg-graphite text-silver" style={backgroundStyles}>
        <div className="pointer-events-none fixed inset-0 -z-10 bg-hero-grid opacity-20" aria-hidden />
        <Navbar />
        <main className="min-h-screen pt-28 sm:pt-32">{children}</main>
        <Footer />
        <Script id="schema-auto-dealer" type="application/ld+json">
          {JSON.stringify(schema)}
        </Script>
      </body>
    </html>
  );
}
