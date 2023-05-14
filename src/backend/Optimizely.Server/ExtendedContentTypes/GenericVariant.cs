using EPiServer.Commerce.Catalog.ContentTypes;
using EPiServer.Commerce.Catalog.DataAnnotations;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.DataAnnotations;
using System.ComponentModel.DataAnnotations;

namespace Optimizely.Server.ExtendedContentTypes;

[CatalogContentType(DisplayName = "Generic Variant", GUID = "1aaa2c58-c424-4c37-81b0-77e76d254eb0", Description = "Generic variant supports multiple variation types")]
public class GenericVariant : VariationContent
{
    [Tokenize]
    [Searchable]
    [IncludeInDefaultSearch]
    [BackingType(typeof(PropertyString))]
    [Display(Name = "Size", Order = 5)]
    public virtual string Size { get; set; }

    [Tokenize]
    [Searchable]
    [CultureSpecific]
    [IncludeInDefaultSearch]
    [BackingType(typeof(PropertyString))]
    [Display(Name = "Color", Order = 10)]
    public virtual string Color { get; set; }

    [Tokenize]
    [Searchable]
    [CultureSpecific]
    [IncludeInDefaultSearch]
    [Display(Name = "Description", Order = 15)]
    public virtual XhtmlString Description { get; set; }

    [CultureSpecific]
    [Display(Name = "Content area", Order = 20)]
    public virtual ContentArea ContentArea { get; set; }
    

    [Display(Name = "Mpn", GroupName = SystemTabNames.Content, Order = 5)]
    [BackingType(typeof(PropertyString))]
    public virtual string Mpn { get; set; }

    [Display(Name = "Package quantity", GroupName = SystemTabNames.Content, Order = 10)]
    [BackingType(typeof(PropertyString))]
    public virtual string PackageQuantity { get; set; }

    [Display(Name = "Part number", GroupName = SystemTabNames.Content, Order = 15)]
    [BackingType(typeof(PropertyString))]
    public virtual string PartNumber { get; set; }

    [Display(Name = "Region code", GroupName = SystemTabNames.Content, Order = 20)]
    [BackingType(typeof(PropertyString))]
    public virtual string RegionCode { get; set; }

    [Display(Name = "Sku", GroupName = SystemTabNames.Content, Order = 25)]
    [BackingType(typeof(PropertyString))]
    public virtual string Sku { get; set; }

    [Display(Name = "Subscription length", GroupName = SystemTabNames.Content, Order = 30)]
    [BackingType(typeof(PropertyString))]
    public virtual string SubscriptionLength { get; set; }

    [Display(Name = "Upc", GroupName = SystemTabNames.Content, Order = 35)]
    [BackingType(typeof(PropertyString))]
    public virtual string Upc { get; set; }
}