import { useEffect, useMemo, useState } from 'react';
import { fetchItems } from '../data/items';
import type { Item } from '../data/types';
import { CatalogCard } from '../components/CatalogCard';
import { Filters, type FilterState } from '../components/Filters';

export function Home() {
  const [items, setItems] = useState<Item[] | null>(null);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    maxDistanceKm: 20,
    cost: 'any',
  });

  useEffect(() => {
    fetchItems().then(setItems);
  }, []);

  const listable = useMemo(
    () => (items ?? []).filter(i => i.status !== 'removed'),
    [items]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return listable.filter(it => {
      if (q && !(`${it.title} ${it.description}`.toLowerCase().includes(q))) return false;
      if (filters.categories.length && !filters.categories.includes(it.category as any)) return false;
      // distance: unknown distance passes only when the slider is at max ("any")
      if (it.distanceKm == null) {
        if (filters.maxDistanceKm < 20) return false;
      } else if (it.distanceKm > filters.maxDistanceKm) {
        return false;
      }
      // cost: null price is neither free nor paid — treat as "ask", show only under "any"
      if (filters.cost === 'free' && !(it.price && it.price.amountCents === 0)) return false;
      if (filters.cost === 'paid' && !(it.price && it.price.amountCents > 0)) return false;
      return true;
    });
  }, [query, filters, listable]);

  const sorted = useMemo(
    () => [...filtered].sort((a, b) => {
      // items with a distance come first, sorted ascending; nulls last
      if (a.distanceKm == null && b.distanceKm == null) return 0;
      if (a.distanceKm == null) return 1;
      if (b.distanceKm == null) return -1;
      return a.distanceKm - b.distanceKm;
    }),
    [filtered]
  );

  return (
    <>
      <div style={{ marginTop: 32 }}>
        <div className="section-eyebrow">Aisle 01 · Nearby to you</div>
        <h1 className="section-title">Things the block is willing to lend</h1>
      </div>

      <div className="controls">
        <label className="search">
          <span className="search-label">Find</span>
          <input
            placeholder="Search by name or description…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <div className="spread" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--pencil)' }}>
          <span>
            {items == null ? 'Loading catalog…' : `${sorted.length} of ${listable.length} entries`}
          </span>
          <span>SORTED · NEAREST</span>
        </div>
      </div>

      <div className="controls">
        <div className="card-grid">
          {items == null ? (
            <div className="empty">Fetching catalog cards…</div>
          ) : sorted.length === 0 ? (
            <div className="empty">No matching cards in this drawer.</div>
          ) : (
            sorted.map(it => <CatalogCard key={it.id} item={it} />)
          )}
        </div>
        <Filters value={filters} onChange={setFilters} />
      </div>
    </>
  );
}