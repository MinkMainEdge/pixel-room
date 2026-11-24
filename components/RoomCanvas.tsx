"use client";

import { useEffect, useRef } from "react";

const HEART_ROWS = [
  "0110110",
  "1111111",
  "1111111",
  "0111110",
  "0011100",
  "0001000",
];

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

function drawRoom(ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, 240, 160);
  ctx.imageSmoothingEnabled = false;

  ctx.fillStyle = "#FFC2D4";
  ctx.fillRect(0, 0, 240, 110);
  ctx.fillStyle = "#FFB3C8";
  for (let x = 0; x < 240; x += 12) {
    ctx.fillRect(x, 0, 4, 110);
  }

  ctx.fillStyle = "#FFF8FB";
  ctx.fillRect(0, 108, 240, 2);

  ctx.fillStyle = "#D9A07F";
  ctx.fillRect(0, 110, 240, 50);
  ctx.fillStyle = "#C98A6B";
  for (let y = 120; y < 160; y += 10) {
    ctx.fillRect(0, y, 240, 1);
  }

  ctx.fillStyle = "#E07A9A";
  ctx.fillRect(70, 128, 100, 20);
  ctx.fillStyle = "#C96F95";
  ctx.fillRect(70, 128, 100, 2);
  ctx.fillRect(70, 146, 100, 2);
  fillHeart(ctx, 113, 132, 2, "#FFD6E5");

  ctx.fillStyle = "#8A5A3B";
  ctx.fillRect(76, 16, 88, 2);

  ctx.fillStyle = "#E07A9A";
  ctx.fillRect(80, 18, 8, 52);
  ctx.fillRect(152, 18, 8, 52);
  ctx.fillStyle = "#C96F95";
  ctx.fillRect(83, 18, 2, 52);
  ctx.fillRect(155, 18, 2, 52);

  ctx.fillStyle = "#FFF8FB";
  ctx.fillRect(88, 18, 64, 52);

  ctx.fillStyle = "#FFD9B8";
  ctx.fillRect(92, 22, 56, 8);
  ctx.fillStyle = "#F7B394";
  ctx.fillRect(92, 30, 56, 10);
  ctx.fillStyle = "#E79A9A";
  ctx.fillRect(92, 40, 56, 10);
  ctx.fillStyle = "#C9A7C9";
  ctx.fillRect(92, 50, 56, 6);

  ctx.fillStyle = "#FFE38A";
  ctx.fillRect(136, 27, 6, 6);
  ctx.fillStyle = "#FFE9DC";
  ctx.fillRect(100, 29, 8, 2);
  ctx.fillRect(103, 27, 4, 2);

  ctx.fillStyle = "#7FB77E";
  ctx.fillRect(92, 56, 56, 10);
  ctx.fillStyle = "#5E9E63";
  ctx.fillRect(92, 56, 56, 1);

  ctx.fillStyle = "#8A5A3B";
  ctx.fillRect(110, 44, 22, 2);
  ctx.fillRect(108, 48, 26, 3);
  ctx.fillRect(110, 51, 2, 10);
  ctx.fillRect(130, 51, 2, 10);

  ctx.fillStyle = "#FFF8FB";
  ctx.fillRect(119, 22, 2, 44);
  ctx.fillRect(92, 43, 56, 2);

  ctx.fillStyle = "#8A5A3B";
  ctx.fillRect(10, 76, 64, 4);
  ctx.fillRect(166, 76, 64, 4);
  ctx.fillStyle = "#B07A54";
  ctx.fillRect(10, 76, 64, 1);
  ctx.fillRect(166, 76, 64, 1);
  ctx.fillStyle = "#5E3A26";
  ctx.fillRect(10, 79, 64, 1);
  ctx.fillRect(166, 79, 64, 1);

  ctx.fillStyle = "#FFF8FB";
  ctx.fillRect(18, 60, 22, 14);
  ctx.fillStyle = "#E8A7BC";
  ctx.fillRect(18, 60, 22, 1);
  ctx.fillRect(18, 73, 22, 1);
  ctx.fillRect(18, 60, 1, 14);
  ctx.fillRect(39, 60, 1, 14);
  fillHeart(ctx, 25, 64, 1, "#F4A7C1");

  ctx.fillStyle = "#8A5A3B";
  ctx.fillRect(46, 58, 22, 16);
  ctx.fillStyle = "#FFF8FB";
  ctx.fillRect(48, 60, 18, 12);
  fillHeart(ctx, 53, 63, 1, "#F4A7C1");

  ctx.fillStyle = "#C97B5A";
  ctx.fillRect(176, 66, 14, 8);
  ctx.fillStyle = "#A85E42";
  ctx.fillRect(175, 64, 16, 3);

  ctx.fillStyle = "#4F8F5F";
  ctx.fillRect(182, 58, 2, 8);
  ctx.fillRect(180, 60, 2, 2);
  ctx.fillRect(184, 56, 2, 2);
  ctx.fillStyle = "#F4A7C1";
  ctx.fillRect(181, 47, 3, 3);
  ctx.fillRect(181, 53, 3, 3);
  ctx.fillRect(178, 50, 3, 3);
  ctx.fillRect(184, 50, 3, 3);
  ctx.fillStyle = "#FFD76E";
  ctx.fillRect(181, 50, 3, 3);

  ctx.fillStyle = "#D8F0F5";
  ctx.fillRect(204, 62, 16, 14);
  ctx.fillStyle = "#9FCBD6";
  ctx.fillRect(204, 62, 16, 1);
  ctx.fillRect(204, 75, 16, 1);
  ctx.fillRect(204, 62, 1, 14);
  ctx.fillRect(219, 62, 1, 14);
  ctx.fillStyle = "#C96F95";
  ctx.fillRect(205, 60, 14, 2);
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(207, 65, 2, 8);
}

export default function RoomCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    drawRoom(ctx);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={240}
      height={160}
      className="room-canvas"
      role="img"
      aria-label="A blush room with striped walls, a sunset window, shelves, a heart rug, and a wood floor"
    />
  );
}
