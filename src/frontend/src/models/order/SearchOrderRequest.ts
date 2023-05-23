export default interface SearchOrderRequest {
    marketIds: string[];
    modifiedFrom: Date;
    modifiedTo: Date;
    statuses: string[];
    customerId: string;
    startingIndex: number;
    recordsToRetrieve: number;
    siteId: string;
    searchTerm: string;
}