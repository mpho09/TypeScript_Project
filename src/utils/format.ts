export function formatDistanceKm(km: number | null): string {
  if (km == null) return 'Distance unknown';
  if (km < 1) return `${Math.round(km * 1000)} m`;
  return `${km.toFixed(1)} km`;
}

export function formatPrice(price: { amountCents: number; period: string } | null): string {
  if (price == null) return 'Ask owner';
  if (price.amountCents === 0) return 'FREE';
  return `R${(price.amountCents / 100).toFixed(0)}/${price.period}`;
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  if (isNaN(+d)) return '—';
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase();
}

export function formatMemberSince(iso: string): string {
  const d = new Date(iso);
  if (isNaN(+d)) return '—';
  return d.toLocaleDateString(undefined, { month: 'short', year: 'numeric' }).toUpperCase();
}

export function formatRating(rating: number | null, count: number): string {
  if (rating == null || count === 0) return 'New member · no ratings';
  return `★ ${rating.toFixed(1)} · ${count} rating${count === 1 ? '' : 's'}`;
}

// Derive a catalog "call number" from the id: itm_001 → LDG-001
export function callNumberFor(id: string): string {
  const suffix = id.replace(/[^0-9]/g, '').padStart(3, '0');
  return `LDG-${suffix || id.slice(-3).toUpperCase()}`;
}