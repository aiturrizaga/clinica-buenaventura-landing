export interface Specialty {
    id: string;
    slug: string;
    name: string;
    fontIcon: string;
    shortDescription: string;
    fullDescription: string;
    coverImage: string;
    procedures: string[];
    relatedDoctorIds: string[];
    featured: boolean;
    order: number;
    preferred?: boolean;
}
