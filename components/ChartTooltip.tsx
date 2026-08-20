"use client";

interface ChartTooltipProps {
  active?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any[];
  unit: string;
}

export default function ChartTooltip({ active, payload, unit }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;
  const point = payload[0];

  return (
    <div className="rounded-xl border border-white/15 bg-[#0B1120]/90 px-3 py-2 shadow-xl backdrop-blur-xl">
      <div className="font-mono text-[10px] uppercase tracking-widest text-mist">
        {point.payload.label}
      </div>
      <div className="mt-1 font-display text-sm font-bold text-cloud-50">
        {typeof point.value === "number" ? point.value.toFixed(1) : point.value}
        <span className="ml-1 font-mono text-[11px] font-normal text-mist">{unit}</span>
      </div>
    </div>
  );
}
