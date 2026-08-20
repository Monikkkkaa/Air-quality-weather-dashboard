import WeatherIcon from "./WeatherIcon";
import { weatherFor } from "@/lib/constants";
import { WeatherDaily } from "@/lib/types";

interface ForecastStripProps {
  daily: WeatherDaily;
}

export default function ForecastStrip({ daily }: ForecastStripProps) {
  const days = daily.time
    .map((iso, i) => ({
      iso,
      max: daily.temperature_2m_max[i],
      min: daily.temperature_2m_min[i],
      code: daily.weather_code[i],
    }))
    .filter(
      (d): d is { iso: string; max: number; min: number; code: number } =>
        d.max !== null && d.min !== null && d.code !== null
    );

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
      <h2 className="font-mono text-[11px] uppercase tracking-widest text-mist">6-Day Outlook</h2>
      <div className="mt-4 grid grid-cols-3 gap-4 sm:grid-cols-6">
        {days.map((d, i) => {
          const cond = weatherFor(d.code);
          const label = new Date(d.iso).toLocaleDateString("en-US", { weekday: "short" });
          return (
            <div
              key={d.iso}
              className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] py-4 transition hover:border-white/20 hover:bg-white/[0.06]"
            >
              <span className="font-mono text-[11px] text-mist">{i === 0 ? "Today" : label}</span>
              <WeatherIcon icon={cond.icon} className="h-7 w-7 text-cloud-100" />
              <div className="flex items-baseline gap-1 font-display text-sm font-medium text-cloud-50">
                <span>{Math.round(d.max)}°</span>
                <span className="text-mist">{Math.round(d.min)}°</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
