export interface SpecialtyCondition {
    title: string;
    description: string;
}

export interface SpecialtyProcedureGroup {
    title?: string;
    items: string[];
}

export interface SpecialtyCallout {
    title: string;
    text: string;
    buttonLabel: string;
    specialtySlug: string;
}

export interface SpecialtyDetail {
    symptomsTitle: string;
    symptoms: string[];
    conditionsTitle: string;
    conditions: SpecialtyCondition[];
    proceduresTitle: string;
    procedureGroups: SpecialtyProcedureGroup[];
    benefitsIntro?: string;
    benefits: string[];
    staff: string[];
    callout?: SpecialtyCallout;
}

export interface Specialty {
    id: string;
    slug: string;
    name: string;
    fontIcon: string;
    /** Subtítulo corto de la especialidad. */
    shortDescription: string;
    /** Introducción (puede venir como HTML desde el editor WYSIWYG). */
    fullDescription: string;
    coverImage: string;
    featured: boolean;
    order: number;
    preferred?: boolean;
    /** true => tiene página de detalle en /especialidades/<slug>. */
    hasDetail: boolean;
    detail?: SpecialtyDetail;
}
