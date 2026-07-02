import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../pages/context/AuthContext';

export function Header() {
  const { user, logout } = useAuth();
  return (
    <header className="sign">
      <div className="container sign-inner">
        <div>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="sign-brand">The Neighborhood Ledger</div>
          </Link>
          <div className="sign-est">EST. 2026 · DIST. 04 · MEMBERS ONLY FOR CHECKOUT</div>
        </div>
        <nav className="sign-nav">
          <NavLink to="/">Catalog</NavLink>
          {user ? (
            <>
              <span title={user.cardNumber} style={{ opacity: .7 }}>
                {user.name} · <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>{user.cardNumber}</span>
              </span>
              <a href="#logout" onClick={(e) => { e.preventDefault(); logout(); }}>Sign out</a>
            </>
          ) : (
            <NavLink to="/login">Get a card</NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}