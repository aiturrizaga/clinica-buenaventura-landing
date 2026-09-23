import { readItems } from '@directus/sdk';
import { directusClient } from '@lib/cms/directus-client';
import { directusAssetUrl } from '@lib/cms/directus-assets';
import type { SpecialtiesRepository } from '../repository';
import type { Specialty, SpecialtyDetail } from '../types';

interface DirectusSpecialty {
    id: number;
    slug: string;
    name: string;
    fontIcon: string;
    shortDescription: string;
    fullDescription: string;
    coverImage: string | null;
    featured: boolean;
    order: number;
    preferred: boolean | null;
    hasDetail: boolean | null;
    symptomsTitle: string | null;
    symptoms: string | null;
    conditionsTitle: string | null;
    conditions: { title: string; description: string }[] | null;
    proceduresTitle: string | null;
    procedureGroups: { title?: string | null; items?: string | null }[] | null;
    benefitsIntro: string | null;
    benefits: string | null;
    staff: string | null;
    calloutTitle: string | null;
    calloutText: string | null;
    calloutButtonLabel: string | null;
    calloutSpecialty: { slug: string } | null;
}

const FIELDS = [
    'id', 'slug', 'name', 'fontIcon', 'shortDescription', 'fullDescription', 'coverImage',
    'featured', 'order', 'preferred', 'hasDetail',
    'symptomsTitle', 'symptoms', 'conditionsTitle', 'conditions',
    'proceduresTitle', 'procedureGroups', 'benefitsIntro', 'benefits', 'staff',
    'calloutTitle', 'calloutText', 'calloutButtonLabel', 'calloutSpecialty.slug',
] as const;

// En Directus las listas simples se editan como un textarea, una por línea.
const toLines = (value: string | null | undefined): string[] =>
    (value ?? '').split(/\r?\n/).map(line => line.trim()).filter(Boolean);

// Ignora un emoji al inicio de la línea (ej. "🥗 Cansancio" -> "Cansancio"),
// para poder pegar el texto tal como viene en los documentos de contenido.
const LEADING_EMOJI = /^(?:\p{Extended_Pictographic}(?:️|‍\p{Extended_Pictographic})*)\s*/u;

const toSymptom = (line: string): string => line.replace(LEADING_EMOJI, '');

function toDetail(raw: DirectusSpecialty): SpecialtyDetail {
    const callout = raw.calloutTitle && raw.calloutSpecialty?.slug
        ? {
            title: raw.calloutTitle,
            text: raw.calloutText ?? '',
            buttonLabel: raw.calloutButtonLabel ?? 'Ver detalle',
            specialtySlug: raw.calloutSpecialty.slug,
        }
        : undefined;

    return {
        symptomsTitle: raw.symptomsTitle ?? '¿Presentas alguno de estos síntomas?',
        symptoms: toLines(raw.symptoms).map(toSymptom),
        conditionsTitle: raw.conditionsTitle ?? 'Enfermedades que tratamos',
        conditions: raw.conditions ?? [],
        proceduresTitle: raw.proceduresTitle ?? 'Exámenes y procedimientos',
        procedureGroups: (raw.procedureGroups ?? [])
            .map(group => ({ title: group.title?.trim() || undefined, items: toLines(group.items) }))
            .filter(group => group.items.length > 0),
        benefitsIntro: raw.benefitsIntro ?? undefined,
        benefits: toLines(raw.benefits),
        staff: toLines(raw.staff),
        callout,
    };
}

function toSpecialty(raw: DirectusSpecialty): Specialty {
    const hasDetail = raw.hasDetail === true;
    return {
        id: String(raw.id),
        slug: raw.slug,
        name: raw.name,
        fontIcon: raw.fontIcon,
        shortDescription: raw.shortDescription,
        fullDescription: raw.fullDescription,
        coverImage: raw.coverImage ? directusAssetUrl(raw.coverImage, { width: 1200, height: 400, fit: 'cover' }) : '',
        featured: raw.featured,
        order: raw.order,
        preferred: raw.preferred ?? undefined,
        hasDetail,
        detail: hasDetail ? toDetail(raw) : undefined,
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
