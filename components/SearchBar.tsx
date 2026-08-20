"use client";

import { useState } from "react";

interface SearchBarProps {
  onSearch: (city: string) => void;
  loading: boolean;
}

export default function SearchBar({ onSearch, loading }: SearchBarProps) {
  const [value, setValue] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (value.trim()) onSearch(value.trim());
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-xl gap-2">
      <div className="relative flex-1">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-xs tracking-widest text-mist">
          CITY
        </span>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Indore, Tokyo, Nairobi…"
          aria-label="City name"
          className="w-full rounded-full border border-white/15 bg-white/[0.06] py-3 pl-16 pr-4 text-sm text-cloud-50 placeholder:text-mist/60 shadow-lg shadow-black/20 backdrop-blur-xl outline-none transition focus:border-white/30 focus:bg-white/[0.09]"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="rounded-full bg-cloud-50 px-6 py-3 text-sm font-medium text-dusk-950 shadow-lg shadow-black/20 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Scanning…" : "Check"}
      </button>
    </form>
  );
}
