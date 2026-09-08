import type { LegalPage } from './types';

export interface LegalPagesRepository {
    findAllActive(): Promise<LegalPage[]>;
    findBySlug(slug: string): Promise<LegalPage | undefined>;
}
