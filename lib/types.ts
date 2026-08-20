export interface GeocodeResult {
  name: string;
  admin1?: string;
  country?: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export interface WeatherCurrent {
  time: string;
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  precipitation: number;
  weather_code: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
  surface_pressure: number;
}

export interface WeatherDaily {
  time: string[];
  weather_code: (number | null)[];
  temperature_2m_max: (number | null)[];
  temperature_2m_min: (number | null)[];
}

export interface WeatherHourly {
  time: string[];
  temperature_2m: (number | null)[];
}

export interface WeatherResponse {
  current: WeatherCurrent;
  daily: WeatherDaily;
  hourly: WeatherHourly;
}

export interface AirCurrent {
  time: string;
  us_aqi: number;
  pm2_5: number;
  pm10: number;
  ozone: number;
  nitrogen_dioxide: number;
  sulphur_dioxide: number;
  carbon_monoxide: number;
}

export interface AirHourly {
  time: string[];
  pm2_5: (number | null)[];
  pm10: (number | null)[];
  us_aqi: (number | null)[];
}

export interface AirQualityResponse {
  current: AirCurrent;
  hourly: AirHourly;
}

export interface DashboardData {
  place: GeocodeResult;
  weather: WeatherResponse;
  air: AirQualityResponse;
}
