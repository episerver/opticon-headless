using Optimizely.Server.StaticProvider.Models;
using System.Collections.Generic;

namespace Optimizely.Server.StaticProvider.Transformers
{
    public class ResponseProviderTransformerManager : IResponseProviderTransformerManager
    {
        public List<ITransformer> Transformers { get; set; } = new();

        public byte[] Transform(byte[] content, string path, BaseResponseProvider siteRoot, string mimeType)
        {
            foreach (var transformer in Transformers)
            {
                content = transformer.Transform(content, path, siteRoot, mimeType);
            }

            return content;
        }
    }
}
