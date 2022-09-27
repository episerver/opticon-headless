using Optimizely.Server.StaticProvider.Models;

namespace Optimizely.Server.StaticProvider.UserManagers
{
    public class SimpleUserManager : IResponseProviderUserManager
    {
        public bool ShouldUseCache(BaseResponseProvider root)
        {
            return !root.ACL.QueryDistinctAccess(EPiServer.Security.AccessLevel.Edit);
        }
    }
}
