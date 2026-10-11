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
