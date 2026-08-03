export interface Doctor {
    id: string;
    slug: string;
    name: string;
    title: 'Dr.' | 'Dra.' | 'Lic.';
    specialty: string;
    specialtySlug: string;
    subspecialty?: string;
    cmp: string;
    bio: string;
    photo: string;
    education: string[];
    experience: number;
    featured: boolean;
    dates?: AvailabilityDate[];
    slots?: Record<string, string[]>;
}

export interface AvailabilityDate {
    iso: string;
    dow: string;
    day: string;
}
