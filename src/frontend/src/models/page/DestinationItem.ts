import { ContentData } from "@episerver/content-delivery";
import { PageImage } from "@models/common/PageImage";

export default interface DestinationItem extends ContentData {
    mainIntro: string;
    continent: string;
    country: string;
    latitude: number;
    longitude: number;
    avgTemp: number;
    airportInitials: string;
    yearlyPassengers: number;
    mainBody: string;
    pageImage: PageImage;
    mainContentArea: string;
    new: boolean;
    promoted: boolean;
}
