// Open-Meteo returns hourly arrays as parallel lists: { time: [...], pm2_5: [...] }.
// This finds the closest index to "now" and returns a fixed-length window of
// { time, value } points so charts always show "now → next N hours" cleanly.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hourlyWindow(hourly: any, key: string, { hours = 72, nowIso }: { hours?: number, nowIso?: string } = {}) {
  if (!hourly?.time?.length || !hourly[key]) return [];

  const times = hourly.time;
  const values = hourly[key];
  const now = nowIso ? new Date(nowIso) : new Date();

  let startIdx = 0;
  let smallestDiff = Infinity;
  for (let i = 0; i < times.length; i++) {
    const diff = Math.abs(new Date(times[i]).getTime() - now.getTime());
    if (diff < smallestDiff) {
      smallestDiff = diff;
      startIdx = i;
    }
  }

  const endIdx = Math.min(startIdx + hours, times.length);

  return times.slice(startIdx, endIdx).map((iso: string, i: number) => ({
    time: iso,
    value: values[startIdx + i],
    label: new Date(iso).toLocaleTimeString("en-US", { weekday: "short", hour: "numeric" }),
  }));
}
