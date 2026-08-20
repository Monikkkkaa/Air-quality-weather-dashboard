import { AQI_BANDS, bandFor } from "@/lib/constants";

// Maps an AQI value (0–300+) onto a -90°..90° needle rotation.
function angleFor(aqi: number | null) {
  const clamped = Math.max(0, Math.min(aqi ?? 0, 300));
  return -90 + (clamped / 300) * 180;
}

interface AQIGaugeProps {
  aqi: number | null;
}

export default function AQIGauge({ aqi }: AQIGaugeProps) {
  const band = bandFor(aqi);
  const angle = angleFor(aqi);
  const cx = 100;
  const cy = 100;
  const r = 78;

  // Build one arc segment per AQI band, scaled to the 0–300 dial range.
  const segments = AQI_BANDS.map((b, i) => {
    const prevMax = i === 0 ? 0 : AQI_BANDS[i - 1].max;
    const start = angleFor(prevMax);
    const end = angleFor(Math.min(b.max, 300));
    return { ...b, start, end };
  });

  function polar(angleDeg: number, radius: number) {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
  }

  function arcPath(start: number, end: number, radius: number) {
    const s = polar(start, radius);
    const e = polar(end, radius);
    const largeArc = end - start > 180 ? 1 : 0;
    return `M ${s.x} ${s.y} A ${radius} ${radius} 0 ${largeArc} 1 ${e.x} ${e.y}`;
  }

  const needleTip = polar(angle, r - 14);

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 200 118" className="w-56">
        {segments.map((seg, i) => (
          <path
            key={i}
            d={arcPath(seg.start, seg.end, r)}
            stroke={seg.hue}
            strokeWidth="12"
            strokeLinecap="butt"
            fill="none"
            opacity={aqi != null && band.label === seg.label ? 1 : 0.35}
          />
        ))}
        {/* Needle */}
        <line
          x1={cx}
          y1={cy}
          x2={needleTip.x}
          y2={needleTip.y}
          stroke="#F7F9FC"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ transition: "all 700ms cubic-bezier(.2,.7,.3,1)" }}
        />
        <circle cx={cx} cy={cy} r="4" fill="#F7F9FC" />
      </svg>
      <div className="-mt-2 text-center">
        <div className="font-display text-4xl font-bold tabular-nums" style={{ color: band.hue }}>
          {aqi ?? "—"}
        </div>
        <div className="mt-1 font-mono text-[11px] uppercase tracking-widest text-mist">
          US AQI
        </div>
        <div className="mt-2 max-w-[15rem] text-sm font-medium" style={{ color: band.hue }}>
          {band.label}
        </div>
        <p className="mt-1 max-w-[15rem] text-xs text-mist">{band.note}</p>
      </div>
    </div>
  );
}
