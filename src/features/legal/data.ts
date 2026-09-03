import type { LegalPage } from './types';
import type { LegalPagesRepository } from './repository';
import { DirectusLegalPagesRepository } from './infrastructure/directus-legal-pages.repository';

const repository: LegalPagesRepository = new DirectusLegalPagesRepository();

export const getLegalPageBySlug = (slug: string): Promise<LegalPage | undefined> => repository.findBySlug(slug);
