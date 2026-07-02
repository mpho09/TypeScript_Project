import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchItems } from '../data/items';
import type { Item } from '../data/types';
import { useAuth } from '../context/AuthContext';
import { formatDate, formatPrice, callNumberFor } from '../utils/format';

function today() { return new Date().toISOString().slice(0, 10); }
function plusDays(iso: string, n: number) {
  const d = new Date(iso); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10);
}
function daysBetween(a: string, b: string) {
  return Math.max(1, Math.round((+new Date(b) - +new Date(a)) / 86400000));
}

export function Booking() {
  const { id } = useParams();
  const { user } = useAuth();
  const nav = useNavigate();

  const [items, setItems] = useState<Item[] | null>(null);
  const [start, setStart] = useState(today());
  const [end, setEnd] = useState(plusDays(today(), 2));
  const [confirmed, setConfirmed] = useState<null | { code: string }>(null);

  useEffect(() => { fetchItems().then(setItems); }, []);

  const item = items?.find(i => i.id === id);

  const days = useMemo(() => daysBetween(start, end), [start, end]);
  const totalCents = item && item.price ? days * item.price.amountCents : 0;

  if (items == null) return <div className="empty" style={{ marginTop: 60 }}>Fetching card…</div>;
  if (!item) return <div className="empty" style={{ marginTop: 60 }}>Card not found.</div>;
  if (item.status !== 'available') {
    return (
      <div className="form-page">
        <div className="form">
          <div className="subline">Cannot check out</div>
          <h1>This item isn't available.</h1>
          <p>Status: <b>{item.status}</b>. Return to the catalog and pick another.</p>
          <Link to="/" className="btn secondary">Back to catalog</Link>
        </div>
      </div>
    );
  }

  if (confirmed) {
    return (
      <div className="form-page">
        <div className="form">
          <div className="subline">Checkout slip · #{confirmed.code}</div>
          <h1>Stamped and filed.</h1>
          <p>You've reserved <b>{item.title}</b>.</p>
          <div className="summary">
            <div className="summary-row"><span>Pickup</span><span>{formatDate(start)}</span></div>
            <div className="summary-row"><span>Return by</span><span>{formatDate(end)}</span></div>
            <div className="summary-row"><span>Owner</span><span>{item.owner.name}</span></div>
            <div className="summary-row summary-total">
              <span>Total</span>
              <span>
                {item.price == null
                  ? 'Ask owner'
                  : item.price.amountCents === 0
                    ? 'FREE'
                    : `R${(totalCents / 100).toFixed(0)}`}
              </span>
            </div>
          </div>
          <div style={{ marginTop: 20 }}>
            <Link to="/" className="btn secondary">Back to catalog</Link>
          </div>
        </div>
      </div>
    );
  }

  const submit = () => {
    const code = 'CKT-' + Math.random().toString(36).slice(2, 7).toUpperCase();
    setConfirmed({ code });
  };

  return (
    <div className="form-page">
      <div className="form">
        <div className="subline">Checkout · {callNumberFor(item.id)}</div>
        <h1>{item.title}</h1>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--pencil)' }}>
          Member {user!.name} · {user!.cardNumber}
        </div>

        <hr className="divider" />

        <div className="field">
          <label>Pickup date</label>
          <input type="date" value={start} min={today()} onChange={(e) => setStart(e.target.value)} />
        </div>
        <div className="field">
          <label>Return date</label>
          <input type="date" value={end} min={start} onChange={(e) => setEnd(e.target.value)} />
        </div>

        <div className="summary">
          <div className="summary-row"><span>Rate</span><span>{formatPrice(item.price)}</span></div>
          <div className="summary-row"><span>Days</span><span>{days}</span></div>
          <div className="summary-row summary-total">
            <span>Total</span>
            <span>
              {item.price == null
                ? 'Ask owner'
                : item.price.amountCents === 0
                  ? 'FREE'
                  : `R${(totalCents / 100).toFixed(0)}`}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
          <button className="btn secondary" onClick={() => nav(-1)}>Cancel</button>
          <button className="btn" onClick={submit}>Confirm checkout</button>
        </div>
      </div>
    </div>
  );
}