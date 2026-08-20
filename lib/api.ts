import { z } from "zod";
import { GeocodeResult, WeatherResponse, AirQualityResponse } from "./types";

const GEOCODE_URL = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";
const AIR_QUALITY_URL = "https://air-quality-api.open-meteo.com/v1/air-quality";

// Zod Schemas
const GeocodeSchema = z.object({
  results: z.array(z.object({
    name: z.string(),
    admin1: z.string().optional(),
    country: z.string().optional(),
    latitude: z.number(),
    longitude: z.number(),
    timezone: z.string(),
  })).optional()
});

const WeatherSchema = z.object({
  current: z.object({
    time: z.string(),
    temperature_2m: z.number(),
    relative_humidity_2m: z.number(),
    apparent_temperature: z.number(),
    precipitation: z.number(),
    weather_code: z.number(),
    wind_speed_10m: z.number(),
    wind_direction_10m: z.number(),
    surface_pressure: z.number(),
  }),
  daily: z.object({
    time: z.array(z.string()),
    weather_code: z.array(z.number().nullable()),
    temperature_2m_max: z.array(z.number().nullable()),
    temperature_2m_min: z.array(z.number().nullable()),
  }),
  hourly: z.object({
    time: z.array(z.string()),
    temperature_2m: z.array(z.number().nullable()),
  })
});

const AirQualitySchema = z.object({
  current: z.object({
    time: z.string(),
    us_aqi: z.number(),
    pm2_5: z.number(),
    pm10: z.number(),
    ozone: z.number(),
    nitrogen_dioxide: z.number(),
    sulphur_dioxide: z.number(),
    carbon_monoxide: z.number(),
  }),
  hourly: z.object({
    time: z.array(z.string()),
    pm2_5: z.array(z.number().nullable()),
    pm10: z.array(z.number().nullable()),
    us_aqi: z.array(z.number().nullable()),
  })
});

// Resolve a free-text place name into lat/lon + display info.
export async function geocode(city: string): Promise<GeocodeResult[]> {
  const url = `${GEOCODE_URL}?name=${encodeURIComponent(city)}&count=5&language=en&format=json`;
  const res = await fetch(url, { next: { revalidate: 1800 } });
  if (!res.ok) throw new Error("Geocoding lookup failed");
  const data = await res.json();
  const parsed = GeocodeSchema.parse(data);
  return (parsed.results as GeocodeResult[]) || [];
}

// Pull current + short forecast weather for a coordinate pair.
export async function fetchWeather(lat: number, lon: number, timezone = "auto"): Promise<WeatherResponse> {
  const params = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lon.toString(),
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "precipitation",
      "weather_code",
      "wind_speed_10m",
      "wind_direction_10m",
      "surface_pressure",
    ].join(","),
    daily: ["weather_code", "temperature_2m_max", "temperature_2m_min"].join(","),
    hourly: ["temperature_2m"].join(","),
    timezone,
    forecast_days: "6",
  });
  const res = await fetch(`${WEATHER_URL}?${params.toString()}`, { next: { revalidate: 1800 } });
  if (!res.ok) throw new Error("Weather lookup failed");
  return WeatherSchema.parse(await res.json()) as WeatherResponse;
}

// Pull current air quality + pollutant breakdown for a coordinate pair.
export async function fetchAirQuality(lat: number, lon: number, timezone = "auto"): Promise<AirQualityResponse> {
  const params = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lon.toString(),
    current: [
      "us_aqi",
      "pm2_5",
      "pm10",
      "ozone",
      "nitrogen_dioxide",
      "sulphur_dioxide",
      "carbon_monoxide",
    ].join(","),
    hourly: ["pm2_5", "pm10", "us_aqi"].join(","),
    timezone,
    forecast_days: "6",
  });
  const res = await fetch(`${AIR_QUALITY_URL}?${params.toString()}`, { next: { revalidate: 1800 } });
  if (!res.ok) throw new Error("Air quality lookup failed");
  return AirQualitySchema.parse(await res.json()) as AirQualityResponse;
}
