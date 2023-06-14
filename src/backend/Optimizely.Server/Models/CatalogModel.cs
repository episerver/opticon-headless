using System.Collections.Generic;

namespace Optimizely.Server.Models
{
    public class CatalogModel
    {
        public string Guid { get; set; }
        public string CatalogName { get; set; }
        public IEnumerable<string> CatalogLanguages { get; set; }
        public string DefaultLanguage { get; set; }
        public string DefaultCurrency { get; set; }
        public string WeightBase { get; set; }
        public string LengthBase { get; set; }
        public string Owner { get; set; }
    }
}
