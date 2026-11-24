"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export const PIXEL_WIDTH = 240;
export const PIXEL_HEIGHT = 160;

type PixelCanvasProps = {
  children: ReactNode;
  label: string;
  className?: string;
};

export default function PixelCanvas({
  children,
  label,
  className = "",
}: PixelCanvasProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const updateScale = () => {
      setScale(frame.clientWidth / PIXEL_WIDTH);
    };

    updateScale();

    const observer = new ResizeObserver(updateScale);
    observer.observe(frame);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={frameRef}
      className={`pixel-canvas ${className}`.trim()}
      style={{ aspectRatio: `${PIXEL_WIDTH} / ${PIXEL_HEIGHT}` }}
      role="img"
      aria-label={label}
    >
      <div
        className="pixel-stage"
        style={{
          width: PIXEL_WIDTH,
          height: PIXEL_HEIGHT,
          transform: `scale(${scale})`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
