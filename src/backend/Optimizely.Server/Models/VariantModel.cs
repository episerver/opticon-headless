using System.Collections;
using System.Collections.Generic;

namespace Optimizely.Server.Models
{
    public class VariantModel
    {
        public string Guid { get; set; }
        public string ParentGuid { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public List<VariantPricingModel> VariantPricing { get; set; }
        public List<VariantInventoryModel> VariantInventory { get; set; }
    }

    public class VariantPricingModel
    {
        public string MarketId { get; set; }
        public decimal Price { get; set; }
        public string CurrencyCode { get; set; }
    }

    public class VariantInventoryModel
    {
        public string WarehouseCode { get; set; }
        public int InStockQuantity { get; set; }
    }
}
