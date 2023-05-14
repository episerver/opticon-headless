using EPiServer.Commerce.Catalog.ContentTypes;
using EPiServer.Commerce.Catalog.DataAnnotations;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.DataAnnotations;
using System.ComponentModel.DataAnnotations;

namespace Optimizely.Server.ExtendedContentTypes;

[CatalogContentType(
    GUID = "e638670d-3f73-4867-8745-1125dcc066ca",
    MetaClassName = "GenericProduct",
    DisplayName = "Generic Product",
    Description = "Generic product supports multiple products")]
public class GenericProduct : ProductContent
{ 
    [CultureSpecific]
    [Display(Name = "Product teaser", GroupName = SystemTabNames.Content, Order = 10)]
    public virtual XhtmlString ProductTeaser { get; set; }

    [Searchable]
    [CultureSpecific]
    [Tokenize]
    [IncludeInDefaultSearch]
    [BackingType(typeof(PropertyString))]
    [Display(Name = "Brand", GroupName = SystemTabNames.Content, Order = 15)]
    public virtual string Brand { get; set; }

    [Searchable]
    [CultureSpecific]
    [Tokenize]
    [IncludeInDefaultSearch]
    [Display(Name = "Description", GroupName = SystemTabNames.Content, Order = 25)]
    public virtual XhtmlString Description { get; set; }


    [Display(Name = "On sale",
        GroupName = SystemTabNames.Content,
        Order = 50)]
    public virtual bool OnSale { get; set; }

    [Display(Name = "New arrival",
        GroupName = SystemTabNames.Content,
        Order = 55)]
    public virtual bool NewArrival { get; set; }

    [Searchable]
    [CultureSpecific]
    [Tokenize]
    [IncludeInDefaultSearch]
    [Display(Name = "Long description", GroupName = SystemTabNames.Content, Order = 60)]
    public virtual XhtmlString LongDescription { get; set; }

    [CultureSpecific]
    [Display(Name = "Content area",
        GroupName = SystemTabNames.Content,
        Order = 65)]
    public virtual ContentArea ContentArea { get; set; }


    [BackingType(typeof(PropertyString))]
    [Display(Name = "Manufacturer", GroupName = SystemTabNames.Content, Order = 5)]
    public virtual string Manufacturer { get; set; }

    [BackingType(typeof(PropertyString))]
    [Display(Name = "Modelss", GroupName = SystemTabNames.Content, Order = 15)]
    public virtual string Model { get; set; }

    [Display(Name = "Model year", GroupName = SystemTabNames.Content, Order = 20)]
    [BackingType(typeof(PropertyString))]
    public virtual string ModelYear { get; set; }

    [BackingType(typeof(PropertyString))]
    [Display(Name = "Warranty", GroupName = SystemTabNames.Content, Order = 25)]
    public virtual string Warranty { get; set; }

}