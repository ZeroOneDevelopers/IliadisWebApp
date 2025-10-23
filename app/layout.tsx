import type { Metadata } from 'next';
import { Space_Grotesk, Poppins } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ReactNode } from 'react';
import Script from 'next/script';

const heading = Space_Grotesk({
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

export default function RootLayout({ children }: { children: ReactNode }) {
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
      streetAddress: 'Leof. Kifisias 54',
      addressLocality: 'Athens',
      addressCountry: 'GR'
    },
    openingHours: 'Mo-Fr 10:00-19:00',
    telephone: '+30 210 123 4567'
  } as const;

  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body className="relative min-h-screen overflow-x-hidden bg-graphite text-silver">
        <div className="pointer-events-none fixed inset-0 -z-10 bg-hero-grid opacity-40" aria-hidden />
        <Navbar />
        <main className="min-h-screen pt-24">{children}</main>
        <Footer />
        <Script id="schema-auto-dealer" type="application/ld+json">
          {JSON.stringify(schema)}
        </Script>
      </body>
    </html>
  );
}
