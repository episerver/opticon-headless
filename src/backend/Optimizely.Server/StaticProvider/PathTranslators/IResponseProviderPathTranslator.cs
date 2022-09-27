using Optimizely.Server.StaticProvider.Models;

namespace Optimizely.Server.StaticProvider.PathTranslators
{
    public interface IResponseProviderPathTranslator
    {
        string GetTranslatedPath(BaseResponseProvider siteRoot, string requestedPath);
        string NotFoundDocument { get; }
        string DefaultDocument { get; }
    }
}