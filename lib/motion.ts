export const TRANSITION_EASE = [0.19, 1, 0.22, 1] as const;
export const TRANSITION_SMOOTH = [0.16, 1, 0.3, 1] as const;

export const DURATIONS = {
  fast: 0.45,
  normal: 0.85,
  slow: 1.25,
  verySlow: 1.65,
} as const;

export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: DURATIONS.normal,
      ease: TRANSITION_EASE,
    },
  },
};

export const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATIONS.normal,
      ease: TRANSITION_EASE,
    },
  },
};

export const fadeDownVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATIONS.normal,
      ease: TRANSITION_EASE,
    },
  },
};

export const scaleUpVariants = {
  hidden: { opacity: 0, scale: 0.94, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: DURATIONS.slow,
      ease: TRANSITION_EASE,
    },
  },
};
