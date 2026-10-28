import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FiDownload, FiMenu, FiX } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';
import SectionLink from './SectionLink';
import { sections } from '../lib';
import { site } from '../data/profile';
import { cvFileName, cvUrl } from '../data/experience';
import { useActiveSection } from '../hooks/useActiveSection';

const sectionIds = sections.map((s) => s.id);

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname, hash } = useLocation();
  const onHome = pathname === '/';
  const active = useActiveSection(sectionIds, onHome);
  const menuButton = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMenuOpen(false), [pathname, hash]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mobile menu: Escape closes and returns focus; Tab stays inside the panel
  useEffect(() => {
    if (!menuOpen) return;
    menuRef.current?.querySelector<HTMLElement>('a, button')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    document.body.classList.add('menu-open');
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.classList.remove('menu-open');
    };
  }, [menuOpen]);

  const linkProps = (id: string) => ({
    'aria-current': onHome && active === id ? ('location' as const) : undefined,
  });

  return (
    <header className={`site-header${scrolled || menuOpen ? ' is-raised' : ''}`}>
      <div className="container header-inner">
        <SectionLink to="" className="wordmark" aria-label={`${site.name} — home`}>
          <span className="wordmark-mark" aria-hidden="true">MA</span>
          <span className="wordmark-text">
            <span className="wordmark-name">{site.name}</span>
            <span className="wordmark-role">{site.role}</span>
          </span>
        </SectionLink>

        <nav className="primary-nav" aria-label="Primary">
          <ul>
            {sections.map((s) => (
              <li key={s.id}>
                <SectionLink to={s.id} className="nav-link" {...linkProps(s.id)}>{s.label}</SectionLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <ThemeToggle />
          <a href={cvUrl} download={cvFileName} className="btn btn-ghost btn-sm header-cv">
            <FiDownload aria-hidden="true" /> CV
          </a>
          <SectionLink to="contact" className="btn btn-primary btn-sm header-cta">Hire me</SectionLink>
          <button
            ref={menuButton}
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

      <div
        id="mobile-menu"
        ref={menuRef}
        className="mobile-menu"
        hidden={!menuOpen}
        onKeyDown={(e) => {
          if (e.key !== 'Tab') return;
          const items = Array.from(menuRef.current?.querySelectorAll<HTMLElement>('a, button') ?? []);
          const first = items[0];
          const last = items[items.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            menuButton.current?.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            menuButton.current?.focus();
          }
        }}
      >
        <nav aria-label="Mobile" className="container">
          <ul className="mobile-links">
            <li><SectionLink to="" className="mobile-link" onClick={() => setMenuOpen(false)}>Home</SectionLink></li>
            {sections.map((s) => (
              <li key={s.id}>
                <SectionLink to={s.id} className="mobile-link" onClick={() => setMenuOpen(false)} {...linkProps(s.id)}>
                  {s.label}
                </SectionLink>
              </li>
            ))}
          </ul>
          <div className="mobile-actions">
            <a href={cvUrl} download={cvFileName} className="btn btn-secondary">
              <FiDownload aria-hidden="true" /> Download CV
            </a>
            <SectionLink to="contact" className="btn btn-primary" onClick={() => setMenuOpen(false)}>Hire me</SectionLink>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
