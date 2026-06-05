export const SITE_NAME = 'Clínica Buenaventura';
export const SITE_URL = 'https://clinicabuenaventura.com';
export const SITE_DESCRIPTION = 'Atención médica cercana y confiable para ti y tu familia. Más de 20 especialidades, cirugías, ecografías, rayos X, odontología, laboratorio y farmacia en San Juan de Miraflores, Lima Sur. Agenda tu cita online.';
export const DEFAULT_OG_IMAGE = '/images/og-default.jpg';

export function buildTitle(pageTitle: string): string {
    if (pageTitle.includes(SITE_NAME)) return pageTitle;
    return `${ pageTitle } | ${ SITE_NAME }`;
}

export function buildDoctorSchema(doctor: {
    name: string; specialty: string; cmp: string; bio: string;
    photo: string; slug: string;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Physician',
        name: doctor.name,
        description: doctor.bio,
        image: doctor.photo,
        url: `${ SITE_URL }/medicos/${ doctor.slug }`,
        medicalSpecialty: doctor.specialty,
        identifier: doctor.cmp,
        worksFor: { '@type': 'MedicalOrganization', name: SITE_NAME },
    };
}

export function buildArticleSchema(post: {
    title: string; excerpt: string; slug: string;
    coverImage: string; publishedAt: string; author: { name: string };
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'MedicalWebPage',
        headline: post.title,
        description: post.excerpt,
        image: post.coverImage,
        url: `${ SITE_URL }/blog/${ post.slug }`,
        datePublished: post.publishedAt,
        author: { '@type': 'Person', name: post.author.name },
        publisher: {
            '@type': 'Organization',
            name: SITE_NAME,
            logo: { '@type': 'ImageObject', url: `${ SITE_URL }/images/logo.svg` },
        },
    };
}

export function buildClinicSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'MedicalOrganization',
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        url: SITE_URL,
        logo: `${ SITE_URL }/images/logo.svg`,
        image: `${ SITE_URL }${ DEFAULT_OG_IMAGE }`,
        telephone: '+51-932-939-530',
        email: 'atencionalcliente@clinicabuenaventura.com',
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Av. San Juan N.° 871, San Juan de Miraflores',
            addressLocality: 'Lima',
            addressCountry: 'PE',
        },
        openingHoursSpecification: [
            {
                '@type': "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                opens: "07:00",
                closes: "20:00"
            }
        ],
        medicalSpecialty: [
            'https://schema.org/Cardiovascular',
            'https://schema.org/Surgical',
            'https://schema.org/Oncologic',
            'https://schema.org/Pediatric',
            'https://schema.org/Endocrine',
            'https://schema.org/Gastroenterologic',
            'https://schema.org/Gynecologic',
            'https://schema.org/PrimaryCare',
            'https://schema.org/Neurologic',
            'https://schema.org/DietNutrition',
            'https://schema.org/Dentistry',
            'https://schema.org/Otolaryngologic',
            'https://schema.org/Psychiatric',
            'https://schema.org/Rheumatologic',
            'https://schema.org/Musculoskeletal',
            'https://schema.org/Physiotherapy',
        ],
        sameAs: [
            'https://www.facebook.com/clinicabuenaventurasjm',
            'https://www.instagram.com/clinicabuenaventura',
            'https://www.tiktok.com/@clinicabuenaventura',
            'https://www.youtube.com/@clinicabuenaventura',
            'https://www.linkedin.com/company/clinicabuenaventura'
        ],
    };
}
