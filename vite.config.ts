import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { ServerResponse } from 'node:http';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

const SITE_URL = 'https://mikiasabatesite.vercel.app';

/** Loads .env keys into process.env for the dev-time chat API (e.g. GEMINI_API_KEY). */
function loadSecrets() {
  const envPath = resolve(process.cwd(), '.env');
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^\s*(?:export\s+)?([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !(m[1] in process.env)) {
      let v = m[2].trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
      process.env[m[1]] = v;
    }
  }
}

/** A request as api/ functions see it: method, url, headers and (for POST) the parsed JSON body. */
type ApiReq = {
  method?: string;
  url?: string;
  originalUrl?: string;
  headers: Record<string, string | string[] | undefined>;
  body?: unknown;
};

type VercelHandler = (req: ApiReq, res: ApiRes) => void | Promise<void>;

/** Minimal res.status().json() shim so api/ functions run unchanged on a plain Node response. */
type ApiRes = ServerResponse & {
  status: (code: number) => ApiRes;
  json: (body: unknown) => void;
};

/**
 * Serves /api/* from the `api/` functions in dev, matching Vercel's serverless
 * runtime: loads .env, mounts the handler at exactly /api/<name>, and only
 * forwards requests Vercel would route to a function.
 */
function vercelFunctions(): Plugin {
  return {
    name: 'vercel-functions',
    configureServer(server) {
      loadSecrets();
      server.middlewares.use('/api', async (reqRaw, resRaw, next) => {
        const req = reqRaw as unknown as ApiReq;
        const name = (req.url ?? '').split('?')[0].replace(/^\//, '').replace(/\/$/, '');
        const handlerPath = resolve(process.cwd(), 'api', `${name}.js`);
        if (!existsSync(handlerPath)) return next();

        const mod = (await import(`${handlerPath}?t=${Date.now()}`)) as {
          default: VercelHandler;
        };
        const handler = mod.default;
        if (typeof handler !== 'function') return next();

        // Buffer and JSON-parse the body once, like Vercel does for application/json
        if (req.method !== 'GET' && req.method !== 'HEAD') {
          const chunks: Buffer[] = [];
          for await (const chunk of reqRaw) chunks.push(chunk as Buffer);
          const contentType = String(req.headers['content-type'] ?? '');
          if (contentType.includes('json')) {
            try {
              req.body = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
            } catch {
              req.body = undefined;
            }
          }
        }

        req.url = `/${name}`;
        req.originalUrl = `/${name}`;
        const res = Object.assign(resRaw, {
          status(code: number) {
            resRaw.statusCode = code;
            return res;
          },
          json(body: unknown) {
            resRaw.setHeader('Content-Type', 'application/json');
            resRaw.end(resRaw.statusCode === 204 ? undefined : JSON.stringify(body));
          },
        }) as ApiRes;
        try {
          await handler(req, res);
        } catch (err) {
          server.config.logger.error(`api/${name}: ${err}`);
          if (!resRaw.writableEnded) {
            resRaw.statusCode = 500;
            res.json({ error: 'Server error' });
          }
        }
      });
    },
  };
}

/** Emits sitemap.xml at build time from the single-page route list. */
function sitemap(): Plugin {
  return {
    name: 'sitemap',
    apply: 'build',
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10);
      const paths = ['/'];
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
  plugins: [react(), sitemap(), preloadFonts(), vercelFunctions()],
});
