import type { ImageMetadata } from 'astro';
import type { Promotion } from './types';

const imageModules = import.meta.glob<{ default: ImageMetadata }>(
    '/src/assets/promotions/*.webp',
    { eager: true },
);

// promotion.image guarda solo el nombre de archivo; esto lo resuelve al asset
// optimizado por astro:assets para usar con <Image>.
export function getPromotionImage(promotion: Promotion): ImageMetadata {
    return imageModules[`/src/assets/promotions/${ promotion.image }`].default;
}

export const promotions: Promotion[] = [
    // {
    //     id: '1',
    //     title: 'Sorteo especial Día del Padre',
    //     description: '',
    //     image: 'sorteo_dia_del_padre.webp',
    //     validUntil: '2025-12-31',
    //     slug: 'sorteo-especial-dia-del-padre',
    //     ctaText: 'Participa del Sorteo',
    //     ctaHref: '/promociones',
    //     accentColor: '#E91E8C',
    //     waMessage: 'Hola Clínica Buenaventura, ¿Me pueden dar más información sobre el sorteo especial del Día del Padre?',
    //     detail: {
    //         highlights: [
    //             { icon: '🎟️', text: 'Por consumos iguales o mayores a <strong>S/ 100</strong>, recibe un ticket para participar.' },
    //             { icon: '📺', text: 'Gana 1 de los <strong>2 Smart TV de 45 pulgadas</strong>.' },
    //             { icon: '📅', text: 'Sorteo el <strong>viernes 19 de junio</strong> a las 12:00 p.m.' },
    //             { icon: '📱', text: 'Transmisión en vivo por <strong>TikTok Live @clinicabuenaventura</strong>.' },
    //         ],
    //         important: 'El ganador deberá presentar su <strong>ticket y DNI</strong> para reclamar el premio.',
    //         legal: 'Válido exclusivamente para ventas particulares: consultas médicas, farmacia, laboratorio, ecografías, rayos X, procedimientos, cirugías y hospitalización. No aplica para Conv. Saludpol, Empresa/Convenio o Conv. Alquiler.',
    //         termsUrl: '/legal/terminos-condiciones-sorteo-dia-del-padre',
    //     },
    // },
    {
        id: '2',
        title: 'Dental Check – Sonríe con Confianza',
        description: 'Realiza un chequeo dental completo por solo S/100. Incluye consulta odontológica, radiografía dental, despistaje de caries y limpieza dental.',
        image: 'promo_2.webp',
        validUntil: '2026-07-31',
        slug: 'dental-check-sonrie-con-confianza',
        ctaText: 'Quiero mi Dental Check',
        ctaHref: '/promociones',
        accentColor: '#31C6C4',
        waMessage: 'Hola Clínica Buenaventura, quisiera más información sobre la promoción Dental Check de S/100.',
        detail: {
            highlights: [
                { icon: '🦷', text: 'Consulta <strong>odontológica</strong> incluida.' },
                { icon: '🩻', text: 'Incluye <strong>radiografía dental</strong>.' },
                { icon: '✨', text: '<strong>Limpieza dental</strong> incluida.' },
                { icon: '🔎', text: 'Despistaje de <strong>caries</strong> incluido.' },
                { icon: '💰', text: 'Precio promocional de <strong>S/100.00</strong>.' },
            ],
            important: 'El paquete incluye únicamente los servicios detallados. No incluye tratamientos odontológicos adicionales.',
            legal: 'Promoción válida hasta el 31 de julio de 2026. El paquete incluye únicamente consulta odontológica, radiografía dental, despistaje de caries y limpieza dental. No incluye tratamientos adicionales. Sujeto a disponibilidad de cupos.',
            termsUrl: '/legal/terminos-promociones',
        },
    },
    {
        id: '3',
        title: 'Primera Consulta Gratis – Fiestas Patrias',
        description: 'Celebra Fiestas Patrias cuidando tu salud. Obtén tu primera consulta médica gratuita en especialidades seleccionadas durante todo julio.',
        image: 'promo_3.webp',
        validUntil: '2026-07-31',
        slug: 'primera-consulta-gratis-fiestas-patrias',
        ctaText: 'Solicitar mi consulta',
        ctaHref: '/promociones',
        accentColor: '#0A3D8F',
        waMessage: 'Hola Clínica Buenaventura, quisiera más información sobre la promoción de Primera Consulta Gratis por Fiestas Patrias.',
        detail: {
            highlights: [
                {
                    icon: '🎉',
                    text: 'La <strong>primera consulta es GRATIS</strong> durante todo julio.'
                },
                {
                    icon: '🏥',
                    text: 'Aplica para: <strong>Cirugía General, Ginecología, Medicina Interna, Cardiología, Urología, Traumatología, Reumatología, Neurología, Otorrinolaringología, Gastroenterología y Urgencia o Emergencia</strong>.'
                },
                {
                    icon: '📅',
                    text: 'Promoción válida <strong>durante todo el mes de julio</strong>.'
                },
                {
                    icon: '👨‍⚕️',
                    text: 'Incluye la <strong>primera consulta y el primer control</strong> de la especialidad seleccionada.'
                },
            ],
            important: 'Si durante la consulta se indican exámenes o procedimientos, estos se realizan con su costo correspondiente. Si presenta resultados de otro establecimiento, el control será cobrado según tarifario vigente.',
            legal: 'Aplica para la primera consulta y el primer control de la especialidad seleccionada. El control será gratuito únicamente si los exámenes o procedimientos indicados se realizan en la institución. En Urgencia y Emergencia incluye solo la evaluación médica inicial. No incluye exámenes, procedimientos, medicamentos, farmacia, observación ni otros servicios adicionales. No acumulable con otras promociones o convenios.',
            termsUrl: '/legal/terminos-promociones',
        },
    },
    {
        id: '4',
        title: 'Campaña de Salud Digestiva – Test de Aliento',
        description: '¡Cuida tu salud digestiva! Test de Aliento para la detección de Helicobacter Pylori a solo S/150.00 (antes S/200).',
        image: 'promo_test_de_aliento.webp',
        validUntil: '2026-06-30',
        slug: 'campana-salud-digestiva-test-aliento',
        ctaText: 'Aprovechar promoción',
        ctaHref: '/promociones',
        accentColor: '#0A3D8F',
        waMessage: 'Hola Clínica Buenaventura, quisiera más información sobre la Campaña de Salud Digestiva y el Test de Aliento para Helicobacter Pylori.',
        detail: {
            highlights: [
                { icon: '🔬', text: 'Test de Aliento para la detección de <strong>Helicobacter Pylori</strong>.' },
                { icon: '💰', text: 'Precio promocional <strong>S/150.00</strong> (antes S/200).' },
                { icon: '📋', text: 'Incluye <strong>lectura e interpretación de resultados</strong>.' },
                { icon: '🩺', text: 'Aplica para pacientes con <strong>orden médica previa</strong>.' },
            ],
            important: 'Aplica únicamente para pacientes con <strong>orden médica previa</strong>. Sujeta a disponibilidad de cupos.',
            legal: 'Promoción no acumulable con otros descuentos o beneficios. Aplica únicamente para pacientes con orden médica previa. Sujeta a disponibilidad de cupos.',
            termsUrl: '/legal/terminos-promociones',
        },
    }
];
