import type { Specialty } from './types';
import type { SpecialtiesRepository } from './repository';
import { DirectusSpecialtiesRepository } from './infrastructure/directus-specialties.repository';

const repository: SpecialtiesRepository = new DirectusSpecialtiesRepository();

export const getSpecialties = (): Promise<Specialty[]> => repository.findAll();

export const getSpecialtyBySlug = (slug: string): Promise<Specialty | undefined> => repository.findBySlug(slug);

export const getFeaturedSpecialties = async (): Promise<Specialty[]> => {
    const specialtiesList = (await getSpecialties())
        .filter(s => s.preferred)
        .sort((a, b) => a.order - b.order);

    return specialtiesList.length % 2 === 0
        ? specialtiesList
        : specialtiesList.slice(0, -1);
};
