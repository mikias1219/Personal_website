import { useEffect, useState } from 'react';

/**
 * Returns the id of the section currently under the reading line (35% down the
 * viewport), for the active link in the header. Empty string above the first section.
 */
export function useActiveSection(ids: string[], enabled = true) {
  const [active, setActive] = useState('');
  const key = ids.join(',');

  useEffect(() => {
    if (!enabled) {
      setActive('');
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.35;
      const list = key.split(',');
      let current = '';
      for (const id of list) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      // At the very bottom, the last section is the one being read
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = list[list.length - 1];
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [key, enabled]);

  return active;
}
