import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// astro.config.mjs corre en Node puro (no a través de Vite/Astro's import.meta.env),
// por eso las env vars se cargan aquí explícitamente en vez de importar src/config/site.ts.
const { PUBLIC_SITE_URL } = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');

// Rutas sin valor de indexación (flujo transaccional /citas/* y páginas huérfanas
// sin enlaces internos) — @astrojs/sitemap no lee la meta noindex de cada página,
// así que se excluyen explícitamente aquí para que coincidan con SEOHead's noindex.
const NOINDEX_PATHS = [
  '/citas/identificacion',
  '/citas/registro',
  '/citas/paciente',
  '/citas/verificacion',
  '/citas/confirmacion',
  '/servicios',
];

export default defineConfig({
  site: PUBLIC_SITE_URL || 'https://clinicabuenaventura.com',
  integrations: [
    sitemap({
      filter: (page) => !NOINDEX_PATHS.some((path) => page.includes(path)),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  prefetch: true,
  image: {
    domains: ['images.unsplash.com', 'randomuser.me'],
  },
  // Astro 7 cambió el default a 'jsx' (colapsa espacios entre elementos inline).
  // Se fija explícito en true para preservar el espaciado visual existente.
  compressHTML: true,
});
