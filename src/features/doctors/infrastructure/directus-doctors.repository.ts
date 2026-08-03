import { readItems } from '@directus/sdk';
import { directusClient } from '@lib/cms/directus-client';
import { directusAssetUrl } from '@lib/cms/directus-assets';
import type { DoctorsRepository } from '../repository';
import type { Doctor } from '../types';

interface DirectusDoctor {
    id: number;
    slug: string;
    name: string;
    title: 'Dr.' | 'Dra.' | 'Lic.';
    specialty: { id: number; name: string; slug: string } | null;
    subspecialty: string | null;
    cmp: string;
    bio: string;
    photo: string | null;
    education: string[] | null;
    year_experience: number;
    featured: boolean;
}

const FIELDS = [
    'id', 'slug', 'name', 'title', 'subspecialty', 'cmp', 'bio', 'photo',
    'education', 'year_experience', 'featured',
    'specialty.id', 'specialty.name', 'specialty.slug',
] as const;

function toDoctor(raw: DirectusDoctor): Doctor {
    return {
        id: String(raw.id),
        slug: raw.slug,
        name: raw.name,
        title: raw.title,
        specialty: raw.specialty?.name ?? '',
        specialtySlug: raw.specialty?.slug ?? '',
        subspecialty: raw.subspecialty ?? undefined,
        cmp: raw.cmp,
        bio: raw.bio,
        photo: raw.photo ? directusAssetUrl(raw.photo, { width: 600, height: 750, fit: 'cover' }) : '',
        education: raw.education ?? [],
        experience: raw.year_experience,
        featured: raw.featured,
    };
}

export class DirectusDoctorsRepository implements DoctorsRepository {
    async findAll(): Promise<Doctor[]> {
        const items = await directusClient.request(
            readItems('doctors', { fields: FIELDS as unknown as string[], limit: -1 }),
        );
        return (items as unknown as DirectusDoctor[]).map(toDoctor);
    }

    async findBySlug(slug: string): Promise<Doctor | undefined> {
        const items = await directusClient.request(
            readItems('doctors', {
                fields: FIELDS as unknown as string[],
                filter: { slug: { _eq: slug } },
                limit: 1,
            }),
        );
        const [raw] = items as unknown as DirectusDoctor[];
        return raw ? toDoctor(raw) : undefined;
    }
}
