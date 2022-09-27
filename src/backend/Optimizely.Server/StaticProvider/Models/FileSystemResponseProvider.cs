using EPiServer.DataAnnotations;
using EPiServer.ServiceLocation;
using Optimizely.Server.StaticProvider.PathTranslators;
using Optimizely.Server.StaticProvider.SourceProviders;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;

namespace Optimizely.Server.StaticProvider.Models
{
    [ContentType(DisplayName = "File System Site Root", GUID = "78C1BDCC-34E9-52CE-98C5-05BE3A0EBAF0")]
    public class FileSystemResponseProvider : BaseResponseProvider
    {
        // Yes, this potentially opens a massive security hole
        // It will be fixed later
        // If you don't plan to use it, comment out the [ContentType] attribute above

        [Required]
        [Display(Name = "Base File System Path", Description = "The path to the local directory where the static files are hosted.")]
        public virtual string FileSystemPath { get; set; }

        public override IResponseProviderPathTranslator GetPathTranslator()
        {
            return new FileSystemPathTranslator();
        }

        public override ISourceProvider GetResponseProvider()
        {
            return new FileSystemSourceProvider();
        }

        public class FileSystemSourceProvider : ISourceProvider
        {
            public static string NotFoundDocumentName { get; set; } = "404.html";

            private IMimeTypeManager mimeTypeManager;

            public FileSystemSourceProvider()
            {
                mimeTypeManager = ServiceLocator.Current.GetInstance<IMimeTypeManager>();
            }

            public SourcePayload GetSourcePayload(BaseResponseProvider siteRoot, string path)
            {
                var fullPath = Path.Combine(((FileSystemResponseProvider)siteRoot).FileSystemPath, path);

                if (File.Exists(fullPath))
                {
                    // Found the document
                    var content = File.ReadAllBytes(fullPath);
                    var contentType = mimeTypeManager.GetMimeType(path);
                    return new SourcePayload(content, contentType);
                }

                fullPath = Path.Combine(((FileSystemResponseProvider)siteRoot).FileSystemPath, NotFoundDocumentName);
                if (File.Exists(fullPath))
                {
                    // Found a 404 document; soft 404
                    var content = File.ReadAllBytes(fullPath);
                    var contentType = mimeTypeManager.GetMimeType(path);
                    return new SourcePayload(content, contentType) { StatusCode = 404 };
                }

                // Found nothing; hard 404
                return SourcePayload.Empty;
            }

            public IEnumerable<string> GetResourceNames(BaseResponseProvider siteRoot)
            {
                throw new System.NotImplementedException();
            }
        }
    }
}
