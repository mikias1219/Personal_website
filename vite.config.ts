import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { projects } from './src/data/projects';

const SITE_URL = 'https://mikiasabatesite.vercel.app';

/** Emits sitemap.xml at build time from the route list and project slugs. */
function sitemap(): Plugin {
  return {
    name: 'sitemap',
    apply: 'build',
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10);
      const paths = ['/', '/work', ...projects.map((p) => `/work/${p.slug}`)];
      const urls = paths
        .map((p) => `  <url><loc>${SITE_URL}${p}</loc><lastmod>${today}</lastmod></url>`)
        .join('\n');
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      });
    },
  };
}

/** Preloads the Latin Geist fonts (hashed at build time) so text doesn't reflow when they arrive. */
function preloadFonts(): Plugin {
  return {
    name: 'preload-fonts',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(_html, ctx) {
        const files = Object.keys(ctx.bundle ?? {}).filter((f) =>
          /geist(-mono)?-latin-wght-normal-[\w-]+\.woff2$/.test(f)
        );
        return files.map((file) => ({
          tag: 'link',
          attrs: { rel: 'preload', href: `/${file}`, as: 'font', type: 'font/woff2', crossorigin: '' },
          injectTo: 'head' as const,
        }));
      },
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), sitemap(), preloadFonts()],
});
