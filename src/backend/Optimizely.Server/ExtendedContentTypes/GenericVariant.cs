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
    [CultureSpecific]
    [Display(Name = "Square Footage", GroupName = SystemTabNames.Content, Order = 10)]
    public virtual XhtmlString SquareFootage { get; set; }

    [CultureSpecific]
    [Display(Name = "Quantity of Rooms", GroupName = SystemTabNames.Content, Order = 20)]
    public virtual XhtmlString RoomQuantity { get; set; }

    [Display(Name = "Quantity of Beds", GroupName = SystemTabNames.Content, Order = 30)]
    public virtual XhtmlString BedQuantity { get; set; }

    [Display(Name = "Rating", GroupName = SystemTabNames.Content, Order = 40)]
    public virtual XhtmlString Rating { get; set; }

    [Display(Name = "Days to rent", GroupName = SystemTabNames.Content, Order = 50)]
    public virtual XhtmlString RentingDays { get; set; }
}