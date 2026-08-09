import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const SESSION_KEY = 'tedx-intro-shown';
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function hasShownThisSession(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1';
  } catch {
    // Storage can throw in locked-down contexts (private browsing, etc.);
    // fail open rather than block the page on a splash screen.
    return true;
  }
}

/**
 * One-time entrance, shown once per browser tab session: black screen,
 * wordmark, "Ideas Worth Spreading", then a smooth fade into the homepage.
 * Skipped entirely on repeat visits within the session and for
 * prefers-reduced-motion, so it never gets in a returning visitor's way.
 */
export function LoadingScreen() {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(() => !prefersReducedMotion && !hasShownThisSession());

  useEffect(() => {
    if (!visible) return;

    const hide = window.setTimeout(() => {
      setVisible(false);
      try {
        sessionStorage.setItem(SESSION_KEY, '1');
      } catch {
        // Nothing to do if storage is unavailable; it'll just show again.
      }
    }, 1700);

    return () => window.clearTimeout(hide);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
          aria-hidden="true"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="text-[15px] font-bold tracking-tight text-white"
          >
            TEDx<span className="text-[#EB0028]">Grambling</span>StateUniversity
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: EASE }}
            className="mt-3 text-[13px] font-semibold uppercase tracking-[0.25em] text-white/50"
          >
            Ideas Worth Spreading
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
