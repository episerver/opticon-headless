using EPiServer.Core;
using EPiServer.DataAnnotations;
using EPiServer.Framework.DataAnnotations;

namespace Optimizely.Server.ExtendedContentTypes;

[ContentType(DisplayName = "Liquid Template File",
    Order = 301,
    GUID = "EE3BD195-7CB0-4756-AB5F-E5E224CD9831",
    Description = "")]
[MediaDescriptor(ExtensionString = "liquid")]
public class LiquidTemplateFile : MediaData
{
}
