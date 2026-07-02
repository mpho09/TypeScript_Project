import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchItems } from '../data/items';
import type { Item } from '../data/types';
import { useAuth } from '../context/AuthContext';
import {
  formatDistanceKm, formatPrice, callNumberFor,
  formatMemberSince, formatRating,
} from '../utils/format';

export function ItemDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const { user } = useAuth();

  const [items, setItems] = useState<Item[] | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => { fetchItems().then(setItems); }, []);

  if (items == null) {
    return <div className="empty" style={{ marginTop: 60 }}>Fetching card…</div>;
  }

  const item = items.find(i => i.id === id);
  if (!item) {
    return <div className="empty" style={{ marginTop: 60 }}>Card not found. URL id: <code>{id}</code></div>;
  }

  const photos = item.photoUrls ?? [];
  const bookable = item.status === 'available';
  const stampLabel =
    item.status === 'available' ? 'Available' :
    item.status === 'paused'    ? 'On hold'    :
                                  'Withdrawn';

  return (
    <>
      <div style={{ marginTop: 24, marginBottom: 8 }}>
        <Link to="/" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, letterSpacing: 2 }}>← Back to catalog</Link>
      </div>

      <div className="detail">
        <div>
          {photos.length > 0 ? (
            <div className="photos">
              <img className="main" src={photos[active]} alt={item.title} style={{ filter: 'sepia(.12) contrast(.95)' }} />
              {photos.slice(0, 3).map((p, i) => (
                <img key={i} src={p} alt="" style={{ opacity: i === active ? 1 : .7, cursor: 'pointer', filter: 'sepia(.12) contrast(.95)' }} onClick={() => setActive(i)} />
              ))}
            </div>
          ) : (
            <div className="empty" style={{ minHeight: 240 }}>
              No photograph on file for this entry.
            </div>
          )}
        </div>

        <div className="slip">
          <div className="callno">CALL NO. {callNumberFor(item.id)}</div>
          <h1>{item.title}</h1>
          <div style={{ marginTop: 8 }}>
            <span className={'stamp ' + (bookable ? '' : 'muted')}>{stampLabel}</span>
          </div>

          <p className="desc">{item.description}</p>

          <dl>
            <dt>Category</dt><dd>{item.category}</dd>
            <dt>Distance</dt><dd>{formatDistanceKm(item.distanceKm)}</dd>
            <dt>Rate</dt><dd>{formatPrice(item.price)}</dd>
            <dt>Posted</dt><dd style={{ fontFamily: 'JetBrains Mono, monospace' }}>{item.postedISO}</dd>
          </dl>

          <div className="owner">
            <img src={item.owner.photoUrl} alt="" />
            <div>
              <div className="owner-name">{item.owner.name}</div>
              <div className="owner-sub">
                {item.owner.neighborhood} · Member since {formatMemberSince(item.owner.memberSince)} · {formatRating(item.owner.rating, item.owner.ratingsCount)}
              </div>
            </div>
          </div>

          <button
            className="btn"
            disabled={!bookable}
            onClick={() => nav(user ? `/book/${item.id}` : '/login', { state: { redirectTo: `/book/${item.id}` } })}
          >
            {bookable ? 'Book now' : (item.status === 'paused' ? 'On hold — check back' : 'Withdrawn')}
          </button>
          {!user && bookable && (
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--pencil)', marginTop: 10 }}>
              You'll need a library card to check items out.
            </div>
          )}
        </div>
      </div>
    </>
  );
}