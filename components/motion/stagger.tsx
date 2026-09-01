'use client';

import { motion, type HTMLMotionProps } from 'motion/react';
import { fadeUpVariants } from '@/lib/motion';

interface StaggerContainerProps extends HTMLMotionProps<'div'> {
  staggerDelay?: number;
  children: React.ReactNode;
}

export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  className,
  ...props
}: StaggerContainerProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  ...props
}: HTMLMotionProps<'div'> & { children: React.ReactNode }) {
  return (
    <motion.div
      variants={fadeUpVariants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
