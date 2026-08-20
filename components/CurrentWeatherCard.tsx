import WeatherIcon from "./WeatherIcon";
import { weatherFor } from "@/lib/constants";
import { periodMeta } from "@/lib/daypart";
import { GeocodeResult, WeatherCurrent } from "@/lib/types";

interface StatProps {
  label: string;
  value: string | number;
}

function Stat({ label, value }: StatProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono text-[10px] uppercase tracking-widest text-mist">{label}</span>
      <span className="font-mono text-sm text-cloud-100">{value}</span>
    </div>
  );
}

interface CurrentWeatherCardProps {
  place: GeocodeResult;
  current: WeatherCurrent;
  period: "day" | "night" | string;
}

export default function CurrentWeatherCard({ place, current, period }: CurrentWeatherCardProps) {
  const cond = weatherFor(current.weather_code);
  const meta = periodMeta(period);
  const localTime = new Date(current.time).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex-1 rounded-3xl border border-white/10 bg-white/[0.05] p-8 shadow-2xl shadow-black/30 backdrop-blur-xl">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundImage: meta.heroGradient }}
            />
            <span className="font-mono text-[10px] uppercase tracking-widest text-mist">
              {meta.label} · local time {localTime}
            </span>
          </div>
          <h1 className="mt-1 font-display text-2xl font-medium leading-tight text-cloud-50">
            {place.name}
            {place.admin1 ? `, ${place.admin1}` : ""}
          </h1>
          <p className="font-mono text-xs text-mist">
            {place.country} · {place.latitude.toFixed(2)}°, {place.longitude.toFixed(2)}°
          </p>
        </div>
        <WeatherIcon icon={cond.icon} className="h-12 w-12 text-cloud-100" />
      </div>

      <div className="mt-6 flex items-end gap-4">
        <span
          className="bg-clip-text font-display text-7xl font-bold tabular-nums text-transparent"
          style={{ backgroundImage: meta.heroGradient }}
        >
          {Math.round(current.temperature_2m)}°
        </span>
        <div className="mb-2">
          <p className="text-sm text-cloud-100">{cond.text}</p>
          <p className="font-mono text-xs text-mist">
            feels like {Math.round(current.apparent_temperature)}°
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-white/10 pt-6 sm:grid-cols-4">
        <Stat label="Humidity" value={`${current.relative_humidity_2m}%`} />
        <Stat label="Wind" value={`${Math.round(current.wind_speed_10m)} km/h`} />
        <Stat label="Pressure" value={`${Math.round(current.surface_pressure)} hPa`} />
        <Stat label="Precip." value={`${current.precipitation} mm`} />
      </div>
    </div>
  );
}
