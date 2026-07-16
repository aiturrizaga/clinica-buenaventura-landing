import { SITE } from '@config/site';
import { SOCIAL_LINKS } from '@config/social';

export function buildTitle(pageTitle: string, noSuffix = false): string {
  if (noSuffix || pageTitle.includes(SITE.name)) return pageTitle;
  return `${pageTitle} | ${SITE.name}`;
}

export function buildDoctorSchema(doctor: {
  name: string;
  specialty: string;
  cmp: string;
  bio: string;
  photo: string;
  slug: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: doctor.name,
    description: doctor.bio,
    image: doctor.photo,
    url: `${SITE.url}/medicos/${doctor.slug}`,
    medicalSpecialty: doctor.specialty,
    identifier: doctor.cmp,
    worksFor: { '@type': 'MedicalOrganization', name: SITE.name },
  };
}

export function buildArticleSchema(post: {
  title: string;
  excerpt: string;
  slug: string;
  coverImage: string;
  publishedAt: string;
  author: { name: string };
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    url: `${SITE.url}/blog/${post.slug}`,
    datePublished: post.publishedAt,
    author: { '@type': 'Person', name: post.author.name },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      logo: { '@type': 'ImageObject', url: `${SITE.url}/images/logo.svg` },
    },
  };
}

export function buildClinicSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    logo: `${SITE.url}/images/logo.svg`,
    image: `${SITE.url}${SITE.ogImage}`,
    telephone: `+${SITE.contact.whatsapp}`,
    email: SITE.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.contact.address,
      addressLocality: 'Lima',
      addressCountry: 'PE',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
        ],
        opens: SITE.hours.opens,
        closes: SITE.hours.closes,
      },
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
    sameAs: Object.values(SOCIAL_LINKS),
  };
}

export function buildBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE.url}${item.url}`,
    })),
  };
}
