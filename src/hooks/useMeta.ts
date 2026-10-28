import { useEffect } from 'react';
import { site } from '../data/profile';

interface Meta {
  /** Page title without the site suffix; omit for the home page */
  title?: string;
  description?: string;
  path: string;
}

const setMeta = (selector: string, attr: 'content' | 'href', value: string) => {
  document.head.querySelector(selector)?.setAttribute(attr, value);
};

/** Updates the document title, description, canonical URL and social tags per route. */
export function useMeta({ title, description = site.statement, path }: Meta) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${site.name}` : `${site.name} — ${site.role}`;
    const url = `${site.url}${path}`;
    document.title = fullTitle;
    setMeta('meta[name="description"]', 'content', description);
    setMeta('link[rel="canonical"]', 'href', url);
    setMeta('meta[property="og:title"]', 'content', fullTitle);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:url"]', 'content', url);
    setMeta('meta[name="twitter:title"]', 'content', fullTitle);
    setMeta('meta[name="twitter:description"]', 'content', description);
  }, [title, description, path]);
}
