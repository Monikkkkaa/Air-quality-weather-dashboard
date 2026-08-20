// Given the API's local ISO timestamp (already in the searched city's own
// timezone, since we request timezone=auto), work out which "sky" period
// we're in. This drives the background and hero accent — real local time,
// not decoration.
export function periodFor(localIso?: string) {
  const hour = localIso ? new Date(localIso).getHours() : new Date().getHours();
  if (hour >= 5 && hour < 7) return "dawn";
  if (hour >= 7 && hour < 17) return "day";
  if (hour >= 17 && hour < 19) return "dusk";
  return "night";
}

const META = {
  dawn: {
    label: "Dawn",
    heroGradient: "linear-gradient(135deg, #FDBA74 0%, #F472B6 55%, #A78BFA 100%)",
    base: "#1B1033",
    blobA: "#C2410C",
    blobB: "#5B21B6",
  },
  day: {
    label: "Day",
    heroGradient: "linear-gradient(135deg, #7DD3FC 0%, #38BDF8 55%, #6366F1 100%)",
    base: "#0B1B33",
    blobA: "#1D4ED8",
    blobB: "#0E7490",
  },
  dusk: {
    label: "Dusk",
    heroGradient: "linear-gradient(135deg, #FB923C 0%, #F472B6 55%, #7C3AED 100%)",
    base: "#1A1030",
    blobA: "#9A3412",
    blobB: "#6D28D9",
  },
  night: {
    label: "Night",
    heroGradient: "linear-gradient(135deg, #A5B4FC 0%, #818CF8 55%, #6366F1 100%)",
    base: "#05060F",
    blobA: "#312E81",
    blobB: "#1E1B4B",
  },
};

export function periodMeta(period: string) {
  return META[period as keyof typeof META] || META.night;
}
