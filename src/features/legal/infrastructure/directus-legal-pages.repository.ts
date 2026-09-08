import { readItems } from '@directus/sdk';
import { directusClient } from '@lib/cms/directus-client';
import type { LegalPagesRepository } from '../repository';
import type { LegalPage } from '../types';

const FIELDS = ['slug', 'title', 'content'] as const;

export class DirectusLegalPagesRepository implements LegalPagesRepository {
    async findAllActive(): Promise<LegalPage[]> {
        const items = await directusClient.request(
            readItems('legal_pages', {
                fields: FIELDS as unknown as string[],
                filter: { archived: { _eq: false } },
                limit: -1,
            }),
        );
        return items as LegalPage[];
    }

    async findBySlug(slug: string): Promise<LegalPage | undefined> {
        const items = await directusClient.request(
            readItems('legal_pages', {
                fields: FIELDS as unknown as string[],
                filter: { slug: { _eq: slug }, archived: { _eq: false } },
                limit: 1,
            }),
        );
        return (items as LegalPage[])[0];
    }
}
