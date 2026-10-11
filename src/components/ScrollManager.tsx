import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/** Scrolls to the top (or to a #hash) on route change and moves focus to <main> for screen readers. */
const ScrollManager = () => {
  const { pathname, hash } = useLocation();
  const first = useRef(true);

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
      return;
    }
    window.scrollTo(0, 0);
    if (first.current) {
      first.current = false;
      return;
    }
    document.getElementById('main')?.focus({ preventScroll: true });
  }, [pathname, hash]);

  return null;
};

export default ScrollManager;
