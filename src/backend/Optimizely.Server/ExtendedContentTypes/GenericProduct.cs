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
    [Display(Name = "Description", GroupName = SystemTabNames.Content, Order = 60)]
    public virtual XhtmlString Description { get; set; }

    [CultureSpecific]
    [Display(Name = "Content area", GroupName = SystemTabNames.Content, Order = 70)]
    public virtual ContentArea ContentArea { get; set; }
}