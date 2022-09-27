using EPiServer.Core.Routing;
using EPiServer.Framework;
using EPiServer.Framework.Initialization;
using EPiServer.ServiceLocation;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Optimizely.Server.StaticProvider.Caches;
using Optimizely.Server.StaticProvider.Commands;
using Optimizely.Server.StaticProvider.Logging;
using Optimizely.Server.StaticProvider.PathTranslators;
using Optimizely.Server.StaticProvider.SourceProviders;
using Optimizely.Server.StaticProvider.Transformers;
using Optimizely.Server.StaticProvider.UserManagers;

namespace Optimizely.Server.StaticProvider
{
    [InitializableModule]
    public class ResponseProviderInit : IConfigurableModule
    {
        public void ConfigureContainer(ServiceConfigurationContext context)
        {
            context.Services.AddSingleton<IPartialRouter, ResponseProviderPartialRouter>();
            context.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            context.Services.AddSingleton<IResponseProviderPathTranslator, FileSystemPathTranslator>();
            context.Services.AddSingleton<ISourceProvider, ZipArchiveSourceProvider>();
            context.Services.AddSingleton<IResponseProviderCommandManager, ResponseProviderCommandManager>();
            context.Services.AddSingleton<IMimeTypeManager, MimeTypeManager>();
            context.Services.AddSingleton<IResponseProviderLog, InMemoryLog>();
            context.Services.AddSingleton<IResponseProviderCache, InMemoryCache>();
            context.Services.AddSingleton<IResponseProviderTransformerManager, ResponseProviderTransformerManager>();
            context.Services.AddSingleton<IResponseProviderUserManager, SimpleUserManager>();
        }

        public void Initialize(InitializationEngine context)
        {

        }

        public void Uninitialize(InitializationEngine context)
        {

        }
    }
}
