import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FormatDate } from "../../utils/FormatDate";
import { useHeaderDashboard } from "../../stores/headerDashboradStore/useHeaderDashboard";

export default function HeaderDashboard() {
  const currentDate = new FormatDate();
  const label = useHeaderDashboard((state) => state.label);
  const description = useHeaderDashboard((state) => state.description);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    if (!titleRef.current || !descRef.current) return;

    gsap.fromTo(
      [titleRef.current, descRef.current],
      { opacity: 0, y: -12 },
      { opacity: 1, y: 0, duration: 0.45, ease: "power2.out", stagger: 0.1 }
    );
  }, { dependencies: [label, description] });

  return (
    <header className="flex justify-between">
          <section className="flex flex-col w-104">
            <h1 ref={titleRef} className="font-antonio text-h1-32 drop-shadow-[0_1px_1px_rgba(0,0,0,0.45)] text-glacier-blue">{label}</h1>
            <p ref={descRef} className="text-font-16 font-semibold">{description}</p>
          </section>
          <section className="w-57 mt-1 font-semibold grid grid-cols-[46px_1fr] h-11.5 gap-2 grid-rows-2">
            <div className="w-11.5 h-11.5 rounded-full bg-gray-300 row-span-2"></div>
            <p className="text-p-16">Luisa Rodson</p>
            <p className="text-p-16 text-dark-green">{currentDate.toSpanishFormat()}</p>
          </section>
        </header>
  )
}
