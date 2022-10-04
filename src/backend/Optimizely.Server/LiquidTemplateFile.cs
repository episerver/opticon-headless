using EPiServer.Core;
using EPiServer.DataAnnotations;
using EPiServer.Framework.DataAnnotations;
namespace Optimizely.Server;
    
[ContentType(DisplayName = "Liquid Template File", GUID = "EE3BD195-7CB0-4756-AB5F-E5E224CD9831")]
[MediaDescriptor(ExtensionString = "liquid")]
public class LiquidTemplateFile : MediaData
{
}
