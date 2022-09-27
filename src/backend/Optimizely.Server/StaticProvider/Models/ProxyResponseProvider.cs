using EPiServer.DataAnnotations;
using Optimizely.Server.StaticProvider.PathTranslators;
using Optimizely.Server.StaticProvider.SourceProviders;
using System.ComponentModel.DataAnnotations;

namespace Optimizely.Server.StaticProvider.Models
{
    [ContentType(DisplayName = "Proxy Site Root", GUID = "68C1BDCC-34E8-52CE-98C5-05BE3A0EBAF0")]
    public class ProxyResponseProvider : BaseResponseProvider
    {
        [Display(Name = "Base Proxy URL", Description = "The URL to which the content path will be appended.")]
        public virtual string ProxyPath { get; set; }

        public override ISourceProvider GetResponseProvider()
        {
            return new ProxySourceProvider();
        }
        public override IResponseProviderPathTranslator GetPathTranslator()
        {
            return new SimplePathTranslator();
        }
    }

}
