import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

type Variant = 'invert' | 'outline-invert' | 'brand' | 'outline-dark';

interface ButtonProps {
  children: ReactNode;
  /** Same-page anchor or external link, rendered as a plain <a>. */
  href?: string;
  /** Client-side route, rendered as a React Router <Link> (no full page reload). */
  to?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  type?: 'button' | 'submit';
}

const VARIANT_CLASSES: Record<Variant, string> = {
  // White fill, black text: for use on red backgrounds.
  invert:
    'bg-white text-black hover:bg-white/90',
  // Transparent with white border/text: secondary action on red/black backgrounds.
  'outline-invert':
    'bg-transparent text-white border border-white/40 hover:border-white hover:bg-white/10',
  // TED red fill, white text: primary brand action on black/white backgrounds.
  brand: 'bg-[#EB0028] text-white hover:bg-[#EB0028]/90',
  // Transparent with black border/text: secondary action on white backgrounds.
  'outline-dark':
    'bg-transparent text-black border border-black/25 hover:border-black hover:bg-black/5',
};

const MotionLink = motion.create(Link);

/**
 * Shared CTA button. Scales gently on hover/tap per the animation spec,
 * no bounce, no color introduced beyond the fixed palette.
 */
export function Button({
  children,
  href,
  to,
  onClick,
  variant = 'invert',
  className = '',
  type = 'button',
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-full px-8 py-3.5 text-[15px] font-semibold tracking-tight transition-colors duration-300 ${VARIANT_CLASSES[variant]} ${className}`;

  const motionProps = {
    whileHover: { scale: 1.035 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] as const },
  };

  if (to) {
    return (
      <MotionLink to={to} className={classes} {...motionProps}>
        {children}
      </MotionLink>
    );
  }

  if (href) {
    return (
      <motion.a href={href} className={classes} {...motionProps}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button type={type} onClick={onClick} className={classes} {...motionProps}>
      {children}
    </motion.button>
  );
}
