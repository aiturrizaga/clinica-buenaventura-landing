import { readItems } from '@directus/sdk';
import { directusClient } from '@lib/cms/directus-client';
import { directusAssetUrl } from '@lib/cms/directus-assets';
import type { PopupPromosRepository } from '../repository';
import type { PopupPromo } from '../types';

interface DirectusPopupPromo {
    id: number;
    image: string;
    alt: string;
    waMessage: string | null;
}

function toPopupPromo(raw: DirectusPopupPromo): PopupPromo {
    return {
        id: String(raw.id),
        // Solo ancho: el <img> se muestra con h-auto (mantiene su propia
        // proporción), así que forzar un alto fijo con fit:"contain" solo
        // generaba barras negras cuando la imagen no era exactamente 4:3.
        image: directusAssetUrl(raw.image, { width: 1200, quality: 85 }),
        alt: raw.alt,
        waMessage: raw.waMessage ?? undefined,
    };
}

export class DirectusPopupPromosRepository implements PopupPromosRepository {
    async findActive(): Promise<PopupPromo[]> {
        const items = await directusClient.request(
            readItems('popup_promos', {
                fields: ['id', 'image', 'alt', 'waMessage'],
                filter: { archived: { _eq: false } },
                sort: ['sort'],
                limit: -1,
            }),
        );
        return (items as unknown as DirectusPopupPromo[]).map(toPopupPromo);
    }
}
