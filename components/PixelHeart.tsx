const HEART_ROWS = [
  "0110110",
  "1111111",
  "1111111",
  "0111110",
  "0011100",
  "0001000",
];

type PixelHeartProps = {
  size?: number;
  color?: string;
  className?: string;
};

export default function PixelHeart({
  size = 10,
  color = "var(--red)",
  className,
}: PixelHeartProps) {
  return (
    <svg
      width={size}
      height={(size * 6) / 7}
      viewBox="0 0 7 6"
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {HEART_ROWS.map((row, y) =>
        row.split("").map((cell, x) =>
          cell === "1" ? (
            <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={color} />
          ) : null,
        ),
      )}
    </svg>
  );
}
