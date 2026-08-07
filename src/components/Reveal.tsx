import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds before the reveal animation starts. */
  delay?: number;
  /** Vertical offset (px) the element travels while fading in. */
  y?: number;
}

/**
 * Fades and gently lifts its children into view the first time they
 * enter the viewport. No bounce, no flashy motion — just an effortless
 * settle, consistent with the rest of the site's animation language.
 */
export function Reveal({ children, className, delay = 0, y = 20 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
