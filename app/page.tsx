import Hero from '@/components/sections/Hero';
import Highlights from '@/components/sections/Highlights';
import CollectionTeaser from '@/components/sections/CollectionTeaser';
import GlowButton from '@/components/ui/GlowButton';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Highlights />
      <CollectionTeaser />
      <section className="section-padding">
        <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/5 to-transparent p-12 text-center shadow-innerGlow">
          <p className="text-xs uppercase tracking-[0.5em] text-silver/60">Private Lounge</p>
          <h2 className="mt-4 font-heading text-4xl text-white">Reserve Your Bespoke Consultation</h2>
          <p className="mt-6 text-sm text-silver/70">
            Connect directly with our executive liaison team for acquisition sourcing, discreet trade-ins, or to curate a
            tailor-made driving experience. Every enquiry is handled with absolute confidentiality.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <GlowButton href="/test-drive">Book Test Drive</GlowButton>
            <GlowButton href="mailto:liaison@iliadis.gr" variant="secondary">
              Email Our Curators
            </GlowButton>
          </div>
        </div>
      </section>
    </>
  );
}
