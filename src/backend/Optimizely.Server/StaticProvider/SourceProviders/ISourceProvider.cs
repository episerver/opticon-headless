using Optimizely.Server.StaticProvider.Models;
using System.Collections.Generic;

namespace Optimizely.Server.StaticProvider.SourceProviders
{
    public interface ISourceProvider
    {
        IEnumerable<string> GetResourceNames(BaseResponseProvider siteRoot);

        SourcePayload GetSourcePayload(BaseResponseProvider siteRoot, string path);
    }
}