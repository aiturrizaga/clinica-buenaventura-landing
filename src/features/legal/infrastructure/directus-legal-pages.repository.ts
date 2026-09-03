import { readItems } from '@directus/sdk';
import { directusClient } from '@lib/cms/directus-client';
import type { LegalPagesRepository } from '../repository';
import type { LegalPage } from '../types';

export class DirectusLegalPagesRepository implements LegalPagesRepository {
    async findBySlug(slug: string): Promise<LegalPage | undefined> {
        const items = await directusClient.request(
            readItems('legal_pages', {
                fields: ['slug', 'title', 'content'],
                filter: { slug: { _eq: slug } },
                limit: 1,
            }),
        );
        return (items as LegalPage[])[0];
    }
}
