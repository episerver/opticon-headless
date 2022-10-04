import { ContentResolver, ContentLoader, defaultConfig } from '@episerver/content-delivery';
import Config from "./config.json";

export const getContentLoader = () => {
	let baseUrl = Config.BASE_URL;
	if (baseUrl === '$BASE_URL') {
		baseUrl = "http://localhost:5000/";
	}
	defaultConfig.apiUrl = `${baseUrl}api/episerver/v3.0`;
	defaultConfig.expandAllProperties = true;
	return new ContentLoader(defaultConfig);
};
	
export const getContentResolver = () => {
	let baseUrl = Config.BASE_URL;
	if (baseUrl === '$BASE_URL') {
		baseUrl = "http://localhost:5000/";
	}
	defaultConfig.apiUrl = `${baseUrl}api/episerver/v3.0`;
	defaultConfig.expandAllProperties = true;
	return new ContentResolver(defaultConfig);
};