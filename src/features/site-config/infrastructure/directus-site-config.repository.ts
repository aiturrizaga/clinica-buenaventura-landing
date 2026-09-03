import { readSingleton } from '@directus/sdk';
import { directusClient } from '@lib/cms/directus-client';
import { directusAssetUrl } from '@lib/cms/directus-assets';
import type { SiteConfigRepository } from '../repository';
import type { SiteSettings, SocialLinks, HomeHero } from '../types';

interface DirectusSiteSettings {
    name: string;
    description: string;
    url: string;
    ogImage: string | null;
    gaId: string | null;
    locale: string;
    contactWhatsapp: string;
    contactPhoneDisplay: string;
    contactAltWhatsapp: string;
    contactAltPhoneDisplay: string;
    contactSupportPhoneDisplay: string;
    contactEmail: string;
    contactAddress: string;
    contactAddressMapUrl: string;
    hoursLabel: string;
    hoursDisplay: string;
    hoursOpens: string;
    hoursCloses: string;
}

interface DirectusHomeHero {
    imageMobile: string;
    imageTablet: string;
    imageDesktop: string;
    imageWide: string;
}

export class DirectusSiteConfigRepository implements SiteConfigRepository {
    async getSiteSettings(): Promise<SiteSettings> {
        const raw = await directusClient.request(
            readSingleton('site_settings_', {
                fields: [
                    'name', 'description', 'url', 'ogImage', 'gaId', 'locale',
                    'contactWhatsapp', 'contactPhoneDisplay', 'contactAltWhatsapp',
                    'contactAltPhoneDisplay', 'contactSupportPhoneDisplay', 'contactEmail',
                    'contactAddress', 'contactAddressMapUrl', 'hoursLabel', 'hoursDisplay',
                    'hoursOpens', 'hoursCloses',
                ],
            }),
        ) as unknown as DirectusSiteSettings;

        return {
            name: raw.name,
            description: raw.description,
            url: raw.url,
            ogImage: raw.ogImage ? directusAssetUrl(raw.ogImage) : '',
            gaId: raw.gaId ?? undefined,
            locale: raw.locale,
            contact: {
                whatsapp: raw.contactWhatsapp,
                phoneDisplay: raw.contactPhoneDisplay,
                altWhatsapp: raw.contactAltWhatsapp,
                altPhoneDisplay: raw.contactAltPhoneDisplay,
                supportPhoneDisplay: raw.contactSupportPhoneDisplay,
                email: raw.contactEmail,
                address: raw.contactAddress,
                addressMapUrl: raw.contactAddressMapUrl,
            },
            hours: {
                label: raw.hoursLabel,
                display: raw.hoursDisplay,
                opens: raw.hoursOpens,
                closes: raw.hoursCloses,
            },
        };
    }

    async getSocialLinks(): Promise<SocialLinks> {
        const raw = await directusClient.request(
            readSingleton('social_links_', {
                fields: ['facebook', 'instagram', 'tiktok', 'youtube', 'linkedin'],
            }),
        ) as unknown as SocialLinks;
        return raw;
    }

    async getHomeHero(): Promise<HomeHero> {
        const raw = await directusClient.request(
            readSingleton('home_hero_', {
                fields: ['imageMobile', 'imageTablet', 'imageDesktop', 'imageWide'],
            }),
        ) as unknown as DirectusHomeHero;

        return {
            imageMobile: directusAssetUrl(raw.imageMobile),
            imageTablet: directusAssetUrl(raw.imageTablet),
            imageDesktop: directusAssetUrl(raw.imageDesktop),
            imageWide: directusAssetUrl(raw.imageWide),
        };
    }
}
