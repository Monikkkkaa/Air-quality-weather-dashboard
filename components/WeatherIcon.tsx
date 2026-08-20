interface WeatherIconProps {
  icon: string;
  className?: string;
}

export default function WeatherIcon({ icon, className = "w-10 h-10" }: WeatherIconProps) {
  const stroke = "currentColor";
  const common = { fill: "none", stroke, strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  switch (icon) {
    case "sun":
      return (
        <svg viewBox="0 0 48 48" className={className} {...common}>
          <circle cx="24" cy="24" r="9" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line
              key={deg}
              x1="24"
              y1="6"
              x2="24"
              y2="11"
              transform={`rotate(${deg} 24 24)`}
            />
          ))}
        </svg>
      );
    case "cloud-sun":
      return (
        <svg viewBox="0 0 48 48" className={className} {...common}>
          <circle cx="18" cy="16" r="6" />
          <line x1="18" y1="4" x2="18" y2="7" />
          <line x1="8" y1="14" x2="10.5" y2="15.5" />
          <path d="M14 30a8 8 0 0 1 15-4 6 6 0 0 1 -1 12H16a6 6 0 0 1 -2-19 8 8 0 0 1 8-4" />
        </svg>
      );
    case "fog":
      return (
        <svg viewBox="0 0 48 48" className={className} {...common}>
          <path d="M12 20a8 8 0 0 1 15-4 6 6 0 0 1 -1 12H14a6 6 0 0 1 -2-8" />
          <line x1="10" y1="34" x2="38" y2="34" />
          <line x1="14" y1="40" x2="34" y2="40" />
        </svg>
      );
    case "drizzle":
      return (
        <svg viewBox="0 0 48 48" className={className} {...common}>
          <path d="M12 18a8 8 0 0 1 15-4 6 6 0 0 1 -1 12H14a6 6 0 0 1 -2-8" />
          <line x1="18" y1="32" x2="16" y2="38" />
          <line x1="26" y1="32" x2="24" y2="38" />
          <line x1="34" y1="32" x2="32" y2="38" />
        </svg>
      );
    case "rain":
      return (
        <svg viewBox="0 0 48 48" className={className} {...common}>
          <path d="M12 16a8 8 0 0 1 15-4 6 6 0 0 1 -1 12H14a6 6 0 0 1 -2-8" />
          <line x1="16" y1="30" x2="13" y2="40" />
          <line x1="24" y1="30" x2="21" y2="40" />
          <line x1="32" y1="30" x2="29" y2="40" />
        </svg>
      );
    case "snow":
      return (
        <svg viewBox="0 0 48 48" className={className} {...common}>
          <path d="M12 16a8 8 0 0 1 15-4 6 6 0 0 1 -1 12H14a6 6 0 0 1 -2-8" />
          <g strokeWidth="1.4">
            <line x1="16" y1="30" x2="16" y2="40" />
            <line x1="11.5" y1="35" x2="20.5" y2="35" />
            <line x1="32" y1="30" x2="32" y2="40" />
            <line x1="27.5" y1="35" x2="36.5" y2="35" />
          </g>
        </svg>
      );
    case "storm":
      return (
        <svg viewBox="0 0 48 48" className={className} {...common}>
          <path d="M12 16a8 8 0 0 1 15-4 6 6 0 0 1 -1 12H14a6 6 0 0 1 -2-8" />
          <path d="M25 30 19 39h6l-4 7" />
        </svg>
      );
    case "cloud":
    default:
      return (
        <svg viewBox="0 0 48 48" className={className} {...common}>
          <path d="M12 30a8 8 0 0 1 15-4 6 6 0 0 1 -1 12H14a6 6 0 0 1 -2-8" />
        </svg>
      );
  }
}
