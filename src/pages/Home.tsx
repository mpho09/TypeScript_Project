import { useMemo, useState } from 'react';
import { ITEMS as items } from '../data/items';
import { CatalogCard } from '../components/CatalogCard';
import { Filters, type FilterState } from '../components/Filters';

export function Home() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    maxDistanceMeters: 5000,
    cost: 'any',
  });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter(it => {
      if (q && !(`${it.title} ${it.description} ${it.callNumber}`.toLowerCase().includes(q))) return false;
      if (filters.categories.length && !filters.categories.includes(it.category)) return false;
      if (it.distanceMeters > filters.maxDistanceMeters) return false;
      if (filters.cost === 'free' && it.pricePerDay !== 0) return false;
      if (filters.cost === 'paid' && it.pricePerDay === 0) return false;
      return true;
    });
  }, [query, filters]);

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
            placeholder="Search by name, description, or call number…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <div className="spread" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--pencil)' }}>
          <span>{filtered.length} of {items.length} entries</span>
          <span>SORTED · NEAREST</span>
        </div>
      </div>

      <div className="controls">
        <div className="card-grid">
          {filtered.length === 0 ? (
            <div className="empty">No matching cards in this drawer.</div>
          ) : (
            [...filtered]
              .sort((a, b) => a.distanceMeters - b.distanceMeters)
              .map(it => <CatalogCard key={it.id} item={it} />)
          )}
        </div>
        <Filters value={filters} onChange={setFilters} />
      </div>
    </>
  );
}