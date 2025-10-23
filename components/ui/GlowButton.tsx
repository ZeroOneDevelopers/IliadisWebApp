'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ReactNode } from 'react';
import clsx from 'clsx';

type GlowButtonProps = {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
};

const variants = {
  primary:
    'bg-white text-graphite hover:bg-silver shadow-[0_0_30px_rgba(231,233,238,0.35)] hover:shadow-[0_0_45px_rgba(231,233,238,0.55)]',
  secondary:
    'bg-transparent text-white border border-white/40 hover:border-white/80 hover:bg-white/10'
};

export default function GlowButton({
  href,
  onClick,
  children,
  variant = 'primary',
  className,
  type = 'button'
}: GlowButtonProps) {
  const content = (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      type={type}
      className={clsx(
        'relative inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 text-sm uppercase tracking-[0.35em] transition-all duration-500',
        variants[variant],
        className
      )}
    >
      <span>{children}</span>
    </motion.button>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex">
        {content}
      </Link>
    );
  }

  return content;
}
