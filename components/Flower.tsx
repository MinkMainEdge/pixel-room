import type { CSSProperties } from "react";

type FlowerProps = {
  x: number;
  y: number;
  petal?: string;
  center?: string;
};

const block: CSSProperties = { position: "absolute" };

export default function Flower({
  x,
  y,
  petal = "var(--pink)",
  center = "var(--gold)",
}: FlowerProps) {
  return (
    <div
      aria-hidden="true"
      style={{ ...block, left: x, top: y, width: 11, height: 28, zIndex: 5 }}
    >
      <div
        style={{
          ...block,
          left: 4,
          top: 8,
          width: 3,
          height: 20,
          background: "var(--stem)",
        }}
      />
      <div
        style={{
          ...block,
          left: 7,
          top: 17,
          width: 4,
          height: 3,
          background: "var(--stem)",
        }}
      />
      <div
        style={{
          ...block,
          left: 1,
          top: 19,
          width: 3,
          height: 2,
          background: "var(--grass-dark)",
        }}
      />

      <div style={{ ...block, left: 3, top: 0, width: 3, height: 3, background: petal }} />
      <div style={{ ...block, left: 3, top: 6, width: 3, height: 3, background: petal }} />
      <div style={{ ...block, left: 0, top: 3, width: 3, height: 3, background: petal }} />
      <div style={{ ...block, left: 6, top: 3, width: 3, height: 3, background: petal }} />
      <div style={{ ...block, left: 3, top: 3, width: 3, height: 3, background: center }} />
    </div>
  );
}
