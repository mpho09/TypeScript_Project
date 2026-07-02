import { Link } from 'react-router-dom';
import type { Item } from '../data/types';
import { formatDistanceKm, formatPrice, callNumberFor } from '../utils/format';

export function CatalogCard({ item }: { item: Item }) {
  const cover = item.photoUrls[0];
  const stampLabel =
    item.status === 'available' ? 'Available' :
    item.status === 'paused'    ? 'On hold'    :
                                  'Withdrawn';

  return (
    <Link to={`/item/${item.id}`} className="card">
      <span className="card-tab">{item.category}</span>
      <div className="card-callno">CALL NO. {callNumberFor(item.id)}</div>
      <div className="card-title">{item.title}</div>

      {cover ? (
        <div style={{ border: '1.5px solid var(--ink)', marginBottom: 8, aspectRatio: '3/2', overflow: 'hidden' }}>
          <img src={cover} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'sepia(.12) contrast(.95)' }} />
        </div>
      ) : (
        <div className="card-rules" style={{ fontStyle: 'italic' }}>
          No photograph on file. Description follows.
        </div>
      )}

      <div className="card-rules">
        {item.description.slice(0, 90)}{item.description.length > 90 ? '…' : ''}
      </div>

      <div className="card-meta">
        <span>{formatDistanceKm(item.distanceKm)}</span>
        <span>{formatPrice(item.price)}</span>
      </div>

      <div style={{ position: 'absolute', top: 12, left: 12 }}>
        <span className={'stamp ' + (item.status === 'available' ? '' : 'muted')}>
          {stampLabel}
        </span>
      </div>
      <span className="card-hole" />
    </Link>
  );
}