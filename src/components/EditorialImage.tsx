import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

type Variant = 'fade-up' | 'zoom' | 'parallax';

interface EditorialImageProps {
  /** Omit to render the placeholder panel (used until the real asset exists). */
  src?: string;
  alt: string;
  variant?: Variant;
  className?: string;
  delay?: number;
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Shared filter for every photo on the site — one consistent editorial look. */
const EDITORIAL_FILTER = 'saturate(0.88) contrast(1.06) brightness(0.97)';

/**
 * The site's single image treatment: consistent desaturation/contrast,
 * rounded corners, a soft shadow, and a scroll-discovered reveal. Pass no
 * `src` to get the placeholder panel used everywhere a real photo hasn't
 * been supplied yet — swapping in a `src` later needs no other changes.
 */
export function EditorialImage({ src, alt, variant = 'fade-up', className = '', delay = 0 }: EditorialImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [24, -24]);

  const frameClass = `relative overflow-hidden rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] ${className}`;

  if (!src) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.8, delay, ease: EASE }}
        className={`${frameClass} border border-[#2A2A2A] bg-gradient-to-br from-[#1a1a1a] via-[#121212] to-black`}
      />
    );
  }

  if (variant === 'parallax') {
    return (
      <div ref={ref} className={frameClass}>
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          style={{
            filter: EDITORIAL_FILTER,
            y: prefersReducedMotion ? 0 : parallaxY,
          }}
          className="h-[120%] w-full scale-110 object-cover"
        />
      </div>
    );
  }

  if (variant === 'zoom') {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.7, delay, ease: EASE }}
        className={frameClass}
      >
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          style={{ filter: EDITORIAL_FILTER }}
          initial={{ scale: 1.05 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 1.6, delay, ease: EASE }}
          className="h-full w-full object-cover"
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={frameClass}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        style={{ filter: EDITORIAL_FILTER }}
        className="h-full w-full object-cover"
      />
    </motion.div>
  );
}
