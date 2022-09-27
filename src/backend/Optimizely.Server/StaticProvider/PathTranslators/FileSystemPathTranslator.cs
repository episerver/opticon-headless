using Optimizely.Server.StaticProvider.Models;

namespace Optimizely.Server.StaticProvider.PathTranslators
{
    public class FileSystemPathTranslator : SimplePathTranslator, IResponseProviderPathTranslator
    {
        public new string DefaultDocument { get; set; }

        public FileSystemPathTranslator(string defaultDocument = "index.html")
        {
            DefaultDocument = defaultDocument;
        }

        public new string GetTranslatedPath(BaseResponseProvider siteRoot, string requestedPath)
        {
            var relativePath = base.GetTranslatedPath(siteRoot, requestedPath);

            if (relativePath.EndsWith("/") || string.IsNullOrWhiteSpace(relativePath))
            {
                relativePath = string.Concat(relativePath, DefaultDocument);
            }

            return relativePath.Trim('/');
        }
    }
}
