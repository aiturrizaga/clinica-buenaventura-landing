import { directusUrl } from './directus-client';

export interface AssetTransform {
    width?: number;
    height?: number;
    fit?: 'cover' | 'contain' | 'inside' | 'outside';
    format?: 'webp' | 'jpg' | 'png' | 'avif';
    quality?: number;
}

// Construye la URL pública de un archivo subido a Directus, con transformaciones
// on-the-fly opcionales (Directus las genera bajo demanda vía query params).
export function directusAssetUrl(fileId: string, transform?: AssetTransform): string {
    const url = new URL(`/assets/${fileId}`, directusUrl);

    if (transform?.width) url.searchParams.set('width', String(transform.width));
    if (transform?.height) url.searchParams.set('height', String(transform.height));
    if (transform?.fit) url.searchParams.set('fit', transform.fit);
    if (transform?.format) url.searchParams.set('format', transform.format);
    if (transform?.quality) url.searchParams.set('quality', String(transform.quality));

    return url.toString();
}
