import type { CSSProperties } from "react";
import PixelHeart from "./PixelHeart";

const box: CSSProperties = { position: "absolute" };

export default function Mailbox() {
  return (
    <div
      aria-hidden="true"
      style={{ ...box, left: 144, top: 60, width: 60, height: 66, zIndex: 4 }}
    >
      <div
        style={{
          ...box,
          left: 10,
          top: 58,
          width: 40,
          height: 4,
          background: "rgba(26, 18, 40, 0.35)",
        }}
      />
      <div
        style={{
          ...box,
          left: 16,
          top: 55,
          width: 28,
          height: 3,
          background: "rgba(26, 18, 40, 0.3)",
        }}
      />

      <div
        style={{
          ...box,
          left: 26,
          top: 34,
          width: 7,
          height: 24,
          background: "var(--wood)",
        }}
      />
      <div
        style={{
          ...box,
          left: 31,
          top: 34,
          width: 2,
          height: 24,
          background: "#5e3a26",
        }}
      />
      <div
        style={{
          ...box,
          left: 21,
          top: 56,
          width: 17,
          height: 5,
          background: "#5e3a26",
        }}
      />

      <div
        style={{
          ...box,
          left: 3,
          top: 16,
          width: 48,
          height: 22,
          background: "var(--pink)",
          border: "2px solid var(--ink)",
        }}
      />
      <div
        style={{
          ...box,
          left: 3,
          top: 9,
          width: 48,
          height: 9,
          background: "var(--pink-light)",
          border: "2px solid var(--ink)",
          borderBottom: "none",
        }}
      />

      <div
        style={{
          ...box,
          left: 9,
          top: 21,
          width: 28,
          height: 13,
          background: "var(--pink-light)",
          border: "2px solid var(--ink)",
        }}
      />
      <div
        style={{
          ...box,
          left: 14,
          top: 24,
          width: 18,
          height: 2,
          background: "var(--ink)",
        }}
      />
      <div style={{ ...box, left: 21, top: 27, display: "flex" }}>
        <PixelHeart size={7} color="var(--red)" />
      </div>

      <div
        style={{
          ...box,
          left: 48,
          top: 3,
          width: 2,
          height: 13,
          background: "var(--ink)",
        }}
      />
      <div
        style={{
          ...box,
          left: 50,
          top: 3,
          width: 10,
          height: 8,
          background: "var(--red)",
          border: "1px solid var(--ink)",
        }}
      />
    </div>
  );
}
