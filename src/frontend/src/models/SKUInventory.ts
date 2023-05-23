export default interface SKUInventory {
    entryCode: string;
    warehouseCode: string;
    purchaseAvailableQuantity: number;
    purchaseRequestedQuantity: number;
    purchaseAvailable: Date;
}