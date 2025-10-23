import Image from 'next/image';
import { motion } from 'framer-motion';
import GlowButton from '@/components/ui/GlowButton';

const collections = [
  {
    title: 'Ferrari Monza SP2',
    image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1200&q=80',
    description: 'A tribute to barchetta racing legends, meticulously crafted for collectors who appreciate pure driving emotion.',
    slug: 'ferrari-monza-sp2'
  },
  {
    title: 'Lamborghini Aventador Ultimae',
    image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1200&q=80',
    description: 'Final V12 icon delivering 780 CV with dramatic aerodynamics and limited production exclusivity.',
    slug: 'lamborghini-aventador-ultimae'
  },
  {
    title: 'Rolls-Royce Phantom VIII',
    image: 'https://images.unsplash.com/photo-1523981784081-91fd0a17b658?auto=format&fit=crop&w=1200&q=80',
    description: 'The epitome of serene luxury, featuring bespoke interior craftsmanship and starlight headliner.',
    slug: 'rolls-royce-phantom-viii'
  }
];

export default function CollectionTeaser() {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-6xl space-y-16">
        {collections.map((collection, index) => (
          <motion.article
            key={collection.slug}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
            className={`glass card-hover grid items-center gap-10 overflow-hidden rounded-3xl border border-white/5 bg-black/40 shadow-innerGlow md:grid-cols-2 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
          >
            <div className="relative h-80 w-full md:h-full">
              <Image src={collection.image} alt={collection.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/10 to-transparent" />
            </div>
            <div className="relative space-y-6 p-10">
              <p className="text-xs uppercase tracking-[0.5em] text-silver/60">Showcase</p>
              <h3 className="font-heading text-3xl text-white">{collection.title}</h3>
              <p className="text-sm leading-relaxed text-silver/70">{collection.description}</p>
              <GlowButton href={`/showroom/${collection.slug}`} variant="secondary" className="mt-8">
                View Details
              </GlowButton>
            </div>
          </motion.article>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
        className="mx-auto mt-20 flex max-w-6xl justify-center"
      >
        <GlowButton href="/showroom" className="uppercase">
          Discover the Full Fleet
        </GlowButton>
      </motion.div>
    </section>
  );
}
