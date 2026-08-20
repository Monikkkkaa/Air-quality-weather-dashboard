"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import SearchBar from "@/components/SearchBar";
import CurrentWeatherCard from "@/components/CurrentWeatherCard";
import AQIGauge from "@/components/AQIGauge";
import KPIGrid from "@/components/KPIGrid";
import TemperatureTrendChart from "@/components/TemperatureTrendChart";
import PM25TrendChart from "@/components/PM25TrendChart";
import ForecastStrip from "@/components/ForecastStrip";
import DashboardSkeleton from "@/components/DashboardSkeleton";
import EmptyState from "@/components/EmptyState";
import ErrorState from "@/components/ErrorState";
import SkyBackground from "@/components/SkyBackground";
import { periodFor } from "@/lib/daypart";
import { DashboardData } from "@/lib/types";

const DEFAULT_CITY = "Indore";

export default function Home() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempted, setAttempted] = useState(false);
  const lastCity = useRef(DEFAULT_CITY);

  const runSearch = useCallback(async (city: string) => {
    lastCity.current = city;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Lookup failed");
      setData(json);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setData(null);
    } finally {
      setLoading(false);
      setAttempted(true);
    }
  }, []);

  useEffect(() => {
    runSearch(DEFAULT_CITY);
  }, [runSearch]);

  const fetchedAt = data
    ? new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
    : null;
  const period = data ? periodFor(data.weather.current.time) : "night";

  return (
    <main className="relative mx-auto min-h-screen max-w-6xl px-6 py-14 sm:px-10">
      <SkyBackground period={period} />
      <header className="mb-10 flex flex-col gap-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-mist">
            Skyline · Live Instrument Panel
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold text-cloud-50 sm:text-4xl">
            Weather & air, read like a station log.
          </h1>
          <p className="mt-2 max-w-xl text-sm text-mist">
            Pick a city for current conditions, a 72-hour trend, and live PM2.5 —
            all from public, keyless data.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <SearchBar onSearch={runSearch} loading={loading} />
          {fetchedAt && !loading && (
            <span className="font-mono text-[11px] text-mist">
              updated {fetchedAt}
            </span>
          )}
        </div>
      </header>

      {loading && <DashboardSkeleton />}

      {!loading && error && (
        <ErrorState message={error} onRetry={() => runSearch(lastCity.current)} />
      )}

      {!loading && !error && !data && attempted && <EmptyState />}

      {!loading && !error && data && (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-6 lg:flex-row">
            <CurrentWeatherCard place={data.place} current={data.weather.current} period={period} />
            <div className="flex items-center justify-center rounded-3xl border border-white/10 bg-white/[0.05] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl lg:w-80">
              <AQIGauge aqi={data.air.current?.us_aqi ?? null} />
            </div>
          </div>

          <KPIGrid weatherCurrent={data.weather.current} airCurrent={data.air.current} />

          <div className="grid gap-6 lg:grid-cols-2">
            <TemperatureTrendChart
              hourly={data.weather.hourly}
              nowIso={data.weather.current.time}
            />
            <PM25TrendChart
              hourly={data.air.hourly}
              nowIso={data.air.current.time}
              currentAqi={data.air.current?.us_aqi}
            />
          </div>

          <ForecastStrip daily={data.weather.daily} />

          <footer className="mt-4 text-center font-mono text-[11px] text-mist">
            Live data via Open-Meteo — weather & air quality, no key required.
          </footer>
        </div>
      )}
    </main>
  );
}
