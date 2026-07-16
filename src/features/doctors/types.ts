export interface Doctor {
    id: string;
    slug: string;
    name: string;
    title: 'Dr.' | 'Dra.' | 'Lic.';
    specialty: string;
    subspecialty?: string;
    cmp: string;
    bio: string;
    photo: string;
    schedule: Schedule[];
    education: string[];
    languages: string[];
    experience: number;
    rating: number;
    reviewCount: number;
    featured: boolean;
    dates?: AvailabilityDate[];
    slots?: Record<string, string[]>;
}

export interface Schedule {
    day: string;
    startTime: string;
    endTime: string;
    location: string;
}

export interface AvailabilityDate {
    iso: string;
    dow: string;
    day: string;
}
