"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Prefill from the current ?name= if present
  const initialName = searchParams?.get("name") || "";
  const [searchText, setSearchText] = useState(initialName);

  // If the URL’s ?name= changes (e.g. back/forward navigation), update our input
  useEffect(() => {
    setSearchText(searchParams?.get("name") || "");
  }, [searchParams]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = searchText.trim().toLowerCase();
    if (!trimmed) return;
    // Navigate to "/?name=<trimmed>"
    router.push(`/pokemon/${encodeURIComponent(trimmed)}`);
  };

  return (
    <form onSubmit={onSubmit} className="flex items-center gap-2 mb-6">
      <input
        type="text"
        placeholder="e.g. Pikachu"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="border px-3 py-1 rounded flex-1"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
}
