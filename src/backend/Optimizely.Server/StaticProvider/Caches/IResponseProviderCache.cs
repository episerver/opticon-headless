using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace Optimizely.Server.StaticProvider.Caches
{
    public interface IResponseProviderCache
    {
        void Clear(Guid siteId);
        ActionResult Get(Guid siteId, string path);
        void Put(Guid siteId, string path, ActionResult value);
        IEnumerable<string> Show(Guid siteId);
    }
}