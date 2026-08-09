import { useEffect, useState, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const VIDEO_SRC = '/hero/hero-background.mp4';
const POSTER_SRC = '/hero/hero-poster.jpg';

// Featherlight film grain - pure SVG noise, no image asset. Kept faint
// enough that it reads as texture, not as a visible effect.
const GRAIN_SVG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

interface CinematicVideoLayerProps {
  /** Rendered only when the video and poster are both unavailable/fail. */
  fallback?: ReactNode;
  /** Color wash painted above the media - defaults to the same TED-red wash used in the hero. */
  overlayClassName?: string;
}

/**
 * The same cinematic background used in the hero (ASSET PLACEHOLDER:
 * hero-background.mp4 / hero-poster.jpg, see public/hero/): a muted,
 * looping video at 12% opacity with a slow Ken Burns scale, blur,
 * desaturation, a color wash, a vignette, and film grain. Shared so any
 * section can reuse the identical treatment instead of drifting out of
 * sync with the hero over time.
 *
 * Desktop (>=768px) plays the video; mobile only ever loads the static
 * poster frame (battery/data). `fallback` renders if both are unavailable
 * - omit it to just show whatever the section's own background is.
 */
export function CinematicVideoLayer({ fallback = null, overlayClassName = 'bg-[#EB0028]/55' }: CinematicVideoLayerProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);
  const [ready, setReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);

  // Decide desktop vs. mobile before ever touching the network, so mobile
  // never issues a request for the video file at all.
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 768px)');
    const update = () => setIsDesktop(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  // Lazy-load: let the section's text paint first, mount the media a tick
  // later so the (heavier) video/image never competes with LCP.
  useEffect(() => {
    const ric = window.requestIdleCallback;
    const cic = window.cancelIdleCallback;
    if (typeof ric === 'function' && typeof cic === 'function') {
      const handle = ric(() => setReady(true));
      return () => cic(handle);
    }
    const handle = window.setTimeout(() => setReady(true), 200);
    return () => window.clearTimeout(handle);
  }, []);

  const showVideo = ready && isDesktop && !videoFailed;
  const showPoster = ready && !isDesktop && !posterFailed;
  const showFallback = !showVideo && !showPoster;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {showVideo && (
        <motion.video
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            opacity: 0.12,
            filter: 'blur(2.5px) grayscale(35%) saturate(70%)',
          }}
          src={VIDEO_SRC}
          poster={!posterFailed ? POSTER_SRC : undefined}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onError={() => setVideoFailed(true)}
          initial={{ scale: 1 }}
          animate={prefersReducedMotion ? undefined : { scale: [1, 1.08, 1] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        />
      )}

      {showPoster && (
        <img
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            opacity: 0.12,
            filter: 'blur(2.5px) grayscale(35%) saturate(70%)',
          }}
          src={POSTER_SRC}
          alt=""
          loading="lazy"
          onError={() => setPosterFailed(true)}
        />
      )}

      {/* Color wash - sits above the media so the section always reads as
          its own solid color first and cinematic texture second. */}
      {(showVideo || showPoster) && <div className={`absolute inset-0 ${overlayClassName}`} />}

      {showFallback && fallback}

      {/* Vignette - keeps the eye centered on the copy regardless of what's beneath. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.32) 100%)',
        }}
      />

      {/* Film grain - barely-there texture so it reads as cinematic, not flat. */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{ backgroundImage: `url("${GRAIN_SVG}")` }}
      />
    </div>
  );
}
