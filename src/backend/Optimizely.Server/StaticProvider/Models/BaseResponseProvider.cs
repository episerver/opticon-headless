using EPiServer.Core;
using Optimizely.Server.StaticProvider.PathTranslators;
using Optimizely.Server.StaticProvider.SourceProviders;

namespace Optimizely.Server.StaticProvider.Models
{
    public abstract class BaseResponseProvider : PageData
    {
        public abstract ISourceProvider GetResponseProvider();
        public abstract IResponseProviderPathTranslator GetPathTranslator();
    }
}
