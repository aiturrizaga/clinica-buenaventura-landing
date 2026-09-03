import type { Promotion } from './types';
import type { PromotionsRepository } from './repository';
import { DirectusPromotionsRepository } from './infrastructure/directus-promotions.repository';

const repository: PromotionsRepository = new DirectusPromotionsRepository();

export const getPromotions = (): Promise<Promotion[]> => repository.findAll();

export const getPromotionBySlug = (slug: string): Promise<Promotion | undefined> => repository.findBySlug(slug);
