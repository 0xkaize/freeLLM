import { ExternalLink } from "lucide-react";

import { ProviderLogo } from "@/components/provider-logo";
import type { Model } from "@/data/models";
import {
  accessLabels,
  statusColor,
  statusLabels,
  tagLabels,
} from "@/lib/catalog";
import { cn } from "@/lib/utils";

export function ModelCard({ model }: { model: Model }) {
  const isMajor = model.status === "major";

  return (
    <a
      href={model.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "card-hover group relative flex flex-col rounded-[14px] border bg-surface p-[18px] transition-all duration-150 ease-out",
        "hover:-translate-y-px hover:border-border-strong hover:bg-surface-hover",
        "hover:shadow-[0_4px_18px_-4px_rgba(255,46,46,0.18)]",
        "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-accent-soft",
        isMajor && "opacity-72 border-l-2 border-l-status-down",
        !isMajor && "border-border",
      )}
    >
      {/* Row 1: header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <span
            className={cn(
              "size-[7px] shrink-0 rounded-full",
              model.status === "operational" && "status-dot-pulse",
            )}
            style={{ backgroundColor: statusColor[model.status] }}
            aria-hidden="true"
          />
          <span className="truncate font-mono text-[14px] font-semibold text-text">
            {model.id}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <span className="inline-flex h-7 items-center rounded-full border border-border px-3 text-[10.5px] font-medium uppercase tracking-[0.06em] text-text transition-colors duration-150 group-hover:border-accent group-hover:bg-accent-soft group-hover:text-accent">
            Open
          </span>
          <span className="inline-flex size-7 items-center justify-center rounded-[10px] border border-border text-text transition-colors duration-150 group-hover:border-accent group-hover:bg-accent-soft group-hover:text-accent">
            <ExternalLink className="size-3.5" strokeWidth={1.5} />
          </span>
        </div>
      </div>

      {/* Row 2: provider */}
      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex size-[26px] shrink-0 items-center justify-center overflow-hidden rounded-[7px] border border-border">
            <span className="[&>img]:opacity-70 [&>img]:grayscale [&>img]:transition-all [&>img]:duration-150 group-hover:[&>img]:opacity-100 group-hover:[&>img]:grayscale-0">
              <ProviderLogo slug={model.providerSlug} size={18} name={model.provider} />
            </span>
          </span>
          <span className="truncate text-[11px] font-medium uppercase tracking-[0.06em] text-text-muted">
            {model.provider}
          </span>
        </div>
        <span
          className="shrink-0 font-mono text-[11px]"
          style={{ color: statusColor[model.status] }}
        >
          {statusLabels[model.status]}
        </span>
      </div>

      {/* Row 3: limits */}
      <div className="mt-3 font-mono text-[12.5px] leading-relaxed">
        <div className="flex items-baseline gap-2">
          <span className="text-[10px] uppercase tracking-wide text-text-muted">
            FREE
          </span>
          <span className="font-medium text-text">{model.freeLimit}</span>
        </div>
      </div>

      {/* Row 4: badges + tags */}
      <div className="mt-3 flex items-end justify-between gap-2 border-t border-border pt-3">
        <div className="flex min-w-0 flex-wrap gap-1.5">
          {model.access.map((a) => (
            <span
              key={a}
              className="rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-accent"
            >
              {accessLabels[a]}
            </span>
          ))}
        </div>
        <div className="flex shrink-0 flex-wrap justify-end gap-1">
          {model.tags.map((t) => (
            <span
              key={t}
              className="rounded-[6px] border border-border px-1.5 py-[3px] font-mono text-[9.5px] uppercase tracking-wide text-text-muted"
            >
              {tagLabels[t]}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}
