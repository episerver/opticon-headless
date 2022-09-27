using EPiServer;
using EPiServer.Core;
using EPiServer.Framework.Blobs;
using EPiServer.ServiceLocation;
using Optimizely.Server.StaticProvider.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Linq;

namespace Optimizely.Server.StaticProvider.SourceProviders
{
    public class ZipArchiveSourceProvider : ISourceProvider
    {
        public static string DefaultArchiveName = "_source.zip";
        public static string NotFoundDocumentName = "404.html";

        private readonly IContentLoader _loader;
        private readonly IMimeTypeManager _mimeTypeManager;

        public ZipArchiveSourceProvider()
        {
            _loader = ServiceLocator.Current.GetInstance<IContentLoader>();
            _mimeTypeManager = ServiceLocator.Current.GetInstance<IMimeTypeManager>();
        }

        public SourcePayload GetSourcePayload(BaseResponseProvider siteRoot, string path)
        {
            if (string.IsNullOrWhiteSpace(path))
            {
                throw new ArgumentNullException(nameof(path));
            }

            var zip = LocateZipArchive(siteRoot);

            if (string.IsNullOrWhiteSpace(path))
            {
                throw new ArgumentNullException(nameof(path));
            }

            var sourcePayload = new SourcePayload()
            {
                ContentType = _mimeTypeManager.GetMimeType(path)
            };

            var entry = zip.GetEntry(path.Trim("/".ToCharArray()));
            if (entry == null)
            {
                entry = zip.GetEntry(NotFoundDocumentName);
                if (entry == null)
                {
                    // Nothing was found, return an empty result
                    // We don't need to set the status code, since the result is empty
                    return SourcePayload.Empty;
                }
                else
                {
                    // We found the NotFound doc, so we're going to return something, with a 404
                    sourcePayload.StatusCode = 404;
                }
            }

            var stream = entry.Open();

            byte[] buffer = new byte[16 * 1024];
            using (var memoryStream = new MemoryStream())
            {
                int read;
                while ((read = stream.Read(buffer, 0, buffer.Length)) > 0)
                {
                    memoryStream.Write(buffer, 0, read);
                }
                stream.Close();
                sourcePayload.Content = memoryStream.ToArray();
            }

            return sourcePayload;
        }

        public IEnumerable<string> GetResourceNames(BaseResponseProvider siteRoot)
        {
            return LocateZipArchive(siteRoot).Entries.Select(e => e.FullName);
        }

        private ZipArchive LocateZipArchive(BaseResponseProvider siteRoot)
        {
            MediaData archive = null;
            if (((ZipAssetResponseProvider)siteRoot).ArchiveFile != null)
            {
                archive = _loader.Get<MediaData>(((ZipAssetResponseProvider)siteRoot).ArchiveFile);
            }
            else
            {
                var contentAssetHelper = ServiceLocator.Current.GetInstance<ContentAssetHelper>();
                var assetFolder = contentAssetHelper.GetOrCreateAssetFolder(((IContent)siteRoot).ContentLink);
                var assets = _loader.GetChildren<MediaData>(assetFolder.ContentLink);

                archive = assets.FirstOrDefault(a => a.Name == DefaultArchiveName);

                if (archive == null)
                {
                    archive = assets.FirstOrDefault(a => a.Name.EndsWith(".zip"));
                }
            }

            if (archive == null)
            {
                return null;
            }

            var archiveBytes = archive.BinaryData.ReadAllBytes();

            return new ZipArchive(new MemoryStream(archiveBytes));
        }
    }


}
