import { SITE } from './site';

export const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/clinicabuenaventurasjm',
  instagram: 'https://www.instagram.com/clinicabuenaventura',
  tiktok: 'https://www.tiktok.com/@clinicabuenaventura',
  youtube: 'https://www.youtube.com/@clinicabuenaventura',
  linkedin: 'https://www.linkedin.com/company/clinicabuenaventura',
} as const;

export function whatsappLink(message: string): string {
  return `https://wa.me/${SITE.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_MESSAGES = {
  general: 'Hola Clínica Buenaventura, vengo de la página web y requiero una consulta médica.',
  doctor: (doctorLabel: string): string =>
    `Hola Clínica Buenaventura, vengo de la página web y requiero una consulta médica con el ${doctorLabel}.`,
  specialty: (specialtyName: string): string =>
    `Hola Clínica Buenaventura, vengo de la página web y requiero una consulta médica para ${specialtyName}.`,
  promotion: (promoTitle: string): string => `Hola, me interesa la promoción: ${promoTitle}`,
} as const;
