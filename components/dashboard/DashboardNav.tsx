'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/dashboard', label: 'Overview' },
  { href: '/dashboard/vehicles', label: 'Vehicles' },
  { href: '/dashboard/leads', label: 'Leads' },
  { href: '/dashboard/bookings', label: 'Bookings' }
];

export default function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="glass overflow-hidden rounded-full border border-white/10 bg-black/40 shadow-innerGlow">
      <ul className="flex flex-wrap items-center justify-between gap-2 p-2 sm:gap-3">
        {links.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`block rounded-full px-5 py-2 text-xs uppercase tracking-[0.35em] transition ${
                  isActive ? 'bg-white/20 text-white shadow-glow' : 'text-silver/70 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
