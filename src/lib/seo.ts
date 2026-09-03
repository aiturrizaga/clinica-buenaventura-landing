import type { SiteSettings, SocialLinks } from '@features/site-config/types';

export function buildTitle(site: Pick<SiteSettings, 'name'>, pageTitle: string, noSuffix = false): string {
  if (noSuffix || pageTitle.includes(site.name)) return pageTitle;
  return `${pageTitle} | ${site.name}`;
}

export function buildDoctorSchema(
  site: Pick<SiteSettings, 'url' | 'name'>,
  doctor: {
    name: string;
    specialty: string;
    cmp: string;
    bio: string;
    photo: string;
    slug: string;
  },
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: doctor.name,
    description: doctor.bio,
    image: doctor.photo,
    url: `${site.url}/medicos/${doctor.slug}`,
    medicalSpecialty: doctor.specialty,
    identifier: doctor.cmp,
    worksFor: { '@type': 'MedicalOrganization', name: site.name },
  };
}

export function buildArticleSchema(
  site: Pick<SiteSettings, 'url' | 'name'>,
  post: {
    title: string;
    excerpt: string;
    slug: string;
    coverImage: string;
    publishedAt: string;
    author: { name: string };
  },
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    url: `${site.url}/blog/${post.slug}`,
    datePublished: post.publishedAt,
    author: { '@type': 'Person', name: post.author.name },
    publisher: {
      '@type': 'Organization',
      name: site.name,
      logo: { '@type': 'ImageObject', url: `${site.url}/images/logo.svg` },
    },
  };
}

export function buildClinicSchema(site: SiteSettings, social: SocialLinks) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    name: site.name,
    description: site.description,
    url: site.url,
    logo: `${site.url}/images/logo.svg`,
    image: `${site.url}${site.ogImage}`,
    telephone: `+${site.contact.whatsapp}`,
    email: site.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.contact.address,
      addressLocality: 'Lima',
      addressCountry: 'PE',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
        ],
        opens: site.hours.opens,
        closes: site.hours.closes,
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
    sameAs: Object.values(social),
  };
}

export function buildBreadcrumbSchema(site: Pick<SiteSettings, 'url'>, items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${site.url}${item.url}`,
    })),
  };
}
