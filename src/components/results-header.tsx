"use client";

import { X } from "lucide-react";

import {
  accessLabels,
  statusLabels,
  tagLabels,
  typeOptions,
} from "@/lib/catalog";
import type { Filters } from "@/lib/filtering";

type Chip = { group: keyof Filters; value: string; label: string };

export function ResultsHeader({
  modelCount,
  providerCount,
  filters,
  onRemove,
  onReset,
}: {
  modelCount: number;
  providerCount: number;
  filters: Filters;
  onRemove: (group: keyof Filters, value: string) => void;
  onReset: () => void;
}) {
  const chips: Chip[] = [];
  for (const v of filters.type)
    chips.push({
      group: "type",
      value: v,
      label: typeOptions.find((o) => o.value === v)?.label ?? v,
    });
  for (const v of filters.access)
    chips.push({ group: "access", value: v, label: accessLabels[v as never] ?? v });
  for (const v of filters.status)
    chips.push({ group: "status", value: v, label: statusLabels[v as never] ?? v });
  for (const v of filters.provider) chips.push({ group: "provider", value: v, label: v });
  for (const v of filters.tag)
    chips.push({
      group: "tag",
      value: v,
      label: tagLabels[v as never] ?? v,
    });

  return (
    <div className="flex flex-col gap-3">
      <p className="text-[13px] text-text-secondary">
        <span className="font-mono font-medium text-text">{modelCount}</span> models
        found (<span className="font-mono font-medium text-text">{providerCount}</span>{" "}
        providers)
      </p>
      {chips.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          {chips.map((c) => (
            <button
              key={`${c.group}-${c.value}`}
              type="button"
              onClick={() => onRemove(c.group, c.value)}
              className="inline-flex items-center gap-1 rounded-full border border-border bg-surface px-2 py-1 text-[12px] text-text-secondary transition-colors duration-150 hover:border-border-strong hover:text-text"
            >
              {c.label}
              <X className="size-3 text-text-muted" strokeWidth={1.5} />
            </button>
          ))}
          <button
            type="button"
            onClick={onReset}
            className="text-[12px] font-medium text-accent transition-colors duration-150 hover:text-accent-hover"
          >
            Reset all
          </button>
        </div>
      )}
    </div>
  );
}
