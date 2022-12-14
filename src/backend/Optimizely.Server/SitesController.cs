using EPiServer.ContentApi.Core.Serialization.Models;
using EPiServer.Core;
using EPiServer.Web;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Optimizely.Server
{
    [Authorize(Policy = "ContentManagementAuthorizationPolicy")]
    public class SitesController : ControllerBase
    {
        private ISiteDefinitionRepository _siteDefinitionRepository;
        private IPermanentLinkMapper _permanentLinkMapper;

        public SitesController(ISiteDefinitionRepository siteDefinitionRepository, IPermanentLinkMapper permanentLinkMapper)
        {
            _siteDefinitionRepository = siteDefinitionRepository;
            _permanentLinkMapper = permanentLinkMapper;
        }

        [HttpPost]
        [Route("api/episerver/v3.0/sites")]
        public IActionResult CreateSite()
        {
            var reference = _permanentLinkMapper.Find(new Guid("97333fc8-932c-47d4-8693-9c0870fb7fc9"));
            if (reference == null || ContentReference.IsNullOrEmpty(reference.ContentReference))
            {
                return Problem(detail: "Could not find home page", statusCode: 400);
            }
            var site = new SiteDefinition
            {
                Name = "Opticon Headless",
                SiteUrl = new Uri($"{Request.Scheme}://{Request.Host.Host}/"),
                StartPage = reference.ContentReference,
                Hosts = new List<HostDefinition>()
                {
                    new HostDefinition
                    {
                        Name = Request.Host.Host,
                        Type = HostDefinitionType.Primary,
                    }
                }
            };
            _siteDefinitionRepository.Save(site);
            return new JsonResult(new SiteDefinitionModel
            {
                Name = site.Name,
                Hosts = site.Hosts.Select(x => new HostDefinitionModel
                {
                    Name = x.Name,
                    Type = x.Type.ToString(),
                }),
                Id = site.Id
            });
        }
    }
}
