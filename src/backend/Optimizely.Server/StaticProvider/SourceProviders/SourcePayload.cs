namespace Optimizely.Server.StaticProvider.SourceProviders
{
    public class SourcePayload
    {
        public byte[] Content { get; set; }
        public string ContentType { get; set; }
        public int StatusCode { get; set; } = 200;
        public bool IsEmpty => Content == null;
        public static SourcePayload Empty => new();

        public SourcePayload() { }

        public SourcePayload(byte[] content, string contentType)
        {
            Content = content;
            ContentType = contentType;
        }
    }
}
