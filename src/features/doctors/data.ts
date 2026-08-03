import type { Doctor } from './types';
import type { DoctorsRepository } from './repository';
import { DirectusDoctorsRepository } from './infrastructure/directus-doctors.repository';

// Composition root: único lugar del feature que sabe qué CMS está detrás del
// puerto DoctorsRepository. Para migrar a otro proveedor, se reemplaza esta
// instancia por un nuevo adaptador — el resto del código nunca importa
// Directus directamente.
const repository: DoctorsRepository = new DirectusDoctorsRepository();

export const getDoctors = (): Promise<Doctor[]> => repository.findAll();

export const getDoctorBySlug = (slug: string): Promise<Doctor | undefined> => repository.findBySlug(slug);

export const getFeaturedDoctors = async (): Promise<Doctor[]> => {
    const featured = (await getDoctors()).filter(d => d.featured);
    return featured.length % 2 !== 0 ? featured.slice(0, featured.length - 1) : featured;
};

// Compat: antes había que adivinar el slug de especialidad comparando nombres;
// ahora la relación viene resuelta desde Directus.
export const getSpecialtySlugFor = (doctor: Doctor): string | undefined => doctor.specialtySlug || undefined;
