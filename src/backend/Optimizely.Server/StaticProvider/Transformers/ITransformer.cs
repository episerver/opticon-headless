using Optimizely.Server.StaticProvider.Models;

namespace Optimizely.Server.StaticProvider.Transformers
{
    public interface ITransformer
    {
        byte[] Transform(byte[] content, string path, BaseResponseProvider siteRoot, string mimeType);
    }
}