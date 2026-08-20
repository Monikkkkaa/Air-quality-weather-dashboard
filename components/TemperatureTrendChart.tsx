"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import ChartTooltip from "./ChartTooltip";
import { hourlyWindow } from "@/lib/timeseries";
import { WeatherHourly } from "@/lib/types";

interface TemperatureTrendChartProps {
  hourly: WeatherHourly;
  nowIso: string;
}

export default function TemperatureTrendChart({ hourly, nowIso }: TemperatureTrendChartProps) {
  const data = hourlyWindow(hourly, "temperature_2m", { hours: 72, nowIso });

  if (!data.length) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
        <h2 className="font-mono text-[11px] uppercase tracking-widest text-mist">
          Temperature · Next 72h
        </h2>
        <div className="mt-8 flex h-52 items-center justify-center font-mono text-xs text-mist">
          No hourly temperature data available.
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
      <div className="flex items-baseline justify-between">
        <h2 className="font-mono text-[11px] uppercase tracking-widest text-mist">
          Temperature · Next 72h
        </h2>
        <span className="font-mono text-[11px] text-mist">°C, hourly</span>
      </div>
      <div className="mt-4 h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
            <defs>
              <linearGradient id="tempFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8FA3C4" stopOpacity={0.45} />
                <stop offset="100%" stopColor="#8FA3C4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 6" stroke="rgba(255,255,255,0.08)" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fill: "#A9BBDD", fontSize: 10, fontFamily: "var(--font-mono)" }}
              tickLine={false}
              axisLine={{ stroke: "rgba(255,255,255,0.12)" }}
              interval={Math.max(Math.floor(data.length / 6), 5)}
            />
            <YAxis
              tick={{ fill: "#A9BBDD", fontSize: 10, fontFamily: "var(--font-mono)" }}
              tickLine={false}
              axisLine={false}
              width={34}
              unit="°"
            />
            <Tooltip content={<ChartTooltip unit="°C" />} cursor={{ stroke: "#8FA3C4", strokeWidth: 1 }} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#F7F9FC"
              strokeWidth={2}
              fill="url(#tempFill)"
              dot={false}
              activeDot={{ r: 4, fill: "#F7F9FC", stroke: "#0F1826", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
