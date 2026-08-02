import type { ImageMetadata } from 'astro';
import type { Promotion } from './types';

const imageModules = import.meta.glob<{ default: ImageMetadata }>(
    '/src/assets/promotions/*.webp',
    { eager: true },
);

export function getPromotionImage(promotion: Promotion): ImageMetadata {
    return imageModules[`/src/assets/promotions/${ promotion.image }`].default;
}

export const promotions: Promotion[] = [
    {
        id: '1',
        title: 'Campaña de Salud Digestiva – Test de Aliento',
        description: 'Detecta Helicobacter Pylori con el Test de Aliento a un precio especial de S/150. Incluye lectura e interpretación de resultados.',
        image: 'promo_01.webp',
        validUntil: '2026-08-31',
        slug: 'campana-salud-digestiva-test-aliento',
        ctaText: 'Solicitar información',
        ctaHref: '/promociones',
        accentColor: '#14D9C7',
        waMessage: 'Hola Clínica Buenaventura, quisiera más información sobre la Campaña de Salud Digestiva y el Test de Aliento para Helicobacter Pylori.',
        detail: {
            highlights: [
                {
                    icon: '🦠',
                    text: 'Detecta la bacteria <strong>Helicobacter Pylori</strong> mediante el Test de Aliento.'
                },
                { icon: '💰', text: 'Precio promocional de <strong>S/150.00</strong> (antes S/200).' },
                { icon: '📋', text: 'Incluye la <strong>lectura e interpretación de resultados</strong>.' },
                { icon: '🎯', text: 'Promoción sujeta a <strong>disponibilidad de cupos</strong>.' },
            ],
            important: 'El precio incluye únicamente el Test de Aliento con lectura de resultados. Promoción sujeta a disponibilidad.',
            legal: 'Promoción no acumulable con otros descuentos o beneficios. Sujeta a disponibilidad de cupos.',
            termsUrl: '/legal/terminos-promociones',
        },
    },
    {
        id: '2',
        title: 'Dental Check – Sonríe con Confianza',
        description: 'Chequeo dental completo por solo S/100. Incluye consulta odontológica, radiografía dental, despistaje de caries y limpieza dental.',
        image: 'promo_02.webp',
        validUntil: '2026-08-31',
        slug: 'dental-check-sonrie-con-confianza',
        ctaText: 'Quiero mi Dental Check',
        ctaHref: '/promociones',
        accentColor: '#14D9C7',
        waMessage: 'Hola Clínica Buenaventura, quisiera más información sobre la promoción Dental Check de S/100.',
        detail: {
            highlights: [
                { icon: '🦷', text: 'Incluye <strong>consulta odontológica</strong>.' },
                { icon: '🩻', text: '<strong>Radiografía dental</strong> incluida.' },
                { icon: '🔎', text: 'Despistaje de <strong>caries</strong>.' },
                { icon: '✨', text: '<strong>Limpieza dental</strong> incluida.' },
                { icon: '💰', text: 'Precio promocional de <strong>S/100.00</strong>.' },
            ],
            important: 'El paquete incluye únicamente los servicios detallados. No incluye tratamientos odontológicos adicionales.',
            legal: 'Paquete válido hasta el <strong>31 de agosto de 2026</strong>. Incluye únicamente consulta odontológica, radiografía dental, despistaje de caries y limpieza dental. No incluye tratamientos adicionales. Sujeto a disponibilidad de cupos.',
            termsUrl: '/legal/terminos-promociones',
        },
    },
    {
        id: '3',
        title: 'Campaña de Nefrología',
        description: 'Consulta especializada en Nefrología a precio especial de S/120. Evaluación y tratamiento de enfermedades renales, hipertensión, diabetes y retención de líquidos.',
        image: 'promo_03.webp',
        validUntil: '2026-08-21',
        slug: 'campana-nefrologia',
        ctaText: 'Reservar cita',
        ctaHref: '/promociones',
        accentColor: '#14D9C7',
        waMessage: 'Hola Clínica Buenaventura, quisiera más información sobre la Campaña de Nefrología y el precio especial de S/120.',
        detail: {
            highlights: [
                { icon: '🩺', text: 'Consulta médica especializada en <strong>Nefrología</strong>.' },
                { icon: '💰', text: 'Precio especial de <strong>S/120.00</strong>.' },
                { icon: '📅', text: 'Atención previa cita los días <strong>viernes 14 y 21</strong>.' },
                {
                    icon: '❤️',
                    text: 'Evaluación y tratamiento de <strong>enfermedades renales, hipertensión, diabetes y retención de líquidos</strong>.'
                },
            ],
            important: 'El precio corresponde únicamente a la consulta médica especializada. Atención previa cita.',
            legal: 'El precio incluye únicamente la consulta médica especializada en Nefrología. No incluye procedimientos, medicamentos ni exámenes complementarios.',
            termsUrl: '/legal/terminos-promociones',
        },
    },
];
