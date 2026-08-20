import { NextRequest, NextResponse } from "next/server";
import { geocode, fetchWeather, fetchAirQuality } from "@/lib/api";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");

  if (!city || !city.trim()) {
    return NextResponse.json({ error: "Please provide a city name." }, { status: 400 });
  }

  try {
    const matches = await geocode(city.trim());

    if (!matches.length) {
      return NextResponse.json(
        { error: `No location found for "${city}". Try a different spelling.` },
        { status: 404 }
      );
    }

    const place = matches[0];
    const [weather, air] = await Promise.all([
      fetchWeather(place.latitude, place.longitude, place.timezone),
      fetchAirQuality(place.latitude, place.longitude, place.timezone),
    ]);

    return NextResponse.json({
      place: {
        name: place.name,
        admin1: place.admin1 || null,
        country: place.country || null,
        latitude: place.latitude,
        longitude: place.longitude,
        timezone: place.timezone,
      },
      weather,
      air,
    });
  } catch (err) {
    console.error("[Weather API Error]:", err);
    return NextResponse.json(
      { error: "Something went wrong fetching live data. Please try again." },
      { status: 502 }
    );
  }
}
