using EPiServer;
using EPiServer.Core;
using EPiServer.Framework.Blobs;
using EPiServer.ServiceLocation;
using EPiServer.Web.Routing;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Optimizely.Server.StaticProvider.Caches;
using Optimizely.Server.StaticProvider.Logging;
using Optimizely.Server.StaticProvider.Models;
using Optimizely.Server.StaticProvider.SourceProviders;
using System;
using System.IO;
using System.Linq;
using System.Text;

namespace Optimizely.Server.StaticProvider.Commands
{
    public static class ResponseProviderCommands
    {
        private static readonly string[] allowedExtensions = new[] { ".js", ".css", ".json" };

        private static IMimeTypeManager _mimeTypeMap;
        private static IUrlResolver _urlResolver;
        private static IHttpContextAccessor _httpContext;
        private static ISourceProvider _staticResourceRetriever;
        private static IResponseProviderCache _ResponseProviderCache;

        static ResponseProviderCommands()
        {
            _mimeTypeMap = ServiceLocator.Current.GetInstance<IMimeTypeManager>();
            _httpContext = ServiceLocator.Current.GetInstance<IHttpContextAccessor>();
            _urlResolver = ServiceLocator.Current.GetInstance<IUrlResolver>();
            _staticResourceRetriever = ServiceLocator.Current.GetInstance<ISourceProvider>();
            _ResponseProviderCache = ServiceLocator.Current.GetInstance<IResponseProviderCache>();
        }

        public static ActionResult ShowAsset(BaseResponseProvider currentPage, string path)
        {
            var extension = Path.GetExtension(path);
            if (!allowedExtensions.Contains(extension))
            {
                return new ForbidResult();
            }

            var contentAssetHelper = ServiceLocator.Current.GetInstance<ContentAssetHelper>();
            var assetFolder = contentAssetHelper.GetOrCreateAssetFolder(((IContent)currentPage).ContentLink);
            var repo = ServiceLocator.Current.GetInstance<IContentRepository>();
            var assets = repo.GetChildren<MediaData>(assetFolder.ContentLink);
            var asset = assets.FirstOrDefault(a => a.Name == Path.GetFileName(path));

            if (asset == null)
            {
                return new NotFoundResult();
            }

            var contentType = _mimeTypeMap.GetMimeType(path);
            return new ContentResult()
            {
                Content = Encoding.UTF8.GetString(asset.BinaryData.ReadAllBytes()),
                ContentType = contentType
            };
        }

        public static ActionResult ShowContext(BaseResponseProvider currentPage, string _)
        {

            var contextVars = new
            {
                rootId = ((PageData)currentPage).ContentLink.ID,
                baseUrl = _urlResolver.GetUrl((PageData)currentPage),
                userName = _httpContext.HttpContext.User?.Identity?.Name
            };

            return new JsonResult(contextVars);
        }

        public static ActionResult ShowContents(BaseResponseProvider currentPage, string _)
        {
            var resources = _staticResourceRetriever.GetResourceNames(currentPage);

            var sb = new StringBuilder();
            sb.AppendLine($"Total resources: {resources.Count()}");
            sb.AppendLine();
            foreach (var resource in resources)
            {
                sb.AppendLine(resource);
            }

            return new ContentResult()
            {
                Content = sb.ToString(),
                ContentType = "text/plain"
            };
        }

        public static ActionResult ShowCache(BaseResponseProvider currentPage, string _)
        {
            var lines = _ResponseProviderCache.Show(((PageData)currentPage).ContentGuid);
            return new ContentResult()
            {
                Content = string.Join(Environment.NewLine, lines),
                ContentType = "text/plain"
            };
        }

        public static ActionResult ClearCache(BaseResponseProvider currentPage, string _)
        {

            _ResponseProviderCache.Clear(((PageData)currentPage).ContentGuid);
            return new ContentResult()
            {
                Content = "Cache Cleared",
                ContentType = "text/plain"
            };
        }

        public static ActionResult ShowLog(BaseResponseProvider currentPage, string _)
        {
            var _log = ServiceLocator.Current.GetInstance<IResponseProviderLog>();
            var _httpContext = ServiceLocator.Current.GetInstance<IHttpContextAccessor>();

            var key = _httpContext.HttpContext.Request.Query["key"].FirstOrDefault();

            var entries = key == null ? _log.Entries : _log.GetEntriesForKey(key);

            return new ContentResult()
            {
                Content = string.Join(Environment.NewLine, entries),
                ContentType = "text/plain"
            };
        }

        public static ActionResult ClearLog(BaseResponseProvider currentPage, string _)
        {
            var _log = ServiceLocator.Current.GetInstance<IResponseProviderLog>();
            _log.Clear();

            return new ContentResult()
            {
                Content = "Log cleared",
                ContentType = "text/plain"
            };
        }
    }
}
