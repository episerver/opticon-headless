using EPiServer.Cms.Shell.UI.Controllers.Internal;
using EPiServer.Find;
using Mediachase.Commerce.Inventory;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using Mediachase.Commerce.Markets;
using EPiServer.Commerce.UI.Admin.Shipping.Internal;
using Mediachase.Commerce.Orders.Dto;
using Mediachase.Commerce.Orders.Managers;
using EPiServer.Commerce.UI.Admin.Warehouses.Internal;
using EPiServer.Commerce.UI.Admin.Markets.Internal;
using EPiServer.Shell.Web.Mvc;

namespace Optimizely.Server.Controllers
{
    [Route("api/episerver/v3.0")]
    [Authorize(Policy = "ContentManagementAuthorizationPolicy")]
    public class CommerceController : BaseController
    {
        private readonly IWarehouseRepository _warehouseRepository;
        private readonly IMarketService _marketService;

        public CommerceController(IWarehouseRepository warehouseRepository,
            IMarketService marketService)
        {
            _warehouseRepository = warehouseRepository;
            _marketService = marketService;
        }

        [HttpPost]
        [Route("markets")]
        public IActionResult CreateMarket([FromBody] MarketViewModel model)
        {
            if (_marketService.GetMarket(model.MarketId) == null)
            {
                _marketService.CreateMarket(new MarketEditModel(model));

                return Ok($"Market {model.MarketName} created.");
            }
            else
            {
                return NoContent();
            }
        }

        [HttpPost]
        [Route("warehouses")]
        public IActionResult CreateWarehouse([FromBody] WarehouseModel model)
        {
            IWarehouse warehouse;
            if (_warehouseRepository.Get(model.Code) == null)
            {
                warehouse = new Warehouse
                {
                    Code = model.Code,
                    Name = model.Name,
                    IsActive = model.IsActive,
                    IsPrimary = model.IsPrimary,
                    IsFulfillmentCenter = model.IsFulfillmentCenter,
                    IsPickupLocation = model.IsPickupLocation,
                    IsDeliveryLocation = model.IsDeliveryLocation,
                    ContactInformation = new WarehouseContactInformation
                    {
                        FirstName = model.ContactInformation.FirstName,
                        LastName = model.ContactInformation.LastName,
                        Line1 = model.ContactInformation.Line1,
                        Line2 = model.ContactInformation.Line2,
                        City = model.ContactInformation.City,
                        State = model.ContactInformation.State,
                        CountryCode = model.ContactInformation.CountryCode,
                        CountryName = model.ContactInformation.CountryName,
                        PostalCode = model.ContactInformation.PostalCode,
                        RegionCode = model.ContactInformation.RegionCode,
                        RegionName = model.ContactInformation.RegionName,
                        DaytimePhoneNumber = model.ContactInformation.DaytimePhoneNumber,
                        EveningPhoneNumber = model.ContactInformation.EveningPhoneNumber,
                        FaxNumber = model.ContactInformation.FaxNumber,
                        Email = model.ContactInformation.Email,
                    }
                };

                _warehouseRepository.Save(warehouse);
                return Ok($"Warehouse {warehouse.Name} created.");
            }
            else
            {
                return NoContent();
            }
        }

        [HttpGet]
        [Route("shippings/shippingmethods")]
        public IActionResult GetShippingMethods(string languageId)
        {
            var shippingMethodRows = ShippingManager.GetShippingMethods(languageId, true).ShippingMethod
                .Cast<ShippingMethodDto.ShippingMethodRow>();

            var result = new List<ShippingMethodViewModel>();

            foreach (var item in shippingMethodRows)
            {
                var shippingMethodViewModel = new ShippingMethodViewModel
                {
                    ShippingMethodId = item.ShippingMethodId,
                    Name = item.Name,
                    Description = item.IsDescriptionNull() ? string.Empty : item.Description,
                    ShippingOptionId = item.ShippingOptionId,
                    LanguageId = item.LanguageId,
                    BasePrice = item.BasePrice,
                    CurrencyId = item.IsCurrencyNull() ? string.Empty : item.Currency,
                    DisplayName = item.DisplayName,
                    IsActive = item.IsActive,
                    IsDefault = item.IsDefault,
                    Ordering = item.Ordering,
                    Created = item.Created,
                    LastModified = item.Modified,
                };

                result.Add(shippingMethodViewModel);
            }

            return this.JsonData(result);
        }

        [HttpGet]
        [Route("countries")]
        public IActionResult GetAllCountries()
        {
            var countries = CountryManager.GetCountries().Country.Select(x => new CountryViewModel { Code = x.Code, Name = x.Name }); ;
            return this.JsonData(countries);
        }

        [HttpGet]
        [Route("countries/{countryCode}/regions")]
        public IActionResult GetAllRegionsForCountry(string countryCode)
        {
            var country = CountryManager.GetCountry(countryCode, false)?.Country?.FirstOrDefault();
            if (country != null)
            {
                return this.JsonData(country.GetStateProvinceRows().Select(x => x.Name).ToList());
            }
            else
            {
                return this.JsonData(Enumerable.Empty<string>());
            }
        }
    }
}
