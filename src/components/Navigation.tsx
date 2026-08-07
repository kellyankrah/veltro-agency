import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useScrolled } from '../hooks/useScrolled';

const NAV_LINKS = [
  { label: 'About', href: '/#about' },
  { label: 'Participate', href: '/#participate' },
  { label: 'Roadmap', href: '/#roadmap' },
  { label: 'TEDx Club', href: '/#tedx-club' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Organizer', href: '/#organizer' },
];

export function Navigation() {
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const isLanding = pathname === '/';

  // Close the mobile menu whenever the viewport grows back to desktop size.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // On the application pages there's no red/black hero underneath to
  // scroll past, so the nav stays solid always rather than starting
  // transparent over white form content.
  const solid = !isLanding || scrolled || menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? 'bg-black' : 'bg-transparent'
      }`}
    >
      <a
        href="#main-content"
        className="sr-only-focusable fixed left-4 top-4 z-[60] rounded-md bg-white px-4 py-2 text-sm font-semibold text-black"
      >
        Skip to content
      </a>

      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-5 md:px-10"
      >
        <Link
          to="/"
          className="text-[15px] font-bold tracking-tight text-white"
          aria-label="TEDxGramblingStateUniversity, back to top"
        >
          TEDx<span className="text-[#EB0028]">Grambling</span>StateUniversity
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                className="text-[13px] font-medium tracking-wide text-white/70 transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Link
            to="/#participate"
            className="inline-flex items-center justify-center rounded-full bg-[#EB0028] px-6 py-2.5 text-[13px] font-semibold text-white transition-transform duration-300 hover:scale-[1.04] hover:bg-[#EB0028]/90"
          >
            Apply
          </Link>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center text-white md:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="relative block h-4 w-6">
            <motion.span
              className="absolute left-0 top-0 h-[1.5px] w-6 bg-white"
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }}
              transition={{ duration: 0.25 }}
            />
            <motion.span
              className="absolute left-0 top-[7px] h-[1.5px] w-6 bg-white"
              animate={{ opacity: menuOpen ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="absolute left-0 top-[14px] h-[1.5px] w-6 bg-white"
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }}
              transition={{ duration: 0.25 }}
            />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden bg-black md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 pb-8 pt-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 text-lg font-medium text-white/80 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-4">
                <Link
                  to="/#participate"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#EB0028] px-6 py-3 text-[15px] font-semibold text-white"
                >
                  Apply
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
