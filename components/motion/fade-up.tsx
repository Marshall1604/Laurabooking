'use client';

import { motion, type HTMLMotionProps } from 'motion/react';
import { DURATIONS, TRANSITION_EASE } from '@/lib/motion';

interface FadeUpProps extends HTMLMotionProps<'div'> {
  delay?: number;
  duration?: number;
  yOffset?: number;
  children: React.ReactNode;
}

export function FadeUp({
  children,
  delay = 0,
  duration = DURATIONS.normal,
  yOffset = 28,
  className,
  ...props
}: FadeUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration,
        delay,
        ease: TRANSITION_EASE,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
