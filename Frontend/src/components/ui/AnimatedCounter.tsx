'use client';

import React, { useState, useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  value: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({ value, duration = 3000, className = '' }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  // Parse numeric target and non-numeric suffix
  const target = parseInt(value.replace(/,/g, '').replace(/[^0-9]/g, ''), 10) || 0;
  const suffix = value.replace(/^[0-9,]+/, '');

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Intersection observer to trigger animation when scrolled into view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 } // Trigger when 15% of the element is visible
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!hasAnimated) return;

    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Cubic ease-out curve for smooth decelerating count animation
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easedProgress * target));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [hasAnimated, target, duration]);

  return (
    <span ref={ref} className={className}>
      {hasAnimated ? count.toLocaleString() : '0'}
      {suffix}
    </span>
  );
}

export default AnimatedCounter;
