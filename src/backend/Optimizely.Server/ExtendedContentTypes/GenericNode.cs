using EPiServer.Commerce.Catalog.ContentTypes;
using EPiServer.Commerce.Catalog.DataAnnotations;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.DataAnnotations;
using System.ComponentModel.DataAnnotations;

namespace Optimizely.Server.ExtendedContentTypes;

[CatalogContentType(DisplayName = "Generic Node", GUID = "4ac27ad4-bf60-4ea0-9a77-28a89d38d3fd", Description = "")]
public class GenericNode : NodeContent
{
    [CultureSpecific]
    [Display(Name = "Long Name", GroupName = SystemTabNames.Content, Order = 5)]
    public virtual string LongName { get; set; }

    [CultureSpecific]
    [Display(Name = "Description", GroupName = SystemTabNames.Content, Order = 10)]
    public virtual XhtmlString Description { get; set; }

    [CultureSpecific]
    [Display(
       Name = "Featured products",
       GroupName = SystemTabNames.Content,
       Order = 15)]
    [AllowedTypes(AllowedTypes = new[] { typeof(ProductContent), typeof(NodeContent), typeof(PackageContent), typeof(BundleContent) })]
    public virtual ContentArea FeaturedProducts { get; set; }
}