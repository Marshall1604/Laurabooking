'use client';

import { motion, type HTMLMotionProps } from 'motion/react';
import { DURATIONS, TRANSITION_EASE } from '@/lib/motion';

interface FadeInProps extends HTMLMotionProps<'div'> {
  delay?: number;
  duration?: number;
  children: React.ReactNode;
}

export function FadeIn({
  children,
  delay = 0,
  duration = DURATIONS.normal,
  className,
  ...props
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-30px' }}
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
