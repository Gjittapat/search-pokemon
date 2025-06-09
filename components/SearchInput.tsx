"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialName = searchParams.get("name") || "";
  const [searchText, setSearchText] = useState(initialName);

  useEffect(() => {
    setSearchText(searchParams.get("name") || "");
  }, [searchParams]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = searchText.trim().toLowerCase();
    if (!trimmed) return;
    router.push(`/pokemon/${encodeURIComponent(trimmed)}`);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center gap-3 mb-6 bg-white rounded-2xl shadow-sm p-4 text-black"
    >
      <input
        type="text"
        placeholder="e.g. Pikachu"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition"
      >
        Search
      </button>
    </form>
  );
}
