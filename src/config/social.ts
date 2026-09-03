export type { SocialLinks } from '@features/site-config/types';
export { getSocialLinks } from '@features/site-config/data';

export function whatsappLink(phone: string, message: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_MESSAGES = {
  general: 'Hola Clínica Buenaventura, vengo de la página web y requiero una consulta médica.',
  doctor: (doctorLabel: string): string =>
    `Hola Clínica Buenaventura, vengo de la página web y requiero una consulta médica con el ${doctorLabel}.`,
  specialty: (specialtyName: string): string =>
    `Hola Clínica Buenaventura, vengo de la página web y requiero una consulta médica para ${specialtyName}.`,
  promotion: (promoTitle: string): string => `Hola, me interesa la promoción: ${promoTitle}`,
} as const;
