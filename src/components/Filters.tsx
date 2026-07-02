import type { Category } from '../data/types';

export interface FilterState {
  categories: Category[];
  maxDistanceMeters: number;
  cost: 'any' | 'free' | 'paid';
}

const CATEGORIES = ['tools', 'kitchen', 'outdoors', 'books', 'kids', 'electronics', 'other'] as Category[];

export function Filters({ value, onChange }: { value: FilterState; onChange: (v: FilterState) => void; }) {
  const toggleCat = (c: Category) => {
    const has = value.categories.includes(c);
    onChange({ ...value, categories: has ? value.categories.filter(x => x !== c) : [...value.categories, c] });
  };

  return (
    <aside className="drawer">
      <div className="drawer-title">Drawer 04 — Sort & Filter</div>

      <fieldset>
        <legend>Category</legend>
        <div className="chip-row">
          {CATEGORIES.map(c => (
            <button
              key={c}
              type="button"
              className={'chip ' + (value.categories.includes(c) ? 'active' : '')}
              onClick={() => toggleCat(c)}
            >{c}</button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend>Max distance</legend>
        <input
          className="range"
          type="range"
          min={100}
          max={5000}
          step={100}
          value={value.maxDistanceMeters}
          onChange={(e) => onChange({ ...value, maxDistanceMeters: Number(e.target.value) })}
        />
        <div className="range-val">
          Within {value.maxDistanceMeters < 1000 ? `${value.maxDistanceMeters} m` : `${(value.maxDistanceMeters / 1000).toFixed(1)} km`}
        </div>
      </fieldset>

      <fieldset>
        <legend>Cost</legend>
        <div className="chip-row">
          {(['any','free','paid'] as const).map(k => (
            <button
              key={k}
              type="button"
              className={'chip ' + (value.cost === k ? 'active' : '')}
              onClick={() => onChange({ ...value, cost: k })}
            >{k}</button>
          ))}
        </div>
      </fieldset>
    </aside>
  );
}