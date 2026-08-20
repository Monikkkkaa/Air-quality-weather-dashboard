// US AQI breakpoints — used to color and label the live gauge.
export const AQI_BANDS = [
  { max: 50, label: "Good", hue: "#5FD38D", note: "Air quality is satisfactory." },
  { max: 100, label: "Moderate", hue: "#E8D14C", note: "Acceptable for most people." },
  { max: 150, label: "Unhealthy for Sensitive Groups", hue: "#F0A94E", note: "Sensitive groups should reduce exertion." },
  { max: 200, label: "Unhealthy", hue: "#E9694C", note: "Everyone may begin to feel effects." },
  { max: 300, label: "Very Unhealthy", hue: "#B564C9", note: "Health alert — avoid outdoor exertion." },
  { max: 500, label: "Hazardous", hue: "#8B3A4A", note: "Serious risk to the whole population." },
];

export function bandFor(aqi: number | null) {
  if (aqi == null) return AQI_BANDS[0];
  return AQI_BANDS.find((b) => aqi <= b.max) || AQI_BANDS[AQI_BANDS.length - 1];
}

// WMO weather codes → short description + a simple icon key.
export const WEATHER_CODES = {
  0: { text: "Clear sky", icon: "sun" },
  1: { text: "Mainly clear", icon: "sun" },
  2: { text: "Partly cloudy", icon: "cloud-sun" },
  3: { text: "Overcast", icon: "cloud" },
  45: { text: "Fog", icon: "fog" },
  48: { text: "Depositing rime fog", icon: "fog" },
  51: { text: "Light drizzle", icon: "drizzle" },
  53: { text: "Drizzle", icon: "drizzle" },
  55: { text: "Dense drizzle", icon: "drizzle" },
  61: { text: "Slight rain", icon: "rain" },
  63: { text: "Rain", icon: "rain" },
  65: { text: "Heavy rain", icon: "rain" },
  71: { text: "Slight snow", icon: "snow" },
  73: { text: "Snow", icon: "snow" },
  75: { text: "Heavy snow", icon: "snow" },
  80: { text: "Rain showers", icon: "rain" },
  81: { text: "Rain showers", icon: "rain" },
  82: { text: "Violent rain showers", icon: "rain" },
  95: { text: "Thunderstorm", icon: "storm" },
  96: { text: "Thunderstorm w/ hail", icon: "storm" },
  99: { text: "Thunderstorm w/ hail", icon: "storm" },
};

export function weatherFor(code: number) {
  return WEATHER_CODES[code as keyof typeof WEATHER_CODES] || { text: "Unknown", icon: "cloud" };
}

export const POLLUTANTS = [
  { key: "pm2_5", label: "PM2.5", unit: "µg/m³" },
  { key: "pm10", label: "PM10", unit: "µg/m³" },
  { key: "ozone", label: "Ozone", unit: "µg/m³" },
  { key: "nitrogen_dioxide", label: "NO₂", unit: "µg/m³" },
  { key: "sulphur_dioxide", label: "SO₂", unit: "µg/m³" },
  { key: "carbon_monoxide", label: "CO", unit: "µg/m³" },
];
