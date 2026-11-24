"use client";

import { motion, useReducedMotion } from "framer-motion";
import PixelHeart from "./PixelHeart";

const HEARTS = [
  { left: 118, top: 64, size: 8, delay: 0, duration: 6.2, drift: -12, color: "var(--pink)" },
  { left: 192, top: 46, size: 6, delay: 1.4, duration: 7.4, drift: 8, color: "var(--pink-light)" },
  { left: 70, top: 74, size: 7, delay: 2.6, duration: 6.8, drift: 10, color: "var(--red)" },
  { left: 166, top: 98, size: 5, delay: 0.8, duration: 5.6, drift: -8, color: "var(--pink)" },
  { left: 104, top: 104, size: 6, delay: 3.4, duration: 7, drift: 6, color: "var(--pink-light)" },
  { left: 136, top: 38, size: 5, delay: 4.2, duration: 8, drift: -10, color: "var(--pink)" },
];

export default function FloatingHearts() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div aria-hidden="true">
      {HEARTS.map((heart, index) => (
        <motion.div
          key={index}
          style={{
            position: "absolute",
            left: heart.left,
            top: heart.top,
            zIndex: 3,
          }}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 0, x: 0 }}
          animate={
            shouldReduceMotion
              ? { opacity: 0.85 }
              : {
                  opacity: [0, 1, 1, 0],
                  y: [0, -18, -36, -52],
                  x: [0, heart.drift / 2, heart.drift, heart.drift],
                }
          }
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : {
                  duration: heart.duration,
                  delay: heart.delay,
                  repeat: Infinity,
                  ease: "easeOut",
                  times: [0, 0.2, 0.7, 1],
                }
          }
        >
          <PixelHeart size={heart.size} color={heart.color} />
        </motion.div>
      ))}
    </div>
  );
}
