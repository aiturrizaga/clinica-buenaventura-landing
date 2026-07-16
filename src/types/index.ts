// Tipos verdaderamente transversales (usados por más de una feature o por
// layouts/config compartidos). Los tipos de dominio de cada feature viven en
// su propio src/features/<feature>/types.ts.

export interface SEOProps {
    /** No incluyas "| Clínica Buenaventura" aquí — se agrega solo (ver noTitleSuffix). */
    title: string;
    description: string;
    canonical?: string;
    ogImage?: string;
    ogType?: 'website' | 'article' | 'profile';
    noindex?: boolean;
    /** true para usar `title` tal cual, sin agregar "| Clínica Buenaventura". */
    noTitleSuffix?: boolean;
    jsonLd?: object | object[];
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
