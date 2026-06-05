import { useRef, useCallback, useEffect } from 'react';
import gsap from 'gsap';

export function useDashAsideCellphone() {
  const containerRef = useRef<HTMLElement | null>(null);
  const arrowRef = useRef<HTMLImageElement | null>(null);
  const isOpenRef = useRef(false);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      gsap.set(container, { x: '-100%' });
    }
  }, []);

  const toggleAside = useCallback(() => {
    const container = containerRef.current;
    const arrow = arrowRef.current;
    if (!container) return;

    if (tweenRef.current) {
      tweenRef.current.kill();
    }

    const currentState = isOpenRef.current;

    if (currentState) {
      tweenRef.current = gsap.to(container, {
        x: '-100%',
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
    } else {
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
    }

    isOpenRef.current = !currentState;
  }, []);

  return {
    containerRef,
    arrowRef,
    toggleAside,
  };
}