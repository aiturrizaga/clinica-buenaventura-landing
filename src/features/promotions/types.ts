export interface Promotion {
    id: string;
    title: string;
    description: string;
    image: string;
    slug: string;
    discount?: string;
    validUntil: string;
    ctaText: string;
    ctaHref: string;
    tag?: string;
    accentColor: string;
    waMessage?: string;
    detail: {
        highlights: { icon: string, text: string }[];
        important: string;
        legal: string;
        termsUrl: string;
    }
}
