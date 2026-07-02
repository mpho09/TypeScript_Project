import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ITEMS } from '../data/items';
import { useAuth } from './context/AuthContext';
import { formatDistance, formatPrice } from '../utils/format';

export function ItemDetail() {
  const { id } = useParams();
  const item = ITEMS.find(i => i.id === id);
  const nav = useNavigate();
  const { user } = useAuth();
  const [active, setActive] = useState(0);

  if (!item) return <div className="empty" style={{ marginTop: 60 }}>Card not found in the catalog.</div>;

  const photos = item.photos;

  return (
    <>
      <div style={{ marginTop: 24, marginBottom: 8 }}>
        <Link to="/" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, letterSpacing: 2 }}>← Back to catalog</Link>
      </div>

      <div className="detail">
        <div>
          <div className="photos">
            <img className="main" src={photos[active]} alt={item.title} />
            {photos.slice(0, 3).map((p, i) => (
              <img key={i} src={p} alt="" style={{ opacity: i === active ? 1 : .7, cursor: 'pointer' }} onClick={() => setActive(i)} />
            ))}
          </div>
        </div>

        <div className="slip">
          <div className="callno">CALL NO. {item.callNumber}</div>
          <h1>{item.title}</h1>
          <div style={{ marginTop: 8 }}>
            <span className={'stamp ' + (item.available ? '' : 'muted')}>
              {item.available ? 'Available' : 'Checked out'}
            </span>
          </div>

          <p className="desc">{item.description}</p>

          <dl>
            <dt>Category</dt><dd>{item.category}</dd>
            <dt>Distance</dt><dd>{formatDistance(item.distanceMeters)}</dd>
            <dt>Rate</dt><dd>{formatPrice(item.pricePerDay)}</dd>
            <dt>Condition</dt><dd>{item.condition}</dd>
          </dl>

          <div className="owner">
            <img src={item.owner.photoUrl} alt="" />
            <div>
              <div className="owner-name">{item.owner.name}</div>
              <div className="owner-sub">
                {item.owner.neighborhood} · Member since {item.owner.memberSince} · {item.owner.ratingsCount} ratings
              </div>
            </div>
          </div>

          <button
            className="btn"
            disabled={!item.available}
            onClick={() => nav(user ? `/book/${item.id}` : '/login', { state: { redirectTo: `/book/${item.id}` } })}
          >
            {item.available ? 'Book now' : 'Unavailable'}
          </button>
          {!user && item.available && (
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--pencil)', marginTop: 10 }}>
              You'll need a library card to check items out.
            </div>
          )}
        </div>
      </div>
    </>
  );
}