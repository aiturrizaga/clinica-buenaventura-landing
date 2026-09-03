import type { LegalPage } from './types';

export interface LegalPagesRepository {
    findBySlug(slug: string): Promise<LegalPage | undefined>;
}
