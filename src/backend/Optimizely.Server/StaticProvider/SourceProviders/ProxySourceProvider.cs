using EPiServer.ServiceLocation;
using Optimizely.Server.StaticProvider.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;

namespace Optimizely.Server.StaticProvider.SourceProviders
{
    public class ProxySourceProvider : ISourceProvider
    {
        private IMimeTypeManager mimeTypeManager;

        public ProxySourceProvider()
        {
            mimeTypeManager = ServiceLocator.Current.GetInstance<IMimeTypeManager>();
        }

        public virtual SourcePayload GetSourcePayload(BaseResponseProvider siteRoot, string url)
        {
            url = Path.Combine(((ProxyResponseProvider)siteRoot).ProxyPath, url.TrimStart('/'));

            var sourcePayload = new SourcePayload()
            {
                ContentType = mimeTypeManager.GetMimeType(url)
            };

            var wc = new WebClient();

            try
            {
                sourcePayload.Content = wc.DownloadData(url);
            }
            catch (Exception e)
            {
                // Just swallow it; the Content property will remain null which will trigger a 404
            }

            return sourcePayload;
        }

        public IEnumerable<string> GetResourceNames(BaseResponseProvider siteRoot)
        {
            throw new System.NotImplementedException();
        }
    }
}
