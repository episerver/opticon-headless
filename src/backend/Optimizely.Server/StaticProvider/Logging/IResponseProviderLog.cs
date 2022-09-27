using System.Collections.Generic;

namespace Optimizely.Server.StaticProvider.Logging
{
    public interface IResponseProviderLog
    {

        List<string> Entries { get; }
        void Log(object text);
        List<string> GetEntriesForKey(string key);
        void Clear();
    }
}