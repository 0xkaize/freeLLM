"use client";

import { Check, ChevronDown, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { sortOptions, type SortKey } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export function SearchBar({
  value,
  onChange,
  sort,
  onSortChange,
}: {
  value: string;
  onChange: (v: string) => void;
  sort: SortKey;
  onSortChange: (s: SortKey) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      const typing =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;
      if (e.key === "/" && !typing) {
        e.preventDefault();
        inputRef.current?.focus();
      } else if (e.key === "Escape" && document.activeElement === inputRef.current) {
        onChange("");
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onChange]);

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <div className="relative flex-1">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted"
          strokeWidth={1.5}
        />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search models and providers..."
          className="h-11 w-full rounded-[10px] border border-border bg-surface pl-10 pr-10 text-[13px] text-text placeholder:text-text-muted focus:border-accent focus:outline-none focus:ring-[3px] focus:ring-accent-soft"
        />
        <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded-[6px] border border-border bg-bg px-1.5 py-0.5 font-mono text-[11px] text-text-muted">
          /
        </kbd>
      </div>

      <SortSelect value={sort} onChange={onSortChange} />
    </div>
  );
}

function SortSelect({
  value,
  onChange,
}: {
  value: SortKey;
  onChange: (s: SortKey) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = sortOptions.find((o) => o.value === value) ?? sortOptions[0];

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div ref={ref} className="relative w-full sm:w-[200px]">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex h-11 w-full items-center justify-between gap-2 rounded-[10px] border border-border bg-surface px-3 text-[13px] text-text focus:border-accent focus:outline-none focus:ring-[3px] focus:ring-accent-soft"
      >
        <span className="truncate text-text-muted">Sort:</span>
        <span className="truncate font-medium text-text">{current.label}</span>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-text-muted transition-transform duration-150",
            open && "rotate-180",
          )}
          strokeWidth={1.5}
        />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute z-20 mt-1 w-full overflow-hidden rounded-[12px] border border-border bg-surface py-1 shadow-[0_2px_8px_rgba(12,10,9,0.04)]"
        >
          {sortOptions.map((o) => (
            <li key={o.value}>
              <button
                type="button"
                role="option"
                aria-selected={o.value === value}
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center justify-between px-3 py-2 text-left text-[13px] transition-colors duration-150 hover:bg-surface-hover",
                  o.value === value ? "text-accent" : "text-text-secondary",
                )}
              >
                {o.label}
                {o.value === value && <Check className="size-3.5" strokeWidth={1.5} />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
