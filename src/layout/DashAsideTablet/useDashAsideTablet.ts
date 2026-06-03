import { useRef, useCallback, useState, useEffect } from 'react';
import gsap from 'gsap';

export function useDashAsideTablet() {
  const containerRef = useRef<HTMLElement | null>(null);
  const arrowRef = useRef<HTMLImageElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container && !isOpen) {
      gsap.set(container, { x: 0 });
    }
  }, []);

  const toggleAside = useCallback(() => {
    const container = containerRef.current;
    const arrow = arrowRef.current;
    if (!container) return;

    if (tweenRef.current) {
      tweenRef.current.kill();
    }

    if (isOpen) {
      tweenRef.current = gsap.to(container, {
        x: 0,
        duration: 0.6,
        ease: 'power2.inOut',
      });
      if (arrow) {
        gsap.to(arrow, {
          rotation: 180,
          duration: 0.6,
          ease: 'power2.inOut',
        });
      }
    } else {
      tweenRef.current = gsap.to(container, {
        x: 288,
        duration: 0.6,
        ease: 'power2.inOut',
      });
      if (arrow) {
        gsap.to(arrow, {
          rotation: 0,
          duration: 0.6,
          ease: 'power2.inOut',
        });
      }
    }

    setIsOpen(!isOpen);
  }, [isOpen]);

  return {
    containerRef,
    arrowRef,
    isOpen,
    toggleAside,
  };
}