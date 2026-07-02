import { Link } from 'react-router-dom';
import type { Item } from '../data/types';
import { formatDistance, formatPrice } from '../utils/format';

export function CatalogCard({ item }: { item: Item }) {
  return (
    <Link to={`/item/${item.id}`} className="card">
      <span className="card-tab">{item.category}</span>
      <div className="card-callno">CALL NO. {item.callNumber}</div>
      <div className="card-title">{item.title}</div>
      <div className="card-rules">{item.description.slice(0, 96)}{item.description.length > 96 ? '…' : ''}</div>
      <div className="card-meta">
        <span>{formatDistance(item.distanceMeters)}</span>
        <span>{formatPrice(item.pricePerDay)}</span>
      </div>
      <div style={{ position: 'absolute', top: 12, left: 12 }}>
        <span className={'stamp ' + (item.available ? '' : 'muted')}>
          {item.available ? 'Available' : 'Checked out'}
        </span>
      </div>
      <span className="card-hole" />
    </Link>
  );
}