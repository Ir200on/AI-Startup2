"use client";
import { Button } from "@/component/Button";
import starsBg from "@/assets/stars.png";
import gridLines from "@/assets/grid-lines.png";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import { RefObject, useEffect, useRef, useState } from "react";

const useRelativeMousePosition = (to: RefObject<HTMLElement>) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const updateMousePosition = (event: MouseEvent) => {
    if (!to.current) return;
    const { top, left } = to.current.getBoundingClientRect();
    mouseX.set(event.x - left);
    mouseY.set(event.y - top);
  };

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return [mouseX, mouseY];
};

export const CallToAction = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const borderDivRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const backgroundPositionY = useTransform(
    scrollYProgress,
    [0, 1],
    [-300, 300]
  );

  const [mouseX, mouseY] = useRelativeMousePosition(borderDivRef);

  const maskImageTemplate = useMotionTemplate`radial-gradient(150px 150px at ${mouseX}px ${mouseY}px, black 0%, transparent 80%)`;

  const [maskImage, setMaskImage] = useState("");

  useEffect(() => {
    return maskImageTemplate.on("change", (val) => {
      setMaskImage(val);
    });
  }, [maskImageTemplate]);

  return (
    <section className="py-20 md:py-24" ref={sectionRef}>
      <div className="container">
        <motion.div
          ref={borderDivRef}
          className="border border-white/15 py-24 rounded-xl overflow-hidden relative group"
          animate={{ backgroundPositionX: starsBg.width }}
          transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
          style={{
            backgroundPositionY,
            backgroundImage: `url(${starsBg.src})`,
          }}
        >
          <motion.div
            className="absolute inset-0 bg-[rgb(74,32,138)] bg-blend-overlay transition duration-700 pointer-events-none"
            style={{
              maskImage,
              WebkitMaskImage: maskImage,
              backgroundImage: `url(${gridLines.src})`,
            }}
          />

          <div className="relative">
            <h2 className="text-5xl md:text-6xl max-w-sm mx-auto tracking-tighter text-center font-medium">
              AI-driven SEO for everyone.
            </h2>
            <p className="text-center text-lg md:text-xl max-w-xs mx-auto text-white/70 px-4 mt-5 tracking-tight">
              Achieve clear, impactful results without the complexity.
            </p>
            <div className="flex justify-center mt-8">
              <Button>Join waitlist</Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
