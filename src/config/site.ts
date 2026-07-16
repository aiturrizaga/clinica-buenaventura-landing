function envOrDefault(value: string | undefined, fallback: string): string {
  return value?.trim() ? value.trim() : fallback;
}

export const SITE = {
  name: 'Clínica Buenaventura',
  description:
    'Atención médica cercana y confiable para ti y tu familia. Más de 20 especialidades, cirugías, ecografías, rayos X, odontología, laboratorio y farmacia en San Juan de Miraflores, Lima Sur. Agenda tu cita online.',
  url: envOrDefault(import.meta.env.PUBLIC_SITE_URL, 'https://clinicabuenaventura.com'),
  ogImage: '/images/og-default.jpg',
  gaId: import.meta.env.PUBLIC_GA_ID?.trim() || undefined,
  locale: 'es_PE',
  contact: {
    whatsapp: envOrDefault(import.meta.env.PUBLIC_WHATSAPP_NUMBER, '51932939530'),
    phoneDisplay: '932 939 530',
    altWhatsapp: '51943004989',
    altPhoneDisplay: '943 004 989',
    supportPhoneDisplay: '(01) 715 4600',
    email: envOrDefault(
      import.meta.env.PUBLIC_CONTACT_EMAIL,
      'atencionalcliente@clinicabuenaventura.com',
    ),
    address: 'Av. San Juan N.° 871, San Juan de Miraflores',
    addressMapUrl:
      'https://www.google.com/maps/place/Cl%C3%ADnica+Buenaventura/@-12.158772,-76.973447,13z/data=!4m6!3m5!1s0x9105b9db90b20dd5:0xfab3be931acb300!8m2!3d-12.1587718!4d-76.9734474!16s%2Fg%2F11j7jkq6pp?hl=es&entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D',
  },
  hours: {
    label: 'Lun – Dom',
    display: '7:00 am – 8:00 pm',
    opens: '07:00',
    closes: '20:00',
  },
} as const;
