"use client";

import { useEffect, useState } from "react";

const providerNames: Record<string, string> = {
  google: "Google",
  groq: "Groq",
  cerebras: "Cerebras",
  openrouter: "OpenRouter",
  nvidia: "NVIDIA",
  github: "GitHub",
  mistral: "Mistral",
  cloudflare: "Cloudflare",
  cohere: "Cohere",
  xai: "xAI",
  together: "Together",
  huggingface: "HF",
};

export function ProviderLogo({
  slug,
  size = 18,
  name,
}: {
  slug: string;
  size?: number;
  name?: string;
}) {
  const [failed, setFailed] = useState(false);
  const box = Math.round(size * 1.45);
  const fontSize = Math.round(size * 0.6);

  useEffect(() => {
    setFailed(false);
  }, [slug]);

  if (!failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={`/logos/${slug}.svg`}
        alt=""
        width={size}
        height={size}
        loading="lazy"
        onError={() => setFailed(true)}
        className="shrink-0"
        style={{ width: size, height: size }}
      />
    );
  }

  const label = (name ?? providerNames[slug] ?? slug).charAt(0).toUpperCase();
  return (
    <span
      aria-hidden="true"
      className="flex shrink-0 items-center justify-center border border-border bg-bg font-mono font-medium text-text"
      style={{
        width: box,
        height: box,
        borderRadius: 6,
        fontSize,
        lineHeight: 1,
      }}
    >
      {label}
    </span>
  );
}
