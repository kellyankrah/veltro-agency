import { Reveal } from './Reveal';
import { EditorialImage } from './EditorialImage';

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-24 bg-black px-6 py-28 md:px-10 md:py-36"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid items-center gap-12 md:grid-cols-[minmax(0,420px)_1fr] md:gap-16">
          <EditorialImage
            src="/images/about-editorial.jpg"
            alt="The Grambling State University campus gate"
            variant="fade-up"
            className="aspect-[4/3] w-full"
          />

          <div>
            <Reveal>
              <h2
                id="about-heading"
                className="text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight text-white"
              >
                One idea can change everything.
              </h2>
            </Reveal>

            <Reveal delay={0.15} className="mt-6 flex flex-col gap-6">
              <p className="text-[16px] leading-[1.7] text-[#B3B3B3] md:text-[18px]">
                TEDxGramblingStateUniversity is an independently organized TEDx event
                presented by the Grambling State University Student Government
                Association, bringing together students, faculty, alumni, and community
                leaders to share ideas that educate, challenge perspectives, and inspire
                meaningful action.
              </p>
              <p className="text-[16px] leading-[1.7] text-[#B3B3B3] md:text-[18px]">
                As part of the global TEDx community, our mission is simple: build a
                stage where powerful ideas meet the people ready to carry them forward.
              </p>
              <p className="text-[16px] leading-[1.7] text-white md:text-[18px]">
                Because the next idea capable of changing someone's life may already
                exist within our own community — it just hasn't found its stage yet.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
