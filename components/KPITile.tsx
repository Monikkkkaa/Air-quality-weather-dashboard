interface KPITileProps {
  label: string;
  value: string | number;
  unit?: string;
  hint?: string;
  accent?: string;
}

export default function KPITile({ label, value, unit, hint, accent }: KPITileProps) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4 shadow-lg shadow-black/20 backdrop-blur-xl transition hover:border-white/20 hover:bg-white/[0.08]">
      <div className="font-mono text-[10px] uppercase tracking-widest text-mist">{label}</div>
      <div
        className="mt-2 font-display text-2xl font-bold tabular-nums"
        style={{ color: accent || "#F7F9FC" }}
      >
        {value}
        {unit && <span className="ml-1 font-mono text-xs font-normal text-mist">{unit}</span>}
      </div>
      {hint && <div className="mt-1 font-mono text-[11px] text-mist">{hint}</div>}
    </div>
  );
}
