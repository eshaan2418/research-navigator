import { useMemo } from "react";
import type { Theme, ThemeId } from "@/data/move";

type Props = {
  themes: Theme[];
  selected: Set<ThemeId>;
  onToggle: (id: ThemeId, additive: boolean) => void;
  onReset: () => void;
  hubLabel: string;
};

export function Wheel({ themes, selected, onToggle, onReset, hubLabel }: Props) {
  const size = 560;
  const cx = size / 2;
  const cy = size / 2;
  const ringOuter = 270;
  const ringInner = 240;
  const sliceR = 240;
  const hubR = 78;
  const n = themes.length;
  const sliceAngle = (2 * Math.PI) / n;

  const slices = useMemo(() => {
    return themes.map((t, i) => {
      // Start at top (-90°) and go clockwise
      const start = -Math.PI / 2 + i * sliceAngle;
      const end = start + sliceAngle;
      const x1 = cx + sliceR * Math.cos(start);
      const y1 = cy + sliceR * Math.sin(start);
      const x2 = cx + sliceR * Math.cos(end);
      const y2 = cy + sliceR * Math.sin(end);
      const largeArc = sliceAngle > Math.PI ? 1 : 0;
      const path = `M ${cx} ${cy} L ${x1} ${y1} A ${sliceR} ${sliceR} 0 ${largeArc} 1 ${x2} ${y2} Z`;

      // Label position
      const mid = start + sliceAngle / 2;
      const labelR = sliceR * 0.62;
      const lx = cx + labelR * Math.cos(mid);
      const ly = cy + labelR * Math.sin(mid);

      return { theme: t, path, lx, ly };
    });
  }, [themes, sliceAngle, cx, cy]);

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="w-full max-w-[560px] h-auto select-none"
      role="img"
      aria-label="MOVE research themes wheel"
    >
      {/* Red outer ring */}
      <circle cx={cx} cy={cy} r={ringOuter} fill="var(--brand-red)" />
      <circle cx={cx} cy={cy} r={ringInner} fill="var(--brand-cream)" />

      {/* Slices */}
      {slices.map(({ theme, path, lx, ly }) => {
        const isSelected = selected.has(theme.id);
        const anySelected = selected.size > 0;
        const dim = anySelected && !isSelected;
        return (
          <g
            key={theme.id}
            onClick={(e) => onToggle(theme.id, e.shiftKey || e.metaKey || e.ctrlKey)}
            className="cursor-pointer transition-opacity"
            style={{ opacity: dim ? 0.45 : 1 }}
          >
            <path
              d={path}
              fill={`var(${theme.colorVar})`}
              stroke="var(--brand-black)"
              strokeWidth={1}
              className="transition-all hover:brightness-95"
            />
            {isSelected && (
              <path
                d={path}
                fill="none"
                stroke="var(--brand-black)"
                strokeWidth={3}
              />
            )}
            <SliceLabel x={lx} y={ly} text={theme.short} />
          </g>
        );
      })}

      {/* Center hub */}
      <g
        onClick={onReset}
        className="cursor-pointer"
        role="button"
        aria-label="Reset filters"
      >
        <circle
          cx={cx}
          cy={cy}
          r={hubR}
          fill="var(--brand-black)"
          stroke="var(--brand-cream)"
          strokeWidth={4}
        />
        <text
          x={cx}
          y={cy + 8}
          textAnchor="middle"
          fill="var(--brand-cream)"
          fontSize={28}
          fontWeight={700}
          letterSpacing={2}
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {hubLabel}
        </text>
      </g>
    </svg>
  );
}

function SliceLabel({ x, y, text }: { x: number; y: number; text: string }) {
  // Wrap into max 2 lines on space
  const words = text.split(" ");
  let lines: string[] = [text];
  if (words.length > 1) {
    const mid = Math.ceil(words.length / 2);
    lines = [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
  }
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fill="var(--brand-black)"
      fontSize={15}
      fontWeight={700}
      style={{ fontFamily: "var(--font-sans)", pointerEvents: "none" }}
    >
      {lines.map((ln, i) => (
        <tspan key={i} x={x} dy={i === 0 ? -((lines.length - 1) * 9) : 18}>
          {ln}
        </tspan>
      ))}
    </text>
  );
}
