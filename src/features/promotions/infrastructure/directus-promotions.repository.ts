import { readItems } from '@directus/sdk';
import { directusClient } from '@lib/cms/directus-client';
import { directusAssetUrl } from '@lib/cms/directus-assets';
import type { PromotionsRepository } from '../repository';
import type { Promotion } from '../types';

interface DirectusPromotion {
    id: number;
    slug: string;
    title: string;
    description: string;
    image: string | null;
    discount: string | null;
    valid_until: string;
    ctaText: string;
    ctaHref: string;
    tag: string | null;
    accentColor: string;
    waMessage: string | null;
    highlights: { icon: string; text: string }[] | null;
    detailImportant: string;
    detailLegal: string;
    detailTermsUrl: string;
}

const FIELDS = [
    'id', 'slug', 'title', 'description', 'image', 'discount', 'valid_until',
    'ctaText', 'ctaHref', 'tag', 'accentColor', 'waMessage', 'highlights',
    'detailImportant', 'detailLegal', 'detailTermsUrl',
] as const;

function toPromotion(raw: DirectusPromotion): Promotion {
    return {
        id: String(raw.id),
        slug: raw.slug,
        title: raw.title,
        description: raw.description,
        // 1600x900 (16:9): la misma URL se usa tanto en las tarjetas pequeñas
        // del carrusel/listado como en el hero a ancho completo (~1280px) de
        // la página de detalle — con 800px de origen ese segundo caso se veía
        // pixelado por upscaling. El navegador reescala hacia abajo sin
        // pérdida, así que este tamaño cubre ambos casos con nitidez.
        image: raw.image ? directusAssetUrl(raw.image, { width: 1600, height: 900, fit: 'cover', quality: 85 }) : '',
        discount: raw.discount ?? undefined,
        validUntil: raw.valid_until,
        ctaText: raw.ctaText,
        ctaHref: raw.ctaHref,
        tag: raw.tag ?? undefined,
        accentColor: raw.accentColor,
        waMessage: raw.waMessage ?? undefined,
        detail: {
            highlights: raw.highlights ?? [],
            important: raw.detailImportant,
            legal: raw.detailLegal,
            termsUrl: raw.detailTermsUrl,
        },
    };
}

export class DirectusPromotionsRepository implements PromotionsRepository {
    async findAll(): Promise<Promotion[]> {
        const items = await directusClient.request(
            readItems('promotions', { fields: FIELDS as unknown as string[], limit: -1, sort: ['sort'] }),
        );
        return (items as unknown as DirectusPromotion[]).map(toPromotion);
    }

    async findBySlug(slug: string): Promise<Promotion | undefined> {
        const items = await directusClient.request(
            readItems('promotions', {
                fields: FIELDS as unknown as string[],
                filter: { slug: { _eq: slug } },
                limit: 1,
            }),
        );
        const [raw] = items as unknown as DirectusPromotion[];
        return raw ? toPromotion(raw) : undefined;
    }
}
