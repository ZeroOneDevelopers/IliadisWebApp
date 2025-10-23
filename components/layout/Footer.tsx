import Link from 'next/link';
import { motion } from 'framer-motion';

const footerLinks = [
  { label: 'Showroom', href: '/showroom' },
  { label: 'Test Drive', href: '/test-drive' },
  { label: 'Dashboard', href: '/dashboard' }
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/40">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-14 md:flex-row md:items-center md:justify-between lg:px-12">
        <div className="space-y-3 text-sm text-silver/70">
          <p className="uppercase tracking-[0.35em] text-silver">Iliadis Executive Cars</p>
          <p>Leof. Kifisias 54, Athens | +30 210 123 4567</p>
          <p>© {new Date().getFullYear()} Iliadis Executive Cars. Crafted for connoisseurs.</p>
        </div>
        <div className="flex flex-col items-start gap-4 text-sm uppercase tracking-[0.35em] md:flex-row md:items-center">
          {footerLinks.map((link) => (
            <motion.div whileHover={{ x: 4 }} key={link.href}>
              <Link href={link.href} className="text-silver/70 hover:text-white">
                {link.label}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </footer>
  );
}
