using EPiServer.ServiceLocation;
using EPiServer.Web.Routing;
using Optimizely.Server.StaticProvider.Models;

namespace Optimizely.Server.StaticProvider.PathTranslators
{
    public class SimplePathTranslator : IResponseProviderPathTranslator
    {
        public string NotFoundDocument => "404";

        public string DefaultDocument => string.Empty;

        private IUrlResolver _urlResolver;

        public SimplePathTranslator()
        {
            _urlResolver = ServiceLocator.Current.GetInstance<UrlResolver>();
        }

        public virtual string GetTranslatedPath(BaseResponseProvider siteRoot, string requestedPath)
        {
            var pathToRoot = _urlResolver.GetUrl(siteRoot).TrimStart('/');
            requestedPath = requestedPath.TrimStart('/');

            string relativePath = "/";
            if (requestedPath != pathToRoot)
            {
                relativePath = requestedPath == string.Empty | requestedPath == "/" ? "/" : requestedPath.Substring(pathToRoot.Length, requestedPath.Length - pathToRoot.Length);
            }

            return relativePath;
        }
    }
}