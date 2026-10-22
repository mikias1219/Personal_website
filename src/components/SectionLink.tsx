import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { scrollToSection } from '../lib';

type Props = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  /** Section id on the home page, or '' for the top of the page */
  to: string;
};

/** Link to a home-page section: smooth-scrolls when already on the home page, navigates there otherwise. */
const SectionLink: React.FC<Props> = ({ to, onClick, children, ...rest }) => {
  const { pathname, search } = useLocation();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || pathname !== '/' || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    if (!to) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      history.replaceState(history.state, '', `/${search}`);
      return;
    }
    if (scrollToSection(to)) {
      // Move focus for keyboard and screen-reader users without a second jump
      const el = document.getElementById(to);
      if (el) {
        if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
        el.focus({ preventScroll: true });
      }
    }
  };

  return (
    <Link to={{ pathname: '/', search: pathname === '/' ? search : '', hash: to ? `#${to}` : '' }} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
};

export default SectionLink;
