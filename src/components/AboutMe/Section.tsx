// components/AboutMe/Section.tsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Section = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrapper = document.querySelector(".aboutMeWrapper");

    if (ref.current && wrapper) {
      gsap.from(ref.current, {
        scrollTrigger: {
          trigger: ref.current,
          scroller: wrapper, // 💡 내부 스크롤 div를 기준으로
          start: "top 90%", // 또는 "top bottom"도 OK
          invalidateOnRefresh: true,
          // markers: true, // 디버깅 시 시각 표시
        },
        opacity: 0,
        y: 40,
        duration: 0.7,
        ease: "power3.out",
      });
    }
  }, []);

  return (
    <section ref={ref} className={className}>
      {children}
    </section>
  );
};

export default Section;
