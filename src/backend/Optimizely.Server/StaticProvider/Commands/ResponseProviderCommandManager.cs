using Microsoft.AspNetCore.Mvc;
using Optimizely.Server.StaticProvider.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Optimizely.Server.StaticProvider.Commands
{
    public class ResponseProviderCommandManager : IResponseProviderCommandManager
    {
        private const string commandPrefix = "__";
        private Dictionary<string, Func<BaseResponseProvider, string, ActionResult>> commandMap = new();
        public ResponseProviderCommandManager()
        {
            commandMap.Add("asset", ResponseProviderCommands.ShowAsset);
            commandMap.Add("context", ResponseProviderCommands.ShowContext);
            commandMap.Add("contents", ResponseProviderCommands.ShowContents);
            commandMap.Add("cache", ResponseProviderCommands.ShowCache);
            commandMap.Add("clear-cache", ResponseProviderCommands.ClearCache);
            commandMap.Add("log", ResponseProviderCommands.ShowLog);
            commandMap.Add("clear-log", ResponseProviderCommands.ClearLog);
        }

        public ActionResult ProcessCommands(BaseResponseProvider siteRoot, string path)
        {
            var commandSegment = path.Split("/").FirstOrDefault(s => s.StartsWith(commandPrefix));
            if (commandSegment == null)
            {
                return null; // No command segemtn present
            }

            commandSegment = commandSegment.Replace(commandPrefix, string.Empty);
            if (!commandMap.ContainsKey(commandSegment))
            {
                return new NotFoundResult(); // No command found for the segment
            }

            try
            {
                return commandMap[commandSegment](siteRoot, path);
            }
            catch (NotImplementedException e)
            {
                // 410, because this is specifically not supported
                return new ContentResult() { Content = "This resource provider does not implement this command.", StatusCode = 410, ContentType = "text/plain" };
            }
        }
    }
}
