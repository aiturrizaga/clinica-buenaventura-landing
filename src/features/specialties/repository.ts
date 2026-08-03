import type { Specialty } from './types';

export interface SpecialtiesRepository {
    findAll(): Promise<Specialty[]>;
    findBySlug(slug: string): Promise<Specialty | undefined>;
}
