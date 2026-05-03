export const pageVariants = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0,
    transition: { duration: 0.4, ease: "easeOut" } },
  exit:    { opacity: 0, y: -16 },
};

export const cardVariants = {
  hidden:  { opacity: 0, scale: 0.96, y: 20 },
  visible: (i: number) => ({
    opacity: 1, scale: 1, y: 0,
    transition: {
      delay: i * 0.08, duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94] as any,
    },
  }),
};

export const slideInRight = {
  hidden:  { x: "100%", opacity: 0 },
  visible: { x: 0, opacity: 1,
    transition: { type: "spring", damping: 28, stiffness: 300 } },
  exit:    { x: "100%", opacity: 0,
    transition: { duration: 0.2 } },
};

export const slideInLeft = {
  hidden:  { x: -60, opacity: 0 },
  visible: { x: 0, opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" } },
};

export const stepVariants = {
  hidden:  { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  exit:    { opacity: 0, x: -30, transition: { duration: 0.2 } },
};

export const staggerContainer = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export const staggerItem = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1,
    transition: { duration: 0.3, ease: "easeOut" } },
  exit:    { opacity: 0, scale: 0.92 },
};
