import { models, type Model } from "@/data/models";
import type { SortKey } from "@/lib/catalog";

export type Filters = {
  q: string;
  type: string[];
  access: string[];
  status: string[];
  provider: string[];
  tag: string[];
  sort: SortKey;
};

export const emptyFilters = (sort: SortKey = "name"): Filters => ({
  q: "",
  type: [],
  access: [],
  status: [],
  provider: [],
  tag: [],
  sort,
});

export function applyFilters(list: Model[], f: Filters): Model[] {
  const q = f.q.trim().toLowerCase();
  let out = list.filter((m) => {
    if (q && !`${m.id} ${m.provider}`.toLowerCase().includes(q)) return false;
    if (f.type.length && !f.type.some((t) => m.type.includes(t as never))) return false;
    if (f.access.length && !f.access.some((a) => m.access.includes(a as never)))
      return false;
    if (f.status.length && !f.status.includes(m.status)) return false;
    if (f.provider.length && !f.provider.includes(m.providerSlug)) return false;
    if (f.tag.length && !f.tag.some((t) => m.tags.includes(t as never))) return false;
    return true;
  });

  out = [...out].sort((a, b) => {
    if (f.sort === "newest") return b.addedAt.localeCompare(a.addedAt);
    return a.id.localeCompare(b.id);
  });

  return out;
}

export function countActiveFilters(f: Filters): number {
  return (
    f.type.length +
    f.access.length +
    f.status.length +
    f.provider.length +
    f.tag.length
  );
}

export function availableFilterOptions(list: Model[] = models) {
  const types = new Set<string>();
  const access = new Set<string>();
  const status = new Set<string>();
  const tags = new Set<string>();
  const providers = new Map<string, { name: string; count: number }>();

  for (const m of list) {
    for (const t of m.type) types.add(t);
    for (const a of m.access) access.add(a);
    status.add(m.status);
    for (const t of m.tags) tags.add(t);
    const existing = providers.get(m.providerSlug);
    if (existing) existing.count += 1;
    else providers.set(m.providerSlug, { name: m.provider, count: 1 });
  }

  return {
    types: [...types].sort(),
    access: [...access].sort(),
    status: [...status].sort(),
    tags: [...tags].sort(),
    providers: [...providers.entries()]
      .map(([slug, v]) => ({ slug, name: v.name, count: v.count }))
      .sort((a, b) => a.name.localeCompare(b.name)),
  };
}

export function uniqueProviders(): { slug: string; name: string; count: number }[] {
  return availableFilterOptions().providers;
}
