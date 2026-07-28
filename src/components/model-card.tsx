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
  const hasBg = Boolean(model.cardBg);
  const light = model.cardTheme === "light";

  return (
    <a
      href={model.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "card-hover group relative flex flex-col overflow-hidden rounded-[14px] border p-[18px] transition-all duration-150 ease-out",
        "hover:-translate-y-px hover:border-border-strong",
        "hover:shadow-[0_4px_18px_-4px_rgba(255,46,46,0.18)]",
        "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-accent-soft",
        hasBg ? "bg-transparent" : "bg-surface hover:bg-surface-hover",
        isMajor && "opacity-72 border-l-2 border-l-status-down",
        !isMajor && "border-border",
      )}
    >
      {model.cardBg && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={model.cardBg}
            alt=""
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-0 h-full w-full object-cover object-center",
              model.cardBgInvert && "invert",
            )}
            draggable={false}
          />
          {/* Soft dim so the art sits behind content */}
          <div
            className={cn(
              "pointer-events-none absolute inset-0",
              light
                ? "bg-white/10"
                : model.cardBgInvert
                  ? "bg-black/45"
                  : "bg-black/60",
            )}
            aria-hidden="true"
          />
        </>
      )}

      <div className="relative z-10 flex flex-col">
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
            <span
              className={cn(
                "truncate font-mono text-[14px] font-semibold",
                light ? "text-[#0c0a09]" : "text-text",
              )}
            >
              {model.id}
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            <span
              className={cn(
                "inline-flex h-7 items-center rounded-full border px-3 text-[10.5px] font-medium uppercase tracking-[0.06em] transition-colors duration-150",
                light
                  ? "border-black/15 bg-black/[0.04] text-[#0c0a09] group-hover:border-accent group-hover:bg-accent-soft group-hover:text-accent"
                  : "border-white/15 bg-white/[0.06] text-text group-hover:border-accent group-hover:bg-accent-soft group-hover:text-accent",
              )}
            >
              Open
            </span>
            <span
              className={cn(
                "inline-flex size-7 items-center justify-center rounded-[10px] border transition-colors duration-150",
                light
                  ? "border-black/15 bg-black/[0.04] text-[#0c0a09] group-hover:border-accent group-hover:bg-accent-soft group-hover:text-accent"
                  : "border-white/15 bg-white/[0.06] text-text group-hover:border-accent group-hover:bg-accent-soft group-hover:text-accent",
              )}
            >
              <ExternalLink className="size-3.5" strokeWidth={1.5} />
            </span>
          </div>
        </div>

        {/* Row 2: provider */}
        <div className="mt-3 flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <span
              className={cn(
                "flex size-[26px] shrink-0 items-center justify-center overflow-hidden rounded-[7px] border",
                light ? "border-black/12 bg-white/70" : "border-white/15 bg-black/30",
              )}
            >
              <span className="[&>img]:opacity-70 [&>img]:grayscale [&>img]:transition-all [&>img]:duration-150 group-hover:[&>img]:opacity-100 group-hover:[&>img]:grayscale-0">
                <ProviderLogo slug={model.providerSlug} size={18} name={model.provider} />
              </span>
            </span>
            <span
              className={cn(
                "truncate text-[11px] font-medium uppercase tracking-[0.06em]",
                light ? "text-[#57534e]" : "text-text-muted",
              )}
            >
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
            <span
              className={cn(
                "text-[10px] uppercase tracking-wide",
                light ? "text-[#78716c]" : "text-text-muted",
              )}
            >
              FREE
            </span>
            <span
              className={cn(
                "font-medium",
                light ? "text-[#0c0a09]" : "text-text",
              )}
            >
              {model.freeLimit}
            </span>
          </div>
        </div>

        {/* Row 4: badges + tags */}
        <div
          className={cn(
            "mt-3 flex items-end justify-between gap-2 border-t pt-3",
            light ? "border-black/10" : "border-white/10",
          )}
        >
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
                className={cn(
                  "rounded-[6px] border px-1.5 py-[3px] font-mono text-[9.5px] uppercase tracking-wide",
                  light
                    ? "border-black/12 text-[#57534e]"
                    : "border-white/12 text-text-muted",
                )}
              >
                {tagLabels[t]}
              </span>
            ))}
          </div>
        </div>
      </div>
    </a>
  );
}
