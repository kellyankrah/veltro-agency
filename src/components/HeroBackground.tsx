import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const VIDEO_SRC = '/hero/hero-background.mp4';
const POSTER_SRC = '/hero/hero-poster.jpg';

// Featherlight film grain — pure SVG noise, no image asset. Kept faint
// enough that it reads as texture, not as a visible effect.
const GRAIN_SVG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

/**
 * ASSET PLACEHOLDER: hero-background.mp4 / hero-poster.jpg
 *
 * Drop the final files into /public/hero/ using those exact names and this
 * component activates automatically — no code changes needed. Until then
 * (or if either file 404s / fails to decode), it falls back to the
 * animated gradient below, so the hero never breaks.
 *
 * Desktop (>=768px): a muted, looping, autoplaying video plays behind the
 * copy at low opacity with a slow Ken Burns scale. Mobile never loads the
 * video at all — it shows the poster frame as a static image instead, for
 * battery/data reasons — falling back to the gradient if that's missing too.
 */
export function HeroBackground() {
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

  // Lazy-load: let the hero's text paint first, mount the media a tick
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
  const showGradient = !showVideo && !showPoster;

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

      {/* TED-red wash — sits above the media so the hero always reads as
          "solid TED red" first and cinematic texture second. */}
      {(showVideo || showPoster) && <div className="absolute inset-0 bg-[#EB0028]/55" />}

      {showGradient && (
        <>
          <div className="absolute -left-32 -top-32 h-[32rem] w-[32rem] rounded-full bg-white/10 blur-[110px] animate-float-slow" />
          <div className="absolute -bottom-40 -right-20 h-[36rem] w-[36rem] rounded-full bg-black/20 blur-[120px] animate-float-slower" />
          <div className="absolute left-1/2 top-1/3 h-[24rem] w-[24rem] -translate-x-1/2 rounded-full bg-white/5 blur-[100px] animate-float-slow" />
        </>
      )}

      {/* Vignette — keeps the eye centered on the copy regardless of what's beneath. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.32) 100%)',
        }}
      />

      {/* Film grain — barely-there texture so the hero reads as cinematic, not flat. */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{ backgroundImage: `url("${GRAIN_SVG}")` }}
      />
    </div>
  );
}
