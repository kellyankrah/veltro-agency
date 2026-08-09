import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * React Router doesn't scroll or manage focus for you. This mounts once
 * at the app root and handles:
 *  - navigating to a route with a #hash (e.g. nav links using "/#about")
 *    scrolls the matching section into view, even across a route change.
 *  - navigating to a route with no hash resets scroll to the top, so
 *    going from a mid-scroll landing page to /speaker doesn't land you
 *    halfway down a blank page.
 *  - on an actual page change (not just a hash move within the same
 *    page), focus shifts to the new page's <main>, so screen reader and
 *    keyboard users land on the new content instead of a nav link that
 *    no longer makes sense in the new context.
 */
export function ScrollToHash() {
  const { pathname, hash } = useLocation();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    const pageChanged = previousPathname.current !== pathname;
    previousPathname.current = pathname;

    if (hash) {
      const id = hash.slice(1);
      const raf = requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      return () => cancelAnimationFrame(raf);
    }

    window.scrollTo({ top: 0 });

    if (pageChanged) {
      document.getElementById('main-content')?.focus();
    }
  }, [pathname, hash]);

  return null;
}
