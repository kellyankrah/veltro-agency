const SOCIALS = [
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    path: 'M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465a4.9 4.9 0 0 1 1.771 1.153 4.9 4.9 0 0 1 1.153 1.771c.248.637.415 1.363.465 2.428.05 1.066.06 1.405.06 4.122s-.01 3.056-.06 4.122c-.05 1.065-.217 1.79-.465 2.428a4.9 4.9 0 0 1-1.153 1.771 4.9 4.9 0 0 1-1.771 1.153c-.637.248-1.363.415-2.428.465-1.066.05-1.405.06-4.122.06s-3.056-.01-4.122-.06c-1.065-.05-1.79-.217-2.428-.465a4.9 4.9 0 0 1-1.771-1.153 4.9 4.9 0 0 1-1.153-1.771c-.248-.637-.415-1.363-.465-2.428C2.01 15.056 2 14.717 2 12s.01-3.056.06-4.122c.05-1.065.217-1.79.465-2.428A4.9 4.9 0 0 1 3.678 3.68 4.9 4.9 0 0 1 5.45 2.525c.637-.248 1.363-.415 2.428-.465C8.944 2.01 9.283 2 12 2Zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.25a3.25 3.25 0 1 1 0-6.5 3.25 3.25 0 0 1 0 6.5ZM18.5 6.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z',
  },
  {
    label: 'X (Twitter)',
    href: 'https://x.com',
    path: 'M18.244 2H21.5l-7.51 8.59L23 22h-6.917l-5.41-6.94L4.5 22H1.24l8.03-9.18L1 2h7.083l4.897 6.35L18.244 2Zm-1.21 18h1.803L7.05 3.9H5.117L17.034 20Z',
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com',
    path: 'M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.56A3.02 3.02 0 0 0 .5 6.2C0 8.08 0 12 0 12s0 3.92.5 5.8a3.02 3.02 0 0 0 2.12 2.14c1.88.56 9.38.56 9.38.56s7.5 0 9.38-.56a3.02 3.02 0 0 0 2.12-2.14c.5-1.88.5-5.8.5-5.8s0-3.92-.5-5.8ZM9.6 15.6V8.4l6.4 3.6-6.4 3.6Z',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.065 2.065 0 1 1 0-4.13 2.065 2.065 0 0 1 0 4.13ZM7.119 20.452H3.555V9h3.564v11.452Z',
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[#2A2A2A] bg-black px-6 py-16 md:px-10">
      {/* ASSET PLACEHOLDER: /images/footer-panorama.jpg — a wide campus shot
          for atmosphere only. Drop the file in and swap this placeholder
          for an <img>; the overlay below keeps it subtle either way. */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#121212] to-black opacity-40"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/60" aria-hidden="true" />

      <div className="relative mx-auto flex max-w-[1280px] flex-col items-center gap-8 text-center">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-white/50">
            Presented by
          </p>
          <p className="mt-2 text-lg font-bold text-white">
            Grambling State University Student Government Association
          </p>
        </div>

        <p className="max-w-md text-[13px] leading-relaxed text-[#B3B3B3]">
          This independent TEDx event is operated under license from TED.
        </p>

        <ul className="flex items-center gap-5">
          {SOCIALS.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={social.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#2A2A2A] text-white/60 transition-colors duration-200 hover:border-[#EB0028] hover:text-[#EB0028]"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                  <path d={social.path} />
                </svg>
              </a>
            </li>
          ))}
        </ul>

        <p className="text-[12px] text-[#B3B3B3]/70">
          &copy; {new Date().getFullYear()} TEDxGramblingStateUniversity. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
