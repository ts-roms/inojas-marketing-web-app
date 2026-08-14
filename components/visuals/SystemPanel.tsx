import { cn } from "@/lib/cn";

/**
 * Abstract control-panel illustration used in the home hero.
 *
 * Authored inline rather than sourced as a photograph: it is a few kilobytes,
 * renders on the server, scales to any width without a second art file, and
 * inherits the brand tokens. Purely decorative — hidden from assistive tech.
 */
export function SystemPanel({ className }: { className?: string }) {
  const bars = [
    { x: 44, height: 26 },
    { x: 74, height: 44 },
    { x: 104, height: 34 },
    { x: 134, height: 58 },
    { x: 164, height: 40 },
  ];

  return (
    <svg
      viewBox="0 0 520 430"
      className={cn("h-auto w-full", className)}
      aria-hidden="true"
      focusable="false"
    >
      {/* Frame */}
      <rect
        x="1"
        y="1"
        width="518"
        height="428"
        rx="20"
        className="fill-white/[0.03] stroke-white/15"
        strokeWidth="1.5"
      />

      {/* Hairline grid */}
      <g className="stroke-white/[0.06]" strokeWidth="1">
        {[70, 140, 210, 280, 350, 420].map((y) => (
          <line key={`h-${y}`} x1="1" y1={y} x2="519" y2={y} />
        ))}
        {[90, 180, 270, 360, 450].map((x) => (
          <line key={`v-${x}`} x1={x} y1="1" x2={x} y2="429" />
        ))}
      </g>

      {/* Title bar */}
      <g>
        <rect x="24" y="24" width="180" height="10" rx="5" className="fill-white/20" />
        <rect x="24" y="44" width="110" height="8" rx="4" className="fill-white/10" />
        <circle cx="472" cy="32" r="5" className="fill-accent-400" />
        <circle cx="452" cy="32" r="5" className="fill-white/20" />
        <circle cx="432" cy="32" r="5" className="fill-white/20" />
      </g>

      {/* Throughput chart */}
      <g transform="translate(24 82)">
        <rect
          width="260"
          height="150"
          rx="14"
          className="fill-white/[0.04] stroke-white/10"
          strokeWidth="1"
        />
        <rect x="20" y="20" width="72" height="7" rx="3.5" className="fill-white/25" />
        {bars.map((bar) => (
          <rect
            key={bar.x}
            x={bar.x}
            y={116 - bar.height}
            width="14"
            height={bar.height}
            rx="4"
            className="fill-white/15"
          />
        ))}
        <rect x="194" y="58" width="14" height="58" rx="4" className="fill-accent-500" />
        <line x1="20" y1="124" x2="240" y2="124" className="stroke-white/15" strokeWidth="1" />
      </g>

      {/* Gauge */}
      <g transform="translate(300 82)">
        <rect
          width="196"
          height="150"
          rx="14"
          className="fill-white/[0.04] stroke-white/10"
          strokeWidth="1"
        />
        <path
          d="M46 108a52 52 0 1 1 104 0"
          fill="none"
          className="stroke-white/15"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d="M46 108a52 52 0 0 1 78-45"
          fill="none"
          className="stroke-accent-400"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <rect x="72" y="92" width="52" height="12" rx="6" className="fill-white/30" />
        <rect x="66" y="120" width="64" height="7" rx="3.5" className="fill-white/12" />
      </g>

      {/* Signal trace */}
      <g transform="translate(24 250)">
        <rect
          width="472"
          height="156"
          rx="14"
          className="fill-white/[0.04] stroke-white/10"
          strokeWidth="1"
        />
        <rect x="20" y="20" width="96" height="7" rx="3.5" className="fill-white/25" />
        <polyline
          points="20,110 60,96 96,104 132,72 168,84 204,52 240,66 276,44 312,58 348,36 384,50 420,30 452,40"
          fill="none"
          className="stroke-accent-400"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polyline
          points="20,124 60,120 96,126 132,112 168,120 204,104 240,112 276,100 312,108 348,96 384,104 420,94 452,100"
          fill="none"
          className="stroke-white/20"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="420" cy="30" r="5" className="fill-accent-300" />
      </g>
    </svg>
  );
}
