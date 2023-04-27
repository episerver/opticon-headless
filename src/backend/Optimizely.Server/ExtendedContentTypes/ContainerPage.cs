using EPiServer.Core;
using EPiServer.DataAnnotations;

namespace Optimizely.Server.ExtendedContentTypes
{
    [ContentType(
        GUID = "7b2cf7c1-b76a-48a5-819c-2e35d29e4d79",
        Description = "Used to logically group pages in the page tree.")]
    public class ContainerPage : PageData
    {
    }
}
