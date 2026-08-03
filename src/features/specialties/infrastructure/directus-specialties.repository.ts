import { readItems } from '@directus/sdk';
import { directusClient } from '@lib/cms/directus-client';
import { directusAssetUrl } from '@lib/cms/directus-assets';
import type { SpecialtiesRepository } from '../repository';
import type { Specialty } from '../types';

interface DirectusSpecialty {
    id: number;
    slug: string;
    name: string;
    fontIcon: string;
    shortDescription: string;
    fullDescription: string;
    coverImage: string | null;
    procedures: string[] | null;
    featured: boolean;
    order: number;
    preferred: boolean | null;
    // Relación M2M — el nombre del subcampo depende de cómo se llame la
    // colección relacionada en la tabla puente ("doctors_id" es el default
    // de Directus cuando la colección relacionada es "doctors"). Ajustar
    // aquí si en el panel se renombró el campo de la tabla puente.
    relatedDoctors: { doctors_id: number }[] | null;
}

const FIELDS = [
    'id', 'slug', 'name', 'fontIcon', 'shortDescription', 'fullDescription', 'coverImage',
    'procedures', 'featured', 'order', 'preferred', 'relatedDoctors.doctors_id',
] as const;

function toSpecialty(raw: DirectusSpecialty): Specialty {
    return {
        id: String(raw.id),
        slug: raw.slug,
        name: raw.name,
        fontIcon: raw.fontIcon,
        shortDescription: raw.shortDescription,
        fullDescription: raw.fullDescription,
        coverImage: raw.coverImage ? directusAssetUrl(raw.coverImage, { width: 1200, height: 400, fit: 'cover' }) : '',
        procedures: raw.procedures ?? [],
        relatedDoctorIds: (raw.relatedDoctors ?? []).map(r => String(r.doctors_id)),
        featured: raw.featured,
        order: raw.order,
        preferred: raw.preferred ?? undefined,
    };
}

export class DirectusSpecialtiesRepository implements SpecialtiesRepository {
    async findAll(): Promise<Specialty[]> {
        const items = await directusClient.request(
            readItems('specialties', { fields: FIELDS as unknown as string[], limit: -1, sort: ['order'] }),
        );
        return (items as unknown as DirectusSpecialty[]).map(toSpecialty);
    }

    async findBySlug(slug: string): Promise<Specialty | undefined> {
        const items = await directusClient.request(
            readItems('specialties', {
                fields: FIELDS as unknown as string[],
                filter: { slug: { _eq: slug } },
                limit: 1,
            }),
        );
        const [raw] = items as unknown as DirectusSpecialty[];
        return raw ? toSpecialty(raw) : undefined;
    }
}
