using Microsoft.AspNetCore.StaticFiles;
using System.Collections.Generic;

namespace Optimizely.Server.StaticProvider
{
    public class MimeTypeManager : IMimeTypeManager
    {
        public string DefaultMimeType = "text/html";

        public List<string> AdditionalTextMimeTypes = new() {
            "application/javascript",
            "application/x-javascript", // Weird, but it's out there
            "application/json",
            "application/ld+json",
            "application/xml",
            "application/xml-dtd"
        };

        public string GetMimeType(string path)
        {
            new FileExtensionContentTypeProvider().TryGetContentType(path, out var contentType);
            return contentType ?? DefaultMimeType;
        }

        public bool IsText(string mimeType)
        {
            mimeType = mimeType.Trim().ToLower();

            if (mimeType.StartsWith("text/"))
            {
                return true;
            }

            if (mimeType.EndsWith("+xml"))
            {
                return true; // Lots of weird one-offs like "application/whatever+xml"
            }

            return AdditionalTextMimeTypes.Contains(mimeType);
        }
    }
}
