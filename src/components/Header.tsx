import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FiMenu, FiSearch, FiX, FiDownload } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';
import { isMac } from '../lib';
import { cvFileName, cvUrl } from '../data/experience';

const links = [
  { to: '/work', label: 'Work' },
  { to: '/about', label: 'About' },
];

const Header: React.FC<{ onOpenPalette: () => void }> = ({ onOpenPalette }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const shortcut = isMac() ? '⌘K' : 'Ctrl K';

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <header className={`site-header${scrolled || menuOpen ? ' is-raised' : ''}`}>
      <div className="container">
        <div className="header-inner">
          <Link to="/" className="wordmark" aria-label="Mikias Abate — home">
            <span className="wordmark-mark" aria-hidden="true">MA</span>
            <span className="wordmark-name">Mikias Abate</span>
          </Link>

          <nav className="primary-nav" aria-label="Primary">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} className="nav-link">
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="header-actions">
            <button type="button" className="search-trigger" onClick={onOpenPalette} aria-label={`Search and navigate (${shortcut})`}>
              <FiSearch aria-hidden="true" />
              <span className="search-trigger-text">Search</span>
              <kbd>{shortcut}</kbd>
            </button>
            <ThemeToggle />
            <Link to="/contact" className="btn btn-primary btn-sm header-cta">Contact</Link>
            <button
              type="button"
              className="icon-btn menu-btn"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      <div id="mobile-menu" className={`mobile-menu${menuOpen ? ' is-open' : ''}`} hidden={!menuOpen}>
        <nav aria-label="Mobile">
          <NavLink to="/" end className="mobile-link">Home</NavLink>
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className="mobile-link">{l.label}</NavLink>
          ))}
          <NavLink to="/contact" className="mobile-link">Contact</NavLink>
          <a href={cvUrl} download={cvFileName} className="btn btn-secondary mobile-cv">
            <FiDownload aria-hidden="true" /> Download CV
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
