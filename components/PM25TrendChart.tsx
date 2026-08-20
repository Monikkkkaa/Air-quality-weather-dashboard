"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import ChartTooltip from "./ChartTooltip";
import { hourlyWindow } from "@/lib/timeseries";
import { bandFor } from "@/lib/constants";
import { AirHourly } from "@/lib/types";

// WHO-style rough guideline for context on the chart (24h PM2.5 guideline ~15 µg/m³).
const GUIDELINE_PM25 = 15;

interface PM25TrendChartProps {
  hourly: AirHourly;
  nowIso: string;
  currentAqi: number | null;
}

export default function PM25TrendChart({ hourly, nowIso, currentAqi }: PM25TrendChartProps) {
  const data = hourlyWindow(hourly, "pm2_5", { hours: 72, nowIso });
  const band = bandFor(currentAqi);

  if (!data.length) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
        <h2 className="font-mono text-[11px] uppercase tracking-widest text-mist">
          PM2.5 · Next 72h
        </h2>
        <div className="mt-8 flex h-52 items-center justify-center font-mono text-xs text-mist">
          No hourly air quality data available.
        </div>
      </div>
    );
  }

  return (
    <div className="min-w-0 flex-1 rounded-3xl border border-white/10 bg-white/[0.05] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
      <div className="flex items-baseline justify-between">
        <h2 className="font-mono text-[11px] uppercase tracking-widest text-mist">
          PM2.5 · Next 72h
        </h2>
        <span className="font-mono text-[11px] text-mist">µg/m³, hourly</span>
      </div>
      <div className="mt-4 h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
            <defs>
              <linearGradient id="pmFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={band.hue} stopOpacity={0.5} />
                <stop offset="100%" stopColor={band.hue} stopOpacity={0} />
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
            />
            <ReferenceLine
              y={GUIDELINE_PM25}
              stroke="#A9BBDD"
              strokeDasharray="4 4"
              label={{
                value: "WHO 24h guideline",
                position: "insideTopRight",
                fill: "#A9BBDD",
                fontSize: 10,
              }}
            />
            <Tooltip content={<ChartTooltip unit="µg/m³" />} cursor={{ stroke: band.hue, strokeWidth: 1 }} />
            <Area
              type="monotone"
              dataKey="value"
              stroke={band.hue}
              strokeWidth={2}
              fill="url(#pmFill)"
              dot={false}
              activeDot={{ r: 4, fill: band.hue, stroke: "#0F1826", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
