import type { Promotion } from './types';

export interface PromotionsRepository {
    findAll(): Promise<Promotion[]>;
    findBySlug(slug: string): Promise<Promotion | undefined>;
}
