using EPiServer;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.DataAnnotations;
using EPiServer.Framework.DataAnnotations;
using System.ComponentModel.DataAnnotations;

namespace Optimizely.Server;

[ContentType(DisplayName = "Image File",
    GUID = "20644be7-3ca1-4f84-b893-ee021b73ce6c",
    Description = "Used for image file types such as jpg, jpeg, jpe, ico, gif, bmp, png")]
[MediaDescriptor(ExtensionString = "jpg,jpeg,jpe,ico,gif,bmp,png")]
public class ImageMediaData : ImageData
{

    [Display(GroupName = SystemTabNames.Content, Order = 40)]
    public virtual string Caption { get; set; }

    [CultureSpecific]
    [Display(GroupName = SystemTabNames.Content, Order = 150)]
    public virtual string Title { get; set; }

    [CultureSpecific]
    [Display(Description = "Description of the image", GroupName = SystemTabNames.Content, Order = 160)]
    public virtual string Description { get; set; }

    [CultureSpecific]
    [Display(Name = "Alternate text", GroupName = SystemTabNames.Content, Order = 170)]
    public virtual string AltText { get; set; }

    [CultureSpecific]
    [Display(Name = "Credits text", GroupName = SystemTabNames.Content, Order = 180)]
    public virtual string CreditsText { get; set; }

    [CultureSpecific]
    [Display(Name = "Credits link", GroupName = SystemTabNames.Content, Order = 190)]
    public virtual Url CreditsLink { get; set; }

    [CultureSpecific]
    [UIHint("allcontent")]
    [Display(Description = "Link to content", GroupName = SystemTabNames.Content, Order = 200)]
    public virtual ContentReference Link { get; set; }

    [CultureSpecific]
    [Display(GroupName = SystemTabNames.Content, Order = 210)]
    public virtual string Copyright { get; set; }
}
