import { createDirectus, rest, staticToken } from '@directus/sdk';

// Cliente compartido por todos los adaptadores Directus. Se usa solo en
// build-time (getStaticPaths / frontmatter de páginas Astro), nunca en el
// cliente — por eso las env vars no llevan el prefijo PUBLIC_.
const DIRECTUS_URL = import.meta.env.DIRECTUS_URL;
const DIRECTUS_TOKEN = import.meta.env.DIRECTUS_TOKEN;

if (!DIRECTUS_URL) {
    throw new Error('Falta la variable de entorno DIRECTUS_URL.');
}

export const directusUrl = DIRECTUS_URL;

export const directusClient = createDirectus(DIRECTUS_URL)
    .with(staticToken(DIRECTUS_TOKEN))
    .with(rest());
