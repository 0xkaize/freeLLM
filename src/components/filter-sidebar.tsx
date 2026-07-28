"use client";

import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";

import {
  accessLabels,
  statusColor,
  statusLabels,
  tagLabels,
  typeOptions,
} from "@/lib/catalog";
import {
  availableFilterOptions,
  countActiveFilters,
  type Filters,
} from "@/lib/filtering";
import { cn } from "@/lib/utils";

function Pill({
  active,
  onClick,
  children,
  dotColor,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  dotColor?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[12px] transition-colors duration-150",
        active
          ? "border-accent bg-accent-soft font-medium text-accent"
          : "border-border bg-surface text-text-secondary hover:border-border-strong hover:text-text",
      )}
    >
      {dotColor && (
        <span
          className="size-[6px] rounded-full"
          style={{ backgroundColor: dotColor }}
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  );
}

function Group({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-border pt-3.5 first:border-t-0 first:pt-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between text-[13px] font-semibold text-text"
      >
        {title}
        <ChevronDown
          className={cn(
            "size-4 text-text-muted transition-transform duration-150",
            open && "rotate-180",
          )}
          strokeWidth={1.5}
        />
      </button>
      {open && <div className="mt-3 flex flex-wrap gap-1.5">{children}</div>}
    </div>
  );
}

export function FilterSidebar({
  filters,
  onChange,
  onReset,
}: {
  filters: Filters;
  onChange: (patch: Partial<Filters>) => void;
  onReset: () => void;
}) {
  const options = useMemo(() => availableFilterOptions(), []);
  const activeCount = countActiveFilters(filters);
  const [open, setOpen] = useState({
    tag: true,
    access: true,
    type: true,
    status: false,
  });

  function toggleGroup(key: keyof typeof open) {
    setOpen((o) => ({ ...o, [key]: !o[key] }));
  }

  function toggleArray(group: keyof Filters, value: string) {
    const arr = filters[group] as string[];
    const next = arr.includes(value)
      ? arr.filter((v) => v !== value)
      : [...arr, value];
    onChange({ [group]: next } as Partial<Filters>);
  }

  return (
    <div className="rounded-[14px] border border-border bg-surface p-[18px]">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="size-3.5 text-text-muted" strokeWidth={1.5} />
          <h2 className="text-[13px] font-semibold text-text">Filters</h2>
        </div>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={onReset}
            className="text-[12px] font-medium text-accent transition-colors duration-150 hover:text-accent-hover"
          >
            Reset
          </button>
        )}
      </div>

      <div className="mt-4 space-y-4">
        {options.tags.length > 0 && (
          <Group title="Kind" open={open.tag} onToggle={() => toggleGroup("tag")}>
            {options.tags.map((v) => (
              <Pill
                key={v}
                active={filters.tag.includes(v)}
                onClick={() => toggleArray("tag", v)}
              >
                {tagLabels[v as never] ?? v}
              </Pill>
            ))}
          </Group>
        )}

        {options.access.length > 0 && (
          <Group
            title="Access"
            open={open.access}
            onToggle={() => toggleGroup("access")}
          >
            {options.access.map((v) => (
              <Pill
                key={v}
                active={filters.access.includes(v)}
                onClick={() => toggleArray("access", v)}
              >
                {accessLabels[v as never] ?? v}
              </Pill>
            ))}
          </Group>
        )}

        {options.types.length > 0 && (
          <Group title="Type" open={open.type} onToggle={() => toggleGroup("type")}>
            {options.types.map((v) => (
              <Pill
                key={v}
                active={filters.type.includes(v)}
                onClick={() => toggleArray("type", v)}
              >
                {typeOptions.find((o) => o.value === v)?.label ?? v}
              </Pill>
            ))}
          </Group>
        )}

        {options.status.length > 0 && (
          <Group
            title="Status"
            open={open.status}
            onToggle={() => toggleGroup("status")}
          >
            {options.status.map((v) => (
              <Pill
                key={v}
                active={filters.status.includes(v)}
                onClick={() => toggleArray("status", v)}
                dotColor={statusColor[v as never]}
              >
                {statusLabels[v as never] ?? v}
              </Pill>
            ))}
          </Group>
        )}
      </div>
    </div>
  );
}
