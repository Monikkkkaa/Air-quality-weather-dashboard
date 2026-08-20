# Skyline — Weather & Air Quality Dashboard

Built for the **Prefero Talent** "Air-quality & weather dashboard" challenge:
pick a city, see current conditions, a 72-hour trend, and live PM2.5 alongside
weather — with proper loading, empty, and error states.

**Live data, no API key needed** — powered by [Open-Meteo](https://open-meteo.com/),
a free weather + air quality + geocoding API.

## Run it locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). It loads with Indore by
default — search any other city from the bar at the top.

## What's on the dashboard

- **Hero** — city, current temperature, condition, feels-like.
- **AQI gauge** — a live instrument dial; needle angle and color are computed
  directly from the current US AQI value.
- **KPI tiles** — feels-like, humidity, wind, pressure, PM2.5, PM10 at a glance.
- **72-hour trend charts** — temperature and PM2.5 as smooth area charts, with
  a WHO 24h PM2.5 guideline line for context and a styled tooltip.
- **6-day forecast strip** — quick outlook beyond the 72h window.
- **Loading state** — a skeleton that mirrors the real layout shape.
- **Error state** — a clear message plus a "Try again" retry button.
- **Empty state** — shown if a search completes with nothing to display.

## Project structure

```
app/
  layout.js               root layout, self-hosted fonts, metadata
  globals.css             base styles, atmosphere background, focus states
  page.js                 client page: search state, fetch, state routing
  api/
    weather/route.js      server route: geocode → weather + air quality (parallel)
components/
  SearchBar.jsx            city search input
  CurrentWeatherCard.jsx   hero: temperature, condition, quick stats
  AQIGauge.jsx             semi-circle instrument dial, driven by live AQI
  KPIGrid.jsx / KPITile.jsx  the KPI tile row
  TemperatureTrendChart.jsx  72h temperature area chart (recharts)
  PM25TrendChart.jsx         72h PM2.5 area chart with guideline reference line
  ChartTooltip.jsx         shared styled tooltip for both charts
  ForecastStrip.jsx        6-day forecast row
  SkyBackground.jsx        animated living-sky background (dawn/day/dusk/night)
  DashboardSkeleton.jsx / Skeleton.jsx   loading state
  EmptyState.jsx / ErrorState.jsx        empty & error states
  WeatherIcon.jsx          small hand-drawn SVG icon set
lib/
  api.js                   fetch helpers for Open-Meteo (geocoding, weather, air quality)
  constants.js             AQI bands + colors, WMO weather-code map, pollutant list
  timeseries.js            slices raw hourly arrays into a clean "now → +72h" window
  daypart.js               local-time → sky period + accent gradient/blob colors
```

## How the data flows

1. User types a city → `GET /api/weather?city=<name>`.
2. The route geocodes the city name to lat/lon (Open-Meteo Geocoding API).
3. It fetches **weather** (current + daily + hourly temperature) and
   **air quality** (current + hourly PM2.5/PM10/AQI) **in parallel**
   (`Promise.all`) and returns one combined JSON payload.
4. The client renders it into the hero card, AQI gauge, KPI tiles, both trend
   charts, and the forecast strip — no client-side API keys or secrets.

## Design notes

The theme is a "living sky" over an instrument panel: the background is a
soft, slowly-drifting gradient computed from the **searched city's own local
time of day** (dawn / day / dusk / night) — real data, not decoration — while
every panel sits on frosted glass cards (blurred, translucent, thin borders)
so the color underneath still breathes through. The hero temperature is
rendered in that same time-of-day gradient as a clipped text fill, tying the
biggest number on the page directly to *when* it currently is there.

Typography pairs Space Grotesk (display, for big numbers and headings) with
Inter (body) and IBM Plex Mono (data readouts — timestamps, coordinates,
chart axes, chip labels) so the numeric parts of the UI read like a station
log rather than a generic weather app.

The AQI gauge and PM2.5 chart fill are deliberately kept on the *separate*,
strictly data-driven health-band palette (green → maroon) rather than the
time-of-day gradient — air quality color should never be confused with
"what time it looks like," so that signal stays consistent and legible no
matter which sky is behind it.

## Tech

- Next.js 14 (App Router) + React 18
- Tailwind CSS for styling
- Recharts for the trend charts
- Open-Meteo (free, keyless) for weather, air quality, and geocoding
