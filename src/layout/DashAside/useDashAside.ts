import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLocation } from "react-router-dom";
import { navItems } from './data';

export const useDashAside = () => {
  const container = useRef<HTMLUListElement>(null);
  const timelines = useRef<gsap.core.Timeline[]>([]);
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isGsapReady, setIsGsapReady] = useState(false);

  const resolveIndexFromPath = (pathname: string): number | null => {
    const match = pathname.match(/^\/([^/]+)/);
    if (!match) return null;

    const slug = match[1];
    const foundIndex = navItems.findIndex((item) => item.to === `/${slug}`);
    return foundIndex === -1 ? null : foundIndex;
  };

  const activateIndex = (index: number) => {
    if (activeIndex === index) return;

    if (activeIndex !== null) {
      timelines.current[activeIndex]?.reverse();
    }

    timelines.current[index]?.play();
    setActiveIndex(index);
  };

  useGSAP(() => {
    timelines.current = [];
    const elements = gsap.utils.toArray<HTMLElement>(".item");

    elements.forEach((el, i) => {
      const fontA = el.querySelector<HTMLElement>(".fontA");
      const fontB = el.querySelector<HTMLElement>(".fontB");

      if (!fontA || !fontB) return;

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power2.out" },
        onStart: () => {
          gsap.set(fontB, { display: "block" });
        },
        onReverseComplete: () => {
          gsap.set(fontA, { clearProps: "all" });
          gsap.set(fontB, { display: "none", opacity: 0 });
        },
      });

      tl
        .to(fontA, {
          opacity: 0,
          scale: 0.98,
          duration: 0.2,
        })
        .fromTo(
          fontB,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.3 },
          "<"
        );

      timelines.current[i] = tl;
    });
    setIsGsapReady(true);
  }, { scope: container });

  useEffect(() => {
    if (!isGsapReady) return;

    const routeIndex = resolveIndexFromPath(location.pathname);
    if (routeIndex === null) return;

    activateIndex(routeIndex);
  }, [location.pathname, isGsapReady, activeIndex]);

  const handleClickGSAP = (index: number) => {
    activateIndex(index);
  };

  return {
    container,
    handleClickGSAP,
  };
};
