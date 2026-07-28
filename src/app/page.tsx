"use client";

import { SlidersHorizontal } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { FilterSidebar } from "@/components/filter-sidebar";
import { ModelCard } from "@/components/model-card";
import { ResultsHeader } from "@/components/results-header";
import { SearchBar } from "@/components/search-bar";
import { models } from "@/data/models";
import { type SortKey } from "@/lib/catalog";
import {
  applyFilters,
  countActiveFilters,
  emptyFilters,
  uniqueProviders,
  type Filters,
} from "@/lib/filtering";

const PAGE_SIZE = 30;

function parseUrlFilters(): Filters {
  const params = new URLSearchParams(window.location.search);
  const f = emptyFilters((params.get("sort") as SortKey) || "name");
  f.q = params.get("q") ?? "";
  f.type = params.getAll("type");
  f.access = params.getAll("access");
  f.status = params.getAll("status");
  f.provider = params.getAll("provider");
  f.tag = params.getAll("tag");
  return f;
}

function filtersToQuery(f: Filters): string {
  const p = new URLSearchParams();
  if (f.q) p.set("q", f.q);
  for (const v of f.type) p.append("type", v);
  for (const v of f.access) p.append("access", v);
  for (const v of f.status) p.append("status", v);
  for (const v of f.provider) p.append("provider", v);
  for (const v of f.tag) p.append("tag", v);
  if (f.sort !== "name") p.set("sort", f.sort);
  return p.toString();
}

export default function Home() {
  const [filters, setFilters] = useState<Filters>(() => emptyFilters());
  const [debouncedQ, setDebouncedQ] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [sheetOpen, setSheetOpen] = useState(false);
  const loadedRef = useRef(false);

  useEffect(() => {
    setFilters(parseUrlFilters());
    loadedRef.current = true;
  }, []);

  useEffect(() => {
    const t = window.setTimeout(() => setDebouncedQ(filters.q), 150);
    return () => window.clearTimeout(t);
  }, [filters.q]);

  useEffect(() => {
    if (!loadedRef.current) return;
    const qs = filtersToQuery(filters);
    const next = qs ? `?${qs}` : window.location.pathname;
    window.history.replaceState(null, "", next);
  }, [filters]);

  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [
    debouncedQ,
    filters.type,
    filters.access,
    filters.status,
    filters.provider,
    filters.tag,
    filters.sort,
  ]);

  const filtered = useMemo(
    () => applyFilters(models, { ...filters, q: debouncedQ }),
    [filters, debouncedQ],
  );
  const providers = useMemo(() => uniqueProviders(), []);
  const shown = filtered.slice(0, visible);
  const activeCount = countActiveFilters(filters);

  const patch = useCallback((p: Partial<Filters>) => {
    setFilters((f) => ({ ...f, ...p }));
  }, []);

  const reset = useCallback(() => {
    setFilters((f) => emptyFilters(f.sort));
    setSheetOpen(false);
  }, []);

  const removeFilter = useCallback((group: keyof Filters, value: string) => {
    setFilters((f) => {
      const arr = f[group] as string[];
      return { ...f, [group]: arr.filter((v) => v !== value) } as Filters;
    });
  }, []);

  const sidebar = (
    <FilterSidebar filters={filters} onChange={patch} onReset={reset} />
  );

  return (
    <div className="py-6 lg:py-8">
      <SearchBar
        value={filters.q}
        onChange={(q) => patch({ q })}
        sort={filters.sort}
        onSortChange={(sort) => patch({ sort })}
      />

      <div className="mt-5 flex gap-6">
        <aside className="hidden w-[260px] shrink-0 lg:block">
          <div className="sticky top-[88px]">{sidebar}</div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="mb-3 lg:hidden">
            <button
              type="button"
              onClick={() => setSheetOpen(true)}
              className="inline-flex h-10 items-center gap-2 rounded-[10px] border border-border bg-surface px-3 text-[13px] text-text transition-colors duration-150 hover:border-border-strong"
            >
              <SlidersHorizontal className="size-4" strokeWidth={1.5} />
              Filters
              {activeCount > 0 && (
                <span className="rounded-full bg-accent-soft px-1.5 font-mono text-[11px] font-medium text-accent">
                  {activeCount}
                </span>
              )}
            </button>
          </div>

          <ResultsHeader
            modelCount={filtered.length}
            providerCount={providers.length}
            filters={filters}
            onRemove={removeFilter}
            onReset={reset}
          />

          {shown.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
              <p className="text-[13px] text-text-secondary">Nothing found</p>
              <button
                type="button"
                onClick={reset}
                className="rounded-[10px] border border-border bg-surface px-3 py-1.5 text-[13px] text-text transition-colors duration-150 hover:border-accent hover:text-accent"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <>
              <div className="mt-4 grid grid-cols-1 gap-4 min-[860px]:grid-cols-2 xl:grid-cols-3">
                {shown.map((m) => (
                  <ModelCard key={m.id} model={m} />
                ))}
              </div>
              {visible < filtered.length && (
                <div className="mt-6 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setVisible((v) => v + PAGE_SIZE)}
                    className="rounded-[10px] border border-border bg-surface px-4 py-2 text-[13px] text-text transition-colors duration-150 hover:border-border-strong"
                  >
                    Show more ({filtered.length - visible})
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {sheetOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSheetOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-[16px] border-t border-border bg-bg p-4">
            <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-border-strong" />
            {sidebar}
            <button
              type="button"
              onClick={() => setSheetOpen(false)}
              className="mt-4 w-full rounded-[10px] border border-border bg-surface py-2.5 text-[13px] font-medium text-text transition-colors duration-150 hover:border-accent hover:text-accent"
            >
              Show results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
