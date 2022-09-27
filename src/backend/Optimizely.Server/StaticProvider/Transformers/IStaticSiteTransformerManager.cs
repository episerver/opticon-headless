using Optimizely.Server.StaticProvider.Models;
using System.Collections.Generic;

namespace Optimizely.Server.StaticProvider.Transformers
{
    public interface IResponseProviderTransformerManager
    {
        List<ITransformer> Transformers { get; set; }

        byte[] Transform(byte[] content, string path, BaseResponseProvider siteRoot, string mimeType);
    }
}