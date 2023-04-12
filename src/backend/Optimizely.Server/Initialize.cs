using EPiServer.Commerce.Internal.Migration;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.Framework;
using EPiServer.Framework.Initialization;
using EPiServer.Security;
using EPiServer.ServiceLocation;
using System.Linq;

namespace Optimizely.Server
{
    [ModuleDependency(typeof(EPiServer.Web.InitializationModule))]
    [ModuleDependency(typeof(EPiServer.Commerce.Initialization.InitializationModule))]
    public class Initialize : IInitializableModule
    {
        void IInitializableModule.Initialize(InitializationEngine context)
        {
            var manager = context.Locate.Advanced.GetInstance<MigrationManager>();
            if (manager.SiteNeedsToBeMigrated())
            {
                manager.Migrate();
            }

            var descriptor = context.Locate.Advanced.GetInstance<IContentSecurityRepository>().Get(new ContentReference(1));
            if (!descriptor.Entries.Any(x =>  x.Name == "postman-client"))
            {
                var clone = descriptor.CreateWritableClone() as IContentSecurityDescriptor;
                clone.AddEntry(new AccessControlEntry(new RawACE
                {
                    Access = AccessLevel.FullAccess,
                    EntityType = SecurityEntityType.Application,
                    Name = "postman-client"
                }));
                context.Locate.Advanced.GetInstance<IContentSecurityRepository>().Save(new ContentReference(1), clone, SecuritySaveType.Replace);
            }
        }

        void IInitializableModule.Uninitialize(InitializationEngine context)
        {

        }
    }
}
