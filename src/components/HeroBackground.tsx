import { CinematicVideoLayer } from './CinematicVideoLayer';

/**
 * ASSET PLACEHOLDER: hero-background.mp4 / hero-poster.jpg
 *
 * Drop the final files into /public/hero/ using those exact names and this
 * activates automatically - no code changes needed. Until then (or if
 * either file 404s / fails to decode), it falls back to the animated
 * gradient below, so the hero never breaks. See CinematicVideoLayer for
 * the shared video/poster/vignette/grain treatment (also used by the
 * Participate section).
 */
export function HeroBackground() {
  return (
    <CinematicVideoLayer
      fallback={
        <>
          <div className="absolute -left-32 -top-32 h-[32rem] w-[32rem] rounded-full bg-white/10 blur-[110px] animate-float-slow" />
          <div className="absolute -bottom-40 -right-20 h-[36rem] w-[36rem] rounded-full bg-black/20 blur-[120px] animate-float-slower" />
          <div className="absolute left-1/2 top-1/3 h-[24rem] w-[24rem] -translate-x-1/2 rounded-full bg-white/5 blur-[100px] animate-float-slow" />
        </>
      }
    />
  );
}
