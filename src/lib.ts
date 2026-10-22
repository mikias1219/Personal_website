import { site } from './data/profile';

/** Shows a short message in the global toast region (see components/Toaster). */
export const toast = (message: string) =>
  window.dispatchEvent(new CustomEvent<string>('toast', { detail: message }));

export async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const el = document.createElement('textarea');
    el.value = text;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    el.remove();
  }
}

export async function copyEmail() {
  await copyText(site.email);
  toast(`Copied ${site.email}`);
}

export const isMac = () => /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

/** Home-page sections, in page order. Used by the header, mobile menu, footer and command palette. */
export const sections = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
] as const;

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Smooth-scrolls to a section on the current page and records it in the URL without a new history entry. */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
  history.replaceState(history.state, '', `${window.location.pathname}${window.location.search}#${id}`);
  return true;
}
