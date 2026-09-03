export interface SiteSettings {
    name: string;
    description: string;
    url: string;
    ogImage: string;
    gaId?: string;
    locale: string;
    contact: {
        whatsapp: string;
        phoneDisplay: string;
        altWhatsapp: string;
        altPhoneDisplay: string;
        supportPhoneDisplay: string;
        email: string;
        address: string;
        addressMapUrl: string;
    };
    hours: {
        label: string;
        display: string;
        opens: string;
        closes: string;
    };
}

export interface SocialLinks {
    facebook: string;
    instagram: string;
    tiktok: string;
    youtube: string;
    linkedin: string;
}

export interface HomeHero {
    imageMobile: string;
    imageTablet: string;
    imageDesktop: string;
    imageWide: string;
}
