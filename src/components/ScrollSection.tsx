import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

interface ScrollSectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  duration?: number;
  threshold?: number;
}

export const ScrollSection: React.FC<ScrollSectionProps> = ({
  children,
  id,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 45,
  duration = 0.8,
  threshold = 0.15,
}) => {
  const getInitialOffset = () => {
    switch (direction) {
      case 'up':
        return { y: distance, x: 0 };
      case 'down':
        return { y: -distance, x: 0 };
      case 'left':
        return { x: distance, y: 0 };
      case 'right':
        return { x: -distance, y: 0 };
      case 'none':
      default:
        return { x: 0, y: 0 };
    }
  };

  const initial = {
    opacity: 0,
    ...getInitialOffset(),
    scale: 0.98,
    filter: 'blur(4px)',
  };

  return (
    <motion.div
      id={id}
      initial={initial}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
      }}
      viewport={{ once: true, margin: '-80px', amount: threshold }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // Cinematic cubic-bezier easing
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
}> = ({ children, className = '', staggerDelay = 0.12, delayChildren = 0.1 }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem: React.FC<{
  children: React.ReactNode;
  className?: string;
  distance?: number;
}> = ({ children, className = '', distance = 30 }) => {
  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: distance,
          scale: 0.96,
          filter: 'blur(3px)',
        },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          transition: {
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
