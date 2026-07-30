export type ModelType = "text" | "image" | "video" | "audio" | "code" | "embedding";
export type ModelAccess =
  | "free-forever"
  | "free-tier"
  | "signup-credits"
  | "open-source"
  | "no-card"
  | "no-signup"
  | "card-required"
  | "phone-required"
  | "data-training";
export type ModelStatus = "operational" | "degraded" | "partial" | "major";
export type ModelTag = "website" | "collection";

export type Model = {
  id: string;
  provider: string;
  providerSlug: string;
  type: ModelType[];
  access: ModelAccess[];
  status: ModelStatus;
  freeLimit: string;
  tags: ModelTag[];
  url: string;
  addedAt: string;
  /** Optional card background image, e.g. "/cards/zenmux.png" */
  cardBg?: string;
  /** Theme for text/buttons over cardBg. Default "dark" (site look). */
  cardTheme?: "light" | "dark";
  /** Invert a light artwork so it fits the dark UI (white→black). */
  cardBgInvert?: boolean;
};

export const models: Model[] = [
  {
    id: "gemini-2.5-flash",
    provider: "Google AI Studio",
    providerSlug: "google",
    type: ["text", "image", "audio", "code"],
    access: ["free-forever"],
    status: "operational",
    freeLimit: "1,500 requests/day",
    tags: ["website"],
    url: "https://aistudio.google.com/",
    addedAt: "2025-06-01T00:00:00.000Z",
  },
  {
    id: "free-llm-api-resources",
    provider: "GitHub",
    providerSlug: "github",
    type: ["text"],
    access: ["free-forever"],
    status: "operational",
    freeLimit: "GitHub repository with a list of free LLM",
    tags: ["collection"],
    url: "https://github.com/cheahjs/free-llm-api-resources#groq",
    addedAt: "2026-07-27T00:00:00.000Z",
    cardBg: "/cards/github.png",
    cardTheme: "dark",
  },
  {
    id: "api-airforce",
    provider: "Api.Airforce",
    providerSlug: "api-airforce",
    type: ["text"],
    access: ["free-tier"],
    status: "operational",
    freeLimit: "most are paid, some are free",
    tags: ["website"],
    url: "https://api.airforce/models/?sort=price",
    addedAt: "2026-07-27T00:00:00.000Z",
  },
  {
    id: "zenmux",
    provider: "Zenmux",
    providerSlug: "zenmux",
    type: ["text"],
    access: ["free-tier"],
    status: "operational",
    freeLimit: "free for some models",
    tags: ["website"],
    url: "https://zenmux.ai/invite/555LC2",
    addedAt: "2026-07-27T00:00:00.000Z",
    cardBg: "/cards/zenmux.png",
    cardTheme: "dark",
    cardBgInvert: true,
  },
  {
    id: "cerebras",
    provider: "Cerebras",
    providerSlug: "cerebras",
    type: ["text"],
    access: ["free-tier", "card-required"],
    status: "operational",
    freeLimit: "1M tokens/day, 5 req/min (per model)",
    tags: ["website"],
    url: "https://cloud.cerebras.ai/",
    addedAt: "2026-07-27T00:00:00.000Z",
  },
  {
    id: "openrouter",
    provider: "OpenRouter",
    providerSlug: "openrouter",
    type: ["text"],
    access: ["free-tier"],
    status: "operational",
    freeLimit: "free for some models",
    tags: ["website"],
    url: "https://openrouter.ai/models",
    addedAt: "2026-07-27T00:00:00.000Z",
  },
  {
    id: "nvidia-nim",
    provider: "NVIDIA",
    providerSlug: "nvidia",
    type: ["text"],
    access: ["free-tier", "phone-required"],
    status: "operational",
    freeLimit: "100+ free LLMs",
    tags: ["website"],
    url: "https://build.nvidia.com/",
    addedAt: "2026-07-27T00:00:00.000Z",
    cardBg: "/cards/nvidia.png",
    cardTheme: "dark",
  },
  {
    id: "cloudflare-workers-ai",
    provider: "Cloudflare Workers AI",
    providerSlug: "cloudflare",
    type: ["text", "image", "audio", "code"],
    access: ["free-tier"],
    status: "operational",
    freeLimit: "10,000 neurons/day",
    tags: ["website"],
    url: "https://developers.cloudflare.com/workers-ai/",
    addedAt: "2026-07-28T00:00:00.000Z",
  },
  {
    id: "cohere",
    provider: "Cohere",
    providerSlug: "cohere",
    type: ["text", "embedding"],
    access: ["free-tier"],
    status: "operational",
    freeLimit: "1,000 requests/month, 20 req/min (shared)",
    tags: ["website"],
    url: "https://cohere.com",
    addedAt: "2026-07-28T00:00:00.000Z",
  },
  {
    id: "mistral-la-plateforme",
    provider: "Mistral La Plateforme",
    providerSlug: "mistral",
    type: ["text", "code"],
    access: ["free-tier", "phone-required", "data-training"],
    status: "operational",
    freeLimit: "Experiment plan, limits set per model",
    tags: ["website"],
    url: "https://console.mistral.ai/",
    addedAt: "2026-07-28T00:00:00.000Z",
  },
  {
    id: "mistral-codestral",
    provider: "Mistral Codestral",
    providerSlug: "mistral",
    type: ["code"],
    access: ["free-tier", "phone-required"],
    status: "operational",
    freeLimit: "2,000 requests/day, 30 req/min",
    tags: ["website"],
    url: "https://codestral.mistral.ai/",
    addedAt: "2026-07-28T00:00:00.000Z",
  },
  {
    id: "huggingface-inference",
    provider: "HuggingFace",
    providerSlug: "huggingface",
    type: ["text", "image", "audio", "code", "embedding"],
    access: ["free-tier"],
    status: "operational",
    freeLimit: "$0.10/month in credits (subject to change)",
    tags: ["website"],
    url: "https://huggingface.co/docs/inference-providers/en/index",
    addedAt: "2026-07-28T00:00:00.000Z",
  },
  {
    id: "github-models",
    provider: "GitHub Models",
    providerSlug: "github",
    type: ["text", "code"],
    access: ["free-tier"],
    status: "operational",
    freeLimit: "rate limits tied to your Copilot tier",
    tags: ["website"],
    url: "https://github.com/marketplace/models",
    addedAt: "2026-07-28T00:00:00.000Z",
    cardBg: "/cards/github.png",
    cardTheme: "dark",
  },
  {
    id: "vercel-ai-gateway",
    provider: "Vercel AI Gateway",
    providerSlug: "vercel",
    type: ["text", "code", "image"],
    access: ["free-tier"],
    status: "operational",
    freeLimit: "$5/mo recurring",
    tags: ["website"],
    url: "https://vercel.com/docs/ai-gateway",
    addedAt: "2026-07-28T00:00:00.000Z",
    cardBg: "/cards/vercel.png",
    cardTheme: "dark",
  },
  {
    id: "kilo-gateway",
    provider: "Kilo Gateway",
    providerSlug: "kilo",
    type: ["text", "code"],
    access: ["free-tier", "no-signup", "data-training"],
    status: "operational",
    freeLimit: "200 requests/hour per IP (shared) for free models",
    tags: ["website"],
    url: "https://kilo.ai/docs/gateway",
    addedAt: "2026-07-28T00:00:00.000Z",
  },
  {
    id: "opencode-zen",
    provider: "OpenCode Zen",
    providerSlug: "opencode",
    type: ["text", "code"],
    access: ["free-tier", "data-training"],
    status: "operational",
    freeLimit: "7 free models, no published quota",
    tags: ["website"],
    url: "https://opencode.ai/docs/zen/",
    addedAt: "2026-07-28T00:00:00.000Z",
  },
  {
    id: "tokenrouter",
    provider: "TokenRouter",
    providerSlug: "tokenrouter",
    type: ["text", "code"],
    access: ["free-tier"],
    status: "operational",
    freeLimit: "free models appear occasionally — check the catalog",
    tags: ["website"],
    url: "https://www.tokenrouter.com/models",
    addedAt: "2026-07-30T00:00:00.000Z",
  },

  // ── How to add a new model ──────────────────────────────────────────
  // Copy the block below, paste it inside this array (after the entry above,
  // and remember the comma), and fill in the values. Fields explained:
  //
  //   id            – model identifier shown on the card (mono font),
  //                   e.g. "llama-3.3-70b-versatile". Must be unique. kebab-case.
  //   provider      – human-readable provider name, e.g. "Groq".
  //   providerSlug  – short slug used for the logo. Put a monochrome SVG at
  //                   public/logos/{providerSlug}.svg (e.g. public/logos/groq.svg).
  //                   If the file is missing, a letter monogram is rendered
  //                   automatically, so this is optional. lowercase-kebab.
  //   type          – any of: "text" | "image" | "video" | "audio" | "code" | "embedding"
  //                   (you can pick several, e.g. ["text","code"]).
  //   access        – any of: "free-forever" | "free-tier" | "signup-credits"
  //                   | "open-source" | "no-card" | "no-signup" | "card-required"
  //                   | "phone-required" | "data-training" (several allowed).
  //   status        – one of: "operational" | "degraded" | "partial" | "major".
  //   freeLimit     – short text describing the free limit,
  //                   e.g. "1,500 requests/day".
  //   tags          – any of: "website" | "collection" (several allowed).
  //                   website    = a service / landing page you can open
  //                   collection = a curated list someone assembled
  //   url           – link the card opens (must start with https://).
  //   addedAt       – ISO date string, e.g. "2025-06-01T00:00:00.000Z".
  //                   Used for the "Newest first" sort.
  //   cardBg        – (optional) path to a card background image in /public,
  //                   e.g. "/cards/zenmux.png". Image is object-cover fitted.
  //   cardTheme     – (optional) "light" | "dark". Pick based on the FINAL look:
  //                   light = bright card → dark text & buttons
  //                   dark  = dark card  → light text & buttons
  //   cardBgInvert  – (optional) true for white artworks: inverts to dark UI
  //                   (use with cardTheme: "dark").
  //
  // {
  //   id: "your-model-id",
  //   provider: "Your Provider",
  //   providerSlug: "yourprovider",
  //   type: ["text"],
  //   access: ["free-tier"],
  //   status: "operational",
  //   freeLimit: "1,000 requests/day",
  //   tags: ["website"],
  //   url: "https://example.com/",
  //   addedAt: "2025-07-27T00:00:00.000Z",
  //   // cardBg: "/cards/yourprovider.png",
  //   // cardTheme: "light",
  // },
];
