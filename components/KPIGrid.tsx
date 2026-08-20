import KPITile from "./KPITile";
import { bandFor } from "@/lib/constants";
import { AirCurrent, WeatherCurrent } from "@/lib/types";

interface KPIGridProps {
  weatherCurrent: WeatherCurrent;
  airCurrent: AirCurrent;
}

export default function KPIGrid({ weatherCurrent, airCurrent }: KPIGridProps) {
  const aqiBand = bandFor(airCurrent.us_aqi);

  const tiles = [
    {
      label: "Feels Like",
      value: Math.round(weatherCurrent.apparent_temperature),
      unit: "°C",
      hint: `actual ${Math.round(weatherCurrent.temperature_2m)}°`,
    },
    {
      label: "Humidity",
      value: weatherCurrent.relative_humidity_2m,
      unit: "%",
      hint: "relative",
    },
    {
      label: "Wind",
      value: Math.round(weatherCurrent.wind_speed_10m),
      unit: "km/h",
      hint: `${Math.round(weatherCurrent.wind_direction_10m)}° heading`,
    },
    {
      label: "Pressure",
      value: Math.round(weatherCurrent.surface_pressure),
      unit: "hPa",
      hint: "surface level",
    },
    {
      label: "PM2.5",
      value: airCurrent.pm2_5?.toFixed(1) ?? "—",
      unit: "µg/m³",
      hint: aqiBand.label,
      accent: aqiBand.hue,
    },
    {
      label: "PM10",
      value: airCurrent.pm10?.toFixed(1) ?? "—",
      unit: "µg/m³",
      hint: "coarse particulates",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {tiles.map((t) => (
        <KPITile key={t.label} {...t} />
      ))}
    </div>
  );
}
