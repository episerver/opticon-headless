﻿using EPiServer.Core;

namespace Optimizely.Server.Models
{
    public class NodeModel
    {
        public string Guid { get; set; }
        public string ParentGuid { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
    }
}
