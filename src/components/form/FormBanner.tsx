import { motion } from 'framer-motion';

interface FormBannerProps {
  message: string;
}

/** Form-level error banner, e.g. a failed submission. Individual field errors render inline instead. */
export function FormBanner({ message }: FormBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      role="alert"
      className="rounded-lg border border-[#EB0028]/25 bg-[#EB0028]/5 px-4 py-3 text-[14px] text-[#EB0028]"
    >
      {message}
    </motion.div>
  );
}
