using Microsoft.AspNetCore.Mvc;
using Optimizely.Server.StaticProvider.Models;

namespace Optimizely.Server.StaticProvider.Commands
{
    public interface IResponseProviderCommandManager
    {
        ActionResult ProcessCommands(BaseResponseProvider siteRoot, string path);
    }
}