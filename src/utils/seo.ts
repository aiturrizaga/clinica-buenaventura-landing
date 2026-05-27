export const SITE_NAME = 'Clínica Buenaventura';
export const SITE_URL  = 'https://clinicabuenaventura.com';
export const SITE_DESCRIPTION = 'Clínica médica en Lima con más de 30 especialidades. Atención de excelencia, tecnología avanzada y un equipo comprometido con tu bienestar.';
export const DEFAULT_OG_IMAGE = '/images/og-default.jpg';

export function buildTitle(pageTitle: string): string {
  if (pageTitle.includes(SITE_NAME)) return pageTitle;
  return `${pageTitle} | ${SITE_NAME}`;
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
    url: `${SITE_URL}/medicos/${doctor.slug}`,
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
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.publishedAt,
    author: { '@type': 'Person', name: post.author.name },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/logo.svg` },
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
    logo: `${SITE_URL}/images/logo.svg`,
    image: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
    telephone: '+51-1-234-5678',
    email: 'info@clinicabuenaventura.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Calle 123 #45-67',
      addressLocality: 'Lima',
      addressCountry: 'PE',
    },
    openingHours: ['Mo-Fr 07:00-19:00', 'Sa 07:00-13:00'],
    medicalSpecialty: ['Cardiology', 'Pediatrics', 'Orthopedics', 'Gynecology', 'Dermatology'],
    sameAs: [
      'https://facebook.com/clinicabuenaventura',
      'https://instagram.com/clinicabuenaventura',
    ],
  };
}
