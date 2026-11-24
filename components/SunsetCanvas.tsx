"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

type RGB = [number, number, number];

const HEART_ROWS = [
  "0110110",
  "1111111",
  "1111111",
  "0111110",
  "0011100",
  "0001000",
];

const STARS = [
  [18, 18, 1],
  [37, 33, 1],
  [54, 13, 2],
  [73, 26, 1],
  [92, 16, 1],
  [111, 35, 1],
  [129, 11, 2],
  [148, 29, 1],
  [166, 19, 1],
  [186, 38, 1],
  [204, 14, 2],
  [222, 31, 1],
  [232, 47, 1],
  [27, 52, 1],
  [63, 46, 1],
  [101, 54, 1],
  [158, 48, 1],
  [214, 58, 1],
];

const SKY_DAY_TOP = hexToRgb("#5aa7d6");
const SKY_DAY_BOTTOM = hexToRgb("#c9edf3");
const SKY_SUNSET_TOP = hexToRgb("#6a3a72");
const SKY_SUNSET_BOTTOM = hexToRgb("#ffa6bf");
const SKY_NIGHT_TOP = hexToRgb("#120c1f");
const SKY_NIGHT_BOTTOM = hexToRgb("#6a3a72");

const GROUND_DAY_TOP = hexToRgb("#6dbb7a");
const GROUND_DAY_BOTTOM = hexToRgb("#3f8f63");
const GROUND_DUSK_TOP = hexToRgb("#8d7460");
const GROUND_DUSK_BOTTOM = hexToRgb("#4f5a4b");
const GROUND_NIGHT_TOP = hexToRgb("#24313a");
const GROUND_NIGHT_BOTTOM = hexToRgb("#141d26");

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function hexToRgb(hex: string): RGB {
  const value = Number.parseInt(hex.slice(1), 16);

  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}

function mix(start: RGB, end: RGB, amount: number): RGB {
  const t = clamp01(amount);

  return [
    start[0] + (end[0] - start[0]) * t,
    start[1] + (end[1] - start[1]) * t,
    start[2] + (end[2] - start[2]) * t,
  ];
}

function css(color: RGB) {
  return `rgb(${Math.round(color[0])}, ${Math.round(color[1])}, ${Math.round(
    color[2],
  )})`;
}

function phaseColor(
  day: RGB,
  sunset: RGB,
  night: RGB,
  dusk: number,
): RGB {
  const sunsetAmount = clamp01(dusk / 0.68);
  const nightAmount = clamp01((dusk - 0.68) / 0.32);

  return mix(mix(day, sunset, sunsetAmount), night, nightAmount);
}

function fillHeart(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  scale: number,
  color: string,
) {
  ctx.fillStyle = color;
  HEART_ROWS.forEach((row, rowIndex) => {
    row.split("").forEach((cell, columnIndex) => {
      if (cell === "1") {
        ctx.fillRect(
          x + columnIndex * scale,
          y + rowIndex * scale,
          scale,
          scale,
        );
      }
    });
  });
}

function drawSunsetScene(ctx: CanvasRenderingContext2D, dusk: number) {
  ctx.clearRect(0, 0, 240, 160);
  ctx.imageSmoothingEnabled = false;

  const skyTop = phaseColor(
    SKY_DAY_TOP,
    SKY_SUNSET_TOP,
    SKY_NIGHT_TOP,
    dusk,
  );
  const skyBottom = phaseColor(
    SKY_DAY_BOTTOM,
    SKY_SUNSET_BOTTOM,
    SKY_NIGHT_BOTTOM,
    dusk,
  );

  const bandCount = 20;
  const skyHeight = 112;
  const bandHeight = skyHeight / bandCount;

  for (let index = 0; index < bandCount; index += 1) {
    const amount = index / (bandCount - 1);
    ctx.fillStyle = css(mix(skyTop, skyBottom, amount));
    ctx.fillRect(
      0,
      Math.floor(index * bandHeight),
      240,
      Math.ceil(bandHeight) + 1,
    );
  }

  const glowAmount = Math.sin(clamp01(dusk) * Math.PI);
  ctx.globalAlpha = glowAmount * 0.3;
  ctx.fillStyle = "#ffd76e";
  ctx.fillRect(0, 82, 240, 30);
  ctx.globalAlpha = 1;

  const sunColor = css(mix(hexToRgb("#ffe38a"), hexToRgb("#ff9e7a"), dusk));
  const sunX = 181;
  const sunY = 28 + clamp01(dusk / 0.82) * 88;

  ctx.globalAlpha = 0.16;
  ctx.fillStyle = sunColor;
  ctx.fillRect(sunX - 6, sunY - 6, 28, 28);
  ctx.fillRect(sunX - 2, sunY - 10, 20, 36);
  ctx.globalAlpha = 1;
  ctx.fillStyle = sunColor;
  ctx.fillRect(sunX + 2, sunY, 12, 16);
  ctx.fillRect(sunX, sunY + 2, 16, 12);

  const starAlpha = clamp01((dusk - 0.54) / 0.36);
  if (starAlpha > 0) {
    ctx.globalAlpha = starAlpha;
    ctx.fillStyle = "#fff8fb";

    STARS.forEach(([x, y, size]) => {
      ctx.fillRect(x, y, size, size);
    });

    ctx.globalAlpha = 1;
  }

  const distantHill = phaseColor(
    GROUND_DAY_BOTTOM,
    GROUND_DUSK_BOTTOM,
    GROUND_NIGHT_BOTTOM,
    dusk,
  );
  ctx.fillStyle = css(distantHill);
  ctx.fillRect(0, 104, 56, 8);
  ctx.fillRect(48, 100, 42, 12);
  ctx.fillRect(142, 102, 48, 10);
  ctx.fillRect(182, 107, 58, 5);

  const groundTop = phaseColor(
    GROUND_DAY_TOP,
    GROUND_DUSK_TOP,
    GROUND_NIGHT_TOP,
    dusk,
  );
  const groundBottom = phaseColor(
    GROUND_DAY_BOTTOM,
    GROUND_DUSK_BOTTOM,
    GROUND_NIGHT_BOTTOM,
    dusk,
  );

  for (let index = 0; index < 10; index += 1) {
    const amount = index / 9;
    ctx.fillStyle = css(mix(groundTop, groundBottom, amount));
    ctx.fillRect(0, 112 + index * 5, 240, 6);
  }

  ctx.globalAlpha = 0.4;
  ctx.fillStyle = css(mix(groundTop, hexToRgb("#fff8fb"), 0.25));
  ctx.fillRect(0, 112, 240, 1);
  ctx.globalAlpha = 1;

  const wood = css(
    mix(hexToRgb("#a86d43"), hexToRgb("#59413f"), dusk),
  );
  const woodLight = css(
    mix(hexToRgb("#c88a5a"), hexToRgb("#755250"), dusk),
  );
  const woodDark = css(
    mix(hexToRgb("#6f432b"), hexToRgb("#382b34"), dusk),
  );

  ctx.fillStyle = woodDark;
  ctx.fillRect(84, 121, 5, 14);
  ctx.fillRect(150, 121, 5, 14);
  ctx.fillStyle = wood;
  ctx.fillRect(84, 94, 72, 5);
  ctx.fillRect(88, 102, 64, 3);
  ctx.fillRect(86, 99, 4, 17);
  ctx.fillRect(150, 99, 4, 17);
  ctx.fillRect(80, 116, 80, 5);
  ctx.fillRect(80, 110, 34, 3);
  ctx.fillRect(126, 110, 34, 3);
  ctx.fillRect(118, 112, 4, 9);
  ctx.fillStyle = woodLight;
  ctx.fillRect(84, 94, 72, 1);
  ctx.fillRect(80, 116, 80, 1);
  ctx.fillRect(83, 113, 30, 3);
  ctx.fillRect(127, 113, 30, 3);

  const figureAlpha = clamp01((dusk - 0.74) / 0.26);
  if (figureAlpha > 0) {
    ctx.globalAlpha = 0.2 * figureAlpha;
    ctx.fillStyle = "#ffd76e";
    ctx.fillRect(130, 77, 25, 27);
    ctx.fillRect(126, 82, 33, 17);
    ctx.fillRect(134, 72, 17, 37);

    ctx.globalAlpha = figureAlpha;
    ctx.fillStyle = "#4a2e3f";
    ctx.fillRect(138, 80, 12, 4);
    ctx.fillRect(136, 84, 2, 6);
    ctx.fillRect(150, 84, 2, 6);
    ctx.fillStyle = "#ffe4c9";
    ctx.fillRect(139, 84, 10, 8);
    ctx.fillStyle = "#ffe9dc";
    ctx.fillRect(137, 92, 13, 12);
    ctx.fillStyle = "#ffe4c9";
    ctx.fillRect(134, 98, 4, 7);
    ctx.fillRect(149, 98, 4, 7);
    ctx.fillStyle = "#6b3f52";
    ctx.fillRect(138, 104, 4, 11);
    ctx.fillRect(146, 104, 4, 11);

    ctx.globalAlpha = figureAlpha * 0.85;
    fillHeart(ctx, 140, 68, 1, "#ffd6e5");
    ctx.globalAlpha = 1;
  }

  ctx.globalAlpha = 0.28;
  ctx.fillStyle = "#120c1f";
  for (let x = 6; x < 236; x += 17) {
    ctx.fillRect(x, 145, 2, 4);
    ctx.fillRect(x + 5, 150, 2, 3);
  }
  ctx.globalAlpha = 1;
}

export default function SunsetCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (shouldReduceMotion) {
      drawSunsetScene(ctx, 1);
      return;
    }

    let frame = 0;
    const start = performance.now();
    const duration = 6000;

    drawSunsetScene(ctx, 0);

    const tick = (now: number) => {
      const dusk = clamp01((now - start) / duration);
      drawSunsetScene(ctx, dusk);

      if (dusk < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [shouldReduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      width={240}
      height={160}
      className="room-canvas"
      role="img"
      aria-label="A two-seat bench under a sky that fades from day to sunset to night"
    />
  );
}
