import { ContentData } from "@episerver/content-delivery";

interface SiteLogo {
    url: string;
}

interface Link {
    title: string;
    text: string;
    href: string;
    target: string;
}

export default interface LayoutSetting extends ContentData {
    siteLogoDark?: SiteLogo;
    siteLogoLight?: SiteLogo;
    footerLogo: SiteLogo;
    introduction: string;
    linkedInUrl: string;
    facebookUrl: string;
    instagramUrl: string;
    twitterUrl: string;
    header1: string;
    header1Links?: Link[];
    header2: string;
    header2Links?: Link[];
    copyright: string;
}
