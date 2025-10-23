'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Showroom', href: '/showroom' },
  { name: 'Test Drive', href: '/test-drive' },
  { name: 'Dashboard', href: '/dashboard' }
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed inset-x-0 top-0 z-50 bg-graphite/80 backdrop-blur-lg"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-12">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <div className="relative h-10 w-36">
            <Image src="/images/iliadis-logo.svg" alt="Iliadis Executive Cars" fill priority className="object-contain" />
          </div>
        </Link>
        <nav className="hidden items-center gap-10 text-sm uppercase tracking-[0.35em] md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                aria-current={isActive ? 'page' : undefined}
              >
                <span className={`transition-colors duration-300 ${isActive ? 'text-white' : 'text-silver/80 hover:text-white'}`}>
                  {link.name}
                </span>
                {isActive && (
                  <motion.span
                    layoutId="active-pill"
                    className="absolute -bottom-3 left-0 right-0 mx-auto h-[2px] w-full bg-white"
                  />
                )}
              </Link>
            );
          })}
        </nav>
        <button
          className="md:hidden rounded-full border border-white/20 p-2 text-white transition hover:border-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden"
        >
          <div className="space-y-4 px-6 pb-8 text-sm uppercase tracking-[0.35em]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block border-b border-white/5 pb-4 transition ${isActive ? 'text-white' : 'text-silver/80 hover:text-white'}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </motion.nav>
      )}
    </motion.header>
  );
}
