using EPiServer.ServiceLocation;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Optimizely.Server.StaticProvider.Logging
{
    // This is a dirty debug log
    // This should not take the place of real logging...
    public class InMemoryLog : IResponseProviderLog
    {
        private List<LogEntry> entries = new();

        public List<string> Entries => entries.OrderByDescending(e => e.Timestamp).Take(1000).Select(e => e.ToString()).ToList();


        public void Log(object text)
        {
            entries.Add(new LogEntry(text));
        }

        public List<string> GetEntriesForKey(string key)
        {
            // This is a gross hack...
            return entries.Where(e => e.Key == key).Select(e => e.ToString()).ToList();
        }

        public void Clear()
        {
            entries = new();
        }
    }

    public class LogEntry
    {
        public DateTime Timestamp { get; private set; }
        public string Key { get; private set; }
        public string Text { get; private set; }

        public LogEntry(object text)
        {
            var _httpContext = ServiceLocator.Current.GetInstance<IHttpContextAccessor>();
            var key = _httpContext.HttpContext.Items["__rpk"].ToString();

            Timestamp = DateTime.Now;
            Text = text.ToString();
            Key = key;
        }

        public override string ToString()
        {
            return $"{Timestamp:hh:mm:ss:ff} : {Key} : {Text}";
        }
    }
}
