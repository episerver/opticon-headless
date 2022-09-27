using Optimizely.Server.StaticProvider.Models;

namespace Optimizely.Server.StaticProvider.UserManagers
{
    public interface IResponseProviderUserManager
    {
        bool ShouldUseCache(BaseResponseProvider root);
    }
}
