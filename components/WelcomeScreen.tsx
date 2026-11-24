"use client";

import type { CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import PixelCanvas from "./PixelCanvas";
import PixelHeart from "./PixelHeart";
import Mailbox from "./Mailbox";
import Flower from "./Flower";
import FloatingHearts from "./FloatingHearts";
import type { Navigate } from "@/lib/navigation";

const abs: CSSProperties = { position: "absolute" };

const STARS = [
  { left: 18, top: 14, size: 1, opacity: 0.8 },
  { left: 42, top: 28, size: 1, opacity: 0.5 },
  { left: 60, top: 12, size: 2, opacity: 0.9 },
  { left: 92, top: 20, size: 1, opacity: 0.6 },
  { left: 120, top: 11, size: 1, opacity: 0.7 },
  { left: 150, top: 24, size: 1, opacity: 0.5 },
  { left: 178, top: 12, size: 2, opacity: 0.8 },
  { left: 208, top: 32, size: 1, opacity: 0.6 },
  { left: 228, top: 16, size: 1, opacity: 0.9 },
  { left: 80, top: 38, size: 1, opacity: 0.4 },
  { left: 198, top: 46, size: 1, opacity: 0.5 },
];

const TUFTS = [
  { left: 12, top: 132 },
  { left: 34, top: 140 },
  { left: 96, top: 134 },
  { left: 124, top: 142 },
  { left: 210, top: 136 },
  { left: 228, top: 144 },
];

function WelcomeScene() {
  return (
    <>
      <div
        style={{
          ...abs,
          inset: 0,
          background:
            "linear-gradient(180deg, var(--sky-top) 0%, var(--sky-mid) 58%, var(--sky-bottom) 100%)",
          zIndex: 0,
        }}
      />

      {STARS.map((star, index) => (
        <div
          key={index}
          style={{
            ...abs,
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            background: "var(--cream)",
            opacity: star.opacity,
            zIndex: 1,
          }}
        />
      ))}

      <div
        aria-hidden="true"
        style={{
          ...abs,
          left: 216,
          top: 24,
          width: 16,
          height: 16,
          background: "var(--cream)",
          boxShadow: "0 0 0 2px rgba(255, 248, 251, 0.18)",
          zIndex: 1,
        }}
      />
      <div style={{ ...abs, left: 220, top: 28, width: 4, height: 4, background: "#e6d4e4", zIndex: 1 }} />
      <div style={{ ...abs, left: 226, top: 34, width: 3, height: 3, background: "#e6d4e4", zIndex: 1 }} />

      <div style={{ ...abs, left: -12, top: 94, width: 110, height: 28, background: "#3b2754", zIndex: 1 }} />
      <div style={{ ...abs, left: 4, top: 88, width: 70, height: 8, background: "#3b2754", zIndex: 1 }} />
      <div style={{ ...abs, left: 18, top: 82, width: 38, height: 8, background: "#3b2754", zIndex: 1 }} />
      <div style={{ ...abs, left: 28, top: 78, width: 16, height: 6, background: "#3b2754", zIndex: 1 }} />

      <div style={{ ...abs, left: 146, top: 98, width: 110, height: 24, background: "#3b2754", zIndex: 1 }} />
      <div style={{ ...abs, left: 168, top: 92, width: 72, height: 8, background: "#3b2754", zIndex: 1 }} />
      <div style={{ ...abs, left: 188, top: 86, width: 36, height: 8, background: "#3b2754", zIndex: 1 }} />
      <div style={{ ...abs, left: 198, top: 82, width: 16, height: 6, background: "#3b2754", zIndex: 1 }} />

      <div style={{ ...abs, left: 0, top: 120, width: 240, height: 40, background: "var(--grass)", zIndex: 2 }} />
      <div style={{ ...abs, left: 0, top: 120, width: 240, height: 3, background: "var(--grass-light)", zIndex: 2 }} />

      <div style={{ ...abs, left: 170, top: 121, width: 10, height: 5, background: "#d9b48f", zIndex: 2 }} />
      <div style={{ ...abs, left: 165, top: 126, width: 17, height: 5, background: "#d9b48f", zIndex: 2 }} />
      <div style={{ ...abs, left: 158, top: 131, width: 26, height: 6, background: "#d9b48f", zIndex: 2 }} />
      <div style={{ ...abs, left: 150, top: 137, width: 36, height: 8, background: "#d9b48f", zIndex: 2 }} />
      <div style={{ ...abs, left: 141, top: 145, width: 48, height: 15, background: "#d9b48f", zIndex: 2 }} />

      {TUFTS.map((tuft, index) => (
        <div key={index} style={{ ...abs, left: tuft.left, top: tuft.top, zIndex: 2 }}>
          <div style={{ ...abs, left: 0, top: 0, width: 2, height: 4, background: "var(--grass-dark)" }} />
          <div style={{ ...abs, left: 3, top: -1, width: 2, height: 5, background: "var(--grass-dark)" }} />
        </div>
      ))}

      <FloatingHearts />

      <Mailbox />

      <Flower x={16} y={106} petal="var(--pink)" />
      <Flower x={37} y={112} petal="var(--pink-light)" />
      <Flower x={57} y={103} petal="var(--red)" center="var(--gold)" />
      <Flower x={86} y={115} petal="var(--pink)" />
      <Flower x={132} y={112} petal="var(--pink-light)" />
      <Flower x={212} y={108} petal="var(--pink)" />

      <div className="scene-title" style={{ zIndex: 6 }}>
        A ROOM FOR YOU
      </div>
      <div className="scene-subtitle" style={{ zIndex: 6 }}>
        a tiny place to rest
      </div>
    </>
  );
}

type WelcomeScreenProps = {
  navigate: Navigate;
};

export default function WelcomeScreen({ navigate }: WelcomeScreenProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="screen" aria-label="Welcome">
      <div className="scene-frame">
        <PixelCanvas label="A pink pixel mailbox among flowers in a moonlit garden">
          <WelcomeScene />
        </PixelCanvas>
      </div>

      <motion.button
        type="button"
        className="press-start"
        onClick={() => navigate("ROOM")}
        aria-label="Press Start to enter the room"
        whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
      >
        <PixelHeart size={12} color="var(--red)" />
        <motion.span
          className="press-start__blink"
          animate={
            shouldReduceMotion
              ? undefined
              : { opacity: [1, 1, 0.2, 0.2, 1] }
          }
          transition={
            shouldReduceMotion
              ? undefined
              : {
                  duration: 1.9,
                  repeat: Infinity,
                  ease: "linear",
                  times: [0, 0.45, 0.5, 0.95, 1],
                }
          }
        >
          PRESS START
        </motion.span>
      </motion.button>

      <p className="hint">tap to come inside</p>
    </section>
  );
}
