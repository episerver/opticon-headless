import { ContentData } from "@episerver/content-delivery";

interface SiteLogo {
    url: string;
}

interface Link {
    title: string;
    text: string;
    href: string;
}

export default interface LayoutSetting extends ContentData {
    siteLogoDark?: SiteLogo;
    siteLogoLight?: SiteLogo;
    introduction: string;
    companyAddress: string;
    companyEmail: string;
    companyHeader: string;
    companyName: string;
    companyPhone: string;
    linksHeader: string;
    links?: Link[];
    socialHeader: string;
    socialLinks?: Link[];
    copyright: string;
}
