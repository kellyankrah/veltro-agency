import { motion } from 'framer-motion';
import type { Speaker } from '../data/speakers';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function SpeakerCard({ speaker, delay = 0 }: { speaker: Speaker; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      whileHover={{ y: -6 }}
      className="flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white"
    >
      <div className="aspect-[4/5] w-full overflow-hidden bg-[#121212]">
        <img src={speaker.photo} alt={speaker.name} className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold text-black">{speaker.name}</h3>
        <p className="mt-1 text-[14px] font-semibold text-[#EB0028]">{speaker.talkTitle}</p>
        <p className="mt-3 text-[14px] leading-relaxed text-black/60">{speaker.bio}</p>
      </div>
    </motion.div>
  );
}
