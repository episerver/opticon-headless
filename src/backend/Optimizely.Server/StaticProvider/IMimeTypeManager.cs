namespace Optimizely.Server.StaticProvider
{
    public interface IMimeTypeManager
    {
        string GetMimeType(string path);
        bool IsText(string mimeType);
    }
}