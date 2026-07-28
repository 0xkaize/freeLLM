import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function XLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function Header() {
  return (
    <header className="w-full bg-transparent">
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-4 md:px-6">
        {/* Left: Home */}
        <Link
          href="/"
          className={cn(buttonVariants({ variant: "ghost", className: "text-lg font-medium" }))}
        >
          Home
        </Link>

        {/* Center: Logo */}
        <Link
          href="/"
          className="font-heading text-2xl font-medium tracking-tight text-foreground"
        >
          freeLLM
        </Link>

        {/* Right: X profile */}
        <a
          href="https://x.com/0x_kaize"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-1.5 text-sm transition-colors duration-150 hover:border-border-strong hover:bg-surface-hover"
          style={{ boxShadow: "0 1px 1px rgba(0,0,0,0.4), 0 0 14px rgba(255,46,46,0.32)" }}
        >
          <XLogo className="size-3.5 text-text" />
          <span className="text-text-muted">by</span>
          <span
            className="text-accent"
            style={{ textShadow: "0 0 1px rgba(255,46,46)" }}
          >
            @0x_kaize
          </span>
        </a>
      </div>
    </header>
  );
}
