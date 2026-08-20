interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-3xl border border-[#E9694C]/40 bg-[#E9694C]/10 px-6 py-12 text-center backdrop-blur-xl">
      <div className="font-display text-lg font-medium text-[#F0A94E]">
        Couldn&apos;t read the instruments
      </div>
      <p className="max-w-sm text-sm text-[#F0A94E]/90">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-full border border-[#F0A94E]/50 px-5 py-2 text-sm font-medium text-[#F0A94E] transition hover:bg-[#F0A94E]/10"
        >
          Try again
        </button>
      )}
    </div>
  );
}
