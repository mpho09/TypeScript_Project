export type Category = 'power-tools' | 'hand-tools' | 'outdoor' | 'garden' | 'kitchen' | 'party';

export interface FilterState {
  categories: Category[];
  maxDistanceKm: number;   // 999 = "any distance", also includes unknown
  cost: 'any' | 'free' | 'paid';
}

const CATEGORIES: Category[] = ['power-tools', 'hand-tools', 'outdoor', 'garden', 'kitchen', 'party'];

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
          min={1}
          max={20}
          step={1}
          value={value.maxDistanceKm}
          onChange={(e) => onChange({ ...value, maxDistanceKm: Number(e.target.value) })}
        />
        <div className="range-val">
          Within {value.maxDistanceKm} km {value.maxDistanceKm >= 20 && '(any)'}
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