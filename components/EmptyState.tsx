export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-white/15 bg-white/[0.03] py-24 text-center backdrop-blur-xl">
      <div className="font-display text-lg font-medium text-cloud-100">
        Search a city to bring the panel online
      </div>
      <p className="max-w-sm text-sm text-mist">
        Live temperature, air quality, and multi-day trends will appear here
        the moment a location is found.
      </p>
    </div>
  );
}
