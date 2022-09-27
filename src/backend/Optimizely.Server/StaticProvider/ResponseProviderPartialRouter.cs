using EPiServer.Core.Routing;
using EPiServer.Core.Routing.Pipeline;
using Microsoft.AspNetCore.Http;
using Optimizely.Server.StaticProvider.Models;

namespace Optimizely.Server.StaticProvider
{
    public class ResponseProviderPartialRouter : IPartialRouter<BaseResponseProvider, BaseResponseProvider>
    {

        private IHttpContextAccessor _httpContext;

        public ResponseProviderPartialRouter(IHttpContextAccessor httpContext)
        {
            _httpContext = httpContext;
        }


        public object RoutePartial(BaseResponseProvider content, UrlResolverContext urlResolverContext)
        {
            urlResolverContext.RemainingSegments = null;
            return content;
        }

        public PartialRouteData GetPartialVirtualPath(BaseResponseProvider content, UrlGeneratorContext urlGeneratorContext)
        {
            return new PartialRouteData
            {
                BasePathRoot = content.ContentLink,
                PartialVirtualPath = string.Empty
            };
        }
    }
}
