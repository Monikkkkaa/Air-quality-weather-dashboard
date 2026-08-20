import { periodMeta } from "@/lib/daypart";

interface SkyBackgroundProps {
  period: "day" | "night" | string;
}

export default function SkyBackground({ period }: SkyBackgroundProps) {
  const meta = periodMeta(period);

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden transition-colors duration-1000"
      style={{ backgroundColor: meta.base }}
      aria-hidden="true"
    >
      <div
        className="absolute -left-1/4 -top-1/4 h-[60vmax] w-[60vmax] rounded-full opacity-40 blur-3xl motion-safe:animate-[drift_26s_ease-in-out_infinite]"
        style={{ backgroundColor: meta.blobA }}
      />
      <div
        className="absolute -bottom-1/4 -right-1/4 h-[55vmax] w-[55vmax] rounded-full opacity-40 blur-3xl motion-safe:animate-[drift_32s_ease-in-out_infinite_reverse]"
        style={{ backgroundColor: meta.blobB }}
      />
      <div className="absolute inset-0 bg-grain [background-size:22px_22px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
    </div>
  );
}
