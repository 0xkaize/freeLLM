import type {
  ModelAccess,
  ModelStatus,
  ModelTag,
  ModelType,
} from "@/data/models";

export const typeOptions: { value: ModelType; label: string }[] = [
  { value: "text", label: "Text" },
  { value: "image", label: "Image" },
  { value: "video", label: "Video" },
  { value: "audio", label: "Audio" },
  { value: "code", label: "Code" },
  { value: "embedding", label: "Embedding" },
];

export const accessOptions: { value: ModelAccess; label: string }[] = [
  { value: "free-forever", label: "Free forever" },
  { value: "free-tier", label: "Free tier (limited)" },
  { value: "signup-credits", label: "Signup credits" },
  { value: "open-source", label: "Open source" },
  { value: "no-card", label: "No card" },
  { value: "no-signup", label: "No signup" },
  { value: "card-required", label: "Card required" },
  { value: "phone-required", label: "Phone required" },
  { value: "data-training", label: "Data training" },
];

/** Requirement filter pills (for a future/restored filter UI).
 *  "No phone number" / "No data training" EXCLUDE models that carry those flags.
 *  "No signup" KEEPS models that carry `no-signup`. */
export const requirementFilterOptions: {
  mode: "exclude" | "require";
  flag: ModelAccess;
  label: string;
}[] = [
  { mode: "require", flag: "no-signup", label: "No signup" },
  { mode: "exclude", flag: "phone-required", label: "No phone number" },
  { mode: "exclude", flag: "data-training", label: "No data training" },
];

export const statusOptions: {
  value: ModelStatus;
  label: string;
  colorVar: string;
}[] = [
  { value: "operational", label: "Operational", colorVar: "var(--status-ok)" },
  { value: "degraded", label: "Degraded", colorVar: "var(--status-warn)" },
  { value: "partial", label: "Partial outage", colorVar: "var(--status-warn)" },
  { value: "major", label: "Major outage", colorVar: "var(--status-down)" },
];

export const tagOptions: { value: ModelTag; label: string }[] = [
  { value: "website", label: "Website" },
  { value: "collection", label: "Collection" },
];

export type SortKey = "name" | "newest";

export const sortOptions: { value: SortKey; label: string }[] = [
  { value: "name", label: "By name" },
  { value: "newest", label: "Newest first" },
];

export const accessLabels: Record<ModelAccess, string> = Object.fromEntries(
  accessOptions.map((o) => [o.value, o.label]),
) as Record<ModelAccess, string>;

export const tagLabels: Record<ModelTag, string> = Object.fromEntries(
  tagOptions.map((o) => [o.value, o.label]),
) as Record<ModelTag, string>;

export const statusLabels: Record<ModelStatus, string> = Object.fromEntries(
  statusOptions.map((o) => [o.value, o.label]),
) as Record<ModelStatus, string>;

export const statusColor: Record<ModelStatus, string> = Object.fromEntries(
  statusOptions.map((o) => [o.value, o.colorVar]),
) as Record<ModelStatus, string>;
