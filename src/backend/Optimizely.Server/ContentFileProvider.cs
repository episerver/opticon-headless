using EPiServer;
using EPiServer.Core;
using EPiServer.Framework.Blobs;
using EPiServer.ServiceLocation;
using EPiServer.Web.Routing;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Primitives;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace Optimizely.Server
{
    public class ContentFileProvider : IFileProvider
    {
        public IDirectoryContents GetDirectoryContents(string subpath) { throw new NotImplementedException(); }
        public IChangeToken Watch(string filter) { return new CancellationChangeToken(new()); }

        private string baseUrl;
        private IHttpContextAccessor _httpContext;
        private IUrlResolver _urlResolver;
        private IContentLoader _contentLoader;

        public ContentFileProvider(string baseUrl)
        {
            this.baseUrl = baseUrl;

            _httpContext = ServiceLocator.Current.GetInstance<IHttpContextAccessor>();
            _urlResolver = ServiceLocator.Current.GetInstance<IUrlResolver>();
            _contentLoader = ServiceLocator.Current.GetInstance<IContentLoader>();
        }

        public IFileInfo GetFileInfo(string path)
        {
            var pathStack = new List<string>(); // These are the paths we're going to try for templates

            // If we can find the content, use the TemplateRoots back to root
            var content = _urlResolver.Route(new UrlBuilder(_httpContext.HttpContext.Request.Path.Value));
            if (content != null)
            {
                var ancestors = _contentLoader.GetAncestors(content.ContentLink);
                var templateRoots = ancestors
                    .Where(s => s.Property["TemplateRoot"]?.Value != null)
                    .Select(s => _urlResolver.GetUrl((ContentReference)s.Property["TemplateRoot"].Value))
                    .ToList();
 
                // Make a "stack" of URLs to attempt formed from the inbound path and all the template roots
                templateRoots.ForEach(r => pathStack.Add(PathUtils.MakePath(r, path)));
            }
            pathStack.Add(PathUtils.MakePath(baseUrl, path)); // The location of last resort 

            // Return the first one we find
            foreach (var pathToAttempt in pathStack)
            {
                var file = _urlResolver.Route(new UrlBuilder(pathToAttempt)) as MediaData;
                if(file != null)
                {
                    // Found it
                    return new ContentFile(GetString(file.BinaryData.ReadAllBytes())); 
                }
            }

            // We didn't find anything
            return new NonExistentFile();
        }

        public string GetString(byte[] bytes)
        {
            var encoding = Encoding.ASCII;
            if (bytes.Length >= 5)
            {
                var bom = bytes.Take(5).ToArray();
                if (bom[0] == 0x2b && bom[1] == 0x2f && bom[2] == 0x76) encoding = Encoding.UTF7;
                if (bom[0] == 0xef && bom[1] == 0xbb && bom[2] == 0xbf) encoding = Encoding.UTF8;
                if (bom[0] == 0xff && bom[1] == 0xfe) encoding = Encoding.Unicode; //UTF-16LE
                if (bom[0] == 0xfe && bom[1] == 0xff) encoding = Encoding.BigEndianUnicode; //UTF-16BE
                if (bom[0] == 0 && bom[1] == 0 && bom[2] == 0xfe && bom[3] == 0xff) encoding = Encoding.UTF32;
            }
            return encoding.GetString(bytes);
        }

    }

    public class ContentFile : IFileInfo
    {
        private string fileContents;
        public bool Exists => fileContents != null;
        public long Length => fileContents?.Length ?? 0;
        public string PhysicalPath => null;
        public string Name => null;
        public DateTimeOffset LastModified => DateTimeOffset.Now;
        public bool IsDirectory => false;
        public FileBlob BinaryData { get; private set; }
        public ContentReference ParentLink { get; private set; }
        public ContentFile(string contents)
        {
            fileContents = contents;
        }

        public Stream CreateReadStream()
        {
            return new MemoryStream(Encoding.UTF8.GetBytes(fileContents));
        }
    }

    public class NonExistentFile : IFileInfo
    {
        public bool Exists => false;
        public bool IsDirectory => false;
        public DateTimeOffset LastModified => DateTimeOffset.MinValue;
        public long Length => 0;
        public string Name => string.Empty;
        public string PhysicalPath => string.Empty;
        public Stream CreateReadStream() { return null; }
    }

    //[InitializableModule]
    //[ModuleDependency(typeof(EPiServer.Web.InitializationModule))]
    //public class ContentFileInit : IInitializableModule
    //{
    //    // This method runs on app start-up
    //    public void Initialize(InitializationEngine context)
    //    {
    //        var contentEvents = ServiceLocator.Current.GetInstance<IContentEvents>();
    //        contentEvents.PublishedContent += ClearTemplateCache;
    //    }

    //    public static void ClearTemplateCache(object sender, ContentEventArgs e)
    //    {
    //        if (e.Content is LiquidTemplateFile)
    //        {
    //            ContentFileChangeToken.ShouldClear = true;
    //        }
    //    }

    //    public void Uninitialize(InitializationEngine context) { }
    //}
}