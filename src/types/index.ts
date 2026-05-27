export interface Doctor {
    id: string;
    slug: string;
    name: string;
    title: 'Dr.' | 'Dra.';
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
}

export interface Schedule {
    day: string;
    startTime: string;
    endTime: string;
    location: string;
}

export interface Specialty {
    id: string;
    slug: string;
    name: string;
    shortDescription: string;
    fullDescription: string;
    icon: string;
    coverImage: string;
    procedures: string[];
    relatedDoctorIds: string[];
    featured: boolean;
    order: number;
}

export interface Promotion {
    id: string;
    title: string;
    description: string;
    image: string;
    discount?: string;
    validUntil: string;
    ctaText: string;
    ctaHref: string;
    tag?: string;
    accentColor: string;
    waMessage?: string;
}

export interface Testimonial {
    id: string;
    name: string;
    role: string;
    avatar: string;
    rating: number;
    comment: string;
    specialty?: string;
}

export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    coverImage: string;
    author: BlogAuthor;
    category: string;
    tags: string[];
    publishedAt: string;
    readingTime: number;
    featured: boolean;
}

export interface BlogAuthor {
    name: string;
    role: string;
    avatar: string;
}

export interface SEOProps {
    title: string;
    description: string;
    canonical?: string;
    ogImage?: string;
    ogType?: 'website' | 'article' | 'profile';
    noindex?: boolean;
    jsonLd?: object;
}

export interface NavItem {
    label: string;
    href: string;
    children?: NavItem[];
}

export interface ClubBenefit {
    icon: string;
    title: string;
    description: string;
}
