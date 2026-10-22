import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * On route change: jumps to the #hash section if there is one, otherwise to the top,
 * and moves focus to <main> so screen readers start at the new content.
 * In-page section links scroll themselves (see SectionLink), so this only handles navigation.
 */
const ScrollManager = () => {
  const { pathname, hash } = useLocation();
  const first = useRef(true);

  useEffect(() => {
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    if (target) {
      target.scrollIntoView({ behavior: 'instant', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
    if (first.current) {
      first.current = false;
      return;
    }
    document.getElementById('main')?.focus({ preventScroll: true });
  }, [pathname, hash]);

  return null;
};

export default ScrollManager;
