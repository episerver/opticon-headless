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
using EPiServer;
using Optimizely.Server.ExtendedContentTypes;
using EPiServer.DataAccess;
using Optimizely.Server.Models;
using EPiServer.Security;
using EPiServer.Commerce.Catalog.ContentTypes;
using EPiServer.Commerce.SpecializedProperties;
using Mediachase.Commerce.Catalog;
using EPiServer.Core;
using System;
using Mediachase.Commerce.Pricing;
using Mediachase.Commerce;
using Mediachase.Commerce.InventoryService;
using EPiServer.Commerce.Catalog.Linking;

namespace Optimizely.Server.Controllers
{
    [Route("api/episerver/v3.0")]
    [Authorize(Policy = "ContentManagementAuthorizationPolicy")]
    public class CommerceController : BaseController
    {
        private readonly IContentRepository _contentRepository;
        private readonly IRelationRepository _relationRepository;
        private readonly ReferenceConverter _referenceConverter;
        private readonly IWarehouseRepository _warehouseRepository;
        private readonly IMarketService _marketService;
        private readonly IPriceDetailService _priceDetailService;
        private readonly IInventoryService _inventoryService;

        public CommerceController(IContentRepository contentRepository,
            IRelationRepository relationRepository,
            ReferenceConverter referenceConverter,
            IWarehouseRepository warehouseRepository,
            IMarketService marketService,
            IPriceDetailService priceDetailService,
            IInventoryService inventoryService)
        {
            _contentRepository = contentRepository;
            _relationRepository = relationRepository;
            _referenceConverter = referenceConverter;
            _warehouseRepository = warehouseRepository;
            _marketService = marketService;
            _priceDetailService = priceDetailService;
            _inventoryService = inventoryService;
        }

        [HttpPost]
        [Route("catalogs")]
        public IActionResult CreateCatalog([FromBody] CatalogModel model)
        {
            var rootLink = _referenceConverter.GetRootLink();
            var catalogs = _contentRepository.GetChildren<CatalogContent>(rootLink);

            if (catalogs.Any(c => c.ContentGuid.ToString().Equals(model.Guid)))
            {
                return NoContent();
            }

            var content = _contentRepository.GetDefault<CatalogContent>(rootLink);
            content.ContentGuid = new Guid(model.Guid);
            content.Name = model.CatalogName;
            content.CatalogLanguages = new ItemCollection<string>(model.CatalogLanguages);
            content.DefaultLanguage = model.DefaultLanguage;
            content.DefaultCurrency = model.DefaultCurrency;
            content.WeightBase = model.WeightBase;
            content.Owner = model.Owner;
            content.LengthBase = model.LengthBase;
            _contentRepository.Save(content, SaveAction.Publish, AccessLevel.NoAccess);

            return Ok($"Catalog \"{content.Name}\" created.");
        }

        [HttpPost]
        [Route("categories")]
        public IActionResult CreateCategory([FromBody] NodeModel model)
        {
            var parent = _contentRepository.Get<IContent>(new Guid(model.ParentGuid));
            var nodes = _contentRepository.GetChildren<GenericNode>(parent.ContentLink);

            if (nodes.Any(c => c.ContentGuid.ToString().Equals(model.Guid)))
            {
                return NoContent();
            }

            var content = _contentRepository.GetDefault<GenericNode>(parent.ContentLink);
            content.ContentGuid = new Guid(model.Guid);
            content.Code = model.Code;
            content.Name = model.Name;
            _contentRepository.Save(content, SaveAction.Publish, AccessLevel.NoAccess);

            return Ok($"Category \"{content.Name}\" created.");
        }

        [HttpPost]
        [Route("products")]
        public IActionResult CreateProduct([FromBody] ProductModel model)
        {
            var parent = _contentRepository.Get<IContent>(new Guid(model.ParentGuid));
            var products = _contentRepository.GetChildren<GenericProduct>(parent.ContentLink);

            if (products.Any(c => c.ContentGuid.ToString().Equals(model.Guid)))
            {
                return NoContent();
            }

            var content = _contentRepository.GetDefault<GenericProduct>(parent.ContentLink);
            content.ContentGuid = new Guid(model.Guid);
            content.Code = model.Code;
            content.Name = model.Name;

            _contentRepository.Save(content, SaveAction.Publish, AccessLevel.NoAccess);

            return Ok($"Product \"{content.Name}\" created.");
        }

        [HttpPost]
        [Route("variants")]
        public IActionResult CreateVariant([FromBody] VariantModel model)
        {
            var parent = _contentRepository.Get<IContent>(new Guid(model.ParentGuid));
            var variants = _relationRepository.GetChildren<ProductVariation>(parent.ContentLink);

            foreach (var item in variants)
            {
                if (_contentRepository.Get<IContent>(item.Child).ContentGuid.ToString().Equals(model.Guid))
                {
                    return NoContent();
                }
            }

            var content = _contentRepository.GetDefault<GenericVariant>(parent.ContentLink);
            content.ContentGuid = new Guid(model.Guid);
            content.Code = model.Code;
            content.Name = model.Name;
            (content as IDimensionalStockPlacement).MinQuantity = 1;
            (content as IDimensionalStockPlacement).MaxQuantity = 100;
            (content as IDimensionalStockPlacement).Weight = 5;
            (content as IDimensionalStockPlacement).TrackInventory = true;
            _contentRepository.Save(content, SaveAction.Publish, AccessLevel.NoAccess);

            foreach (var item in model.VariantPricing)
            {
                AddPrice(model.Code, item.MarketId, item.Price, item.CurrencyCode);
            }
            foreach (var item in model.VariantInventory)
            {
                AddInventory(model.Code, item.InStockQuantity, item.WarehouseCode);
            }

            return Ok($"Variant \"{content.Name}\" created.");
        }

        [HttpPost]
        [Route("markets")]
        public IActionResult CreateMarket([FromBody] MarketViewModel model)
        {
            if (_marketService.GetMarket(model.MarketId) == null)
            {
                _marketService.CreateMarket(new MarketEditModel(model));

                return Ok($"Market \"{model.MarketName}\" created.");
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
                return Ok($"Warehouse \"{warehouse.Name}\" created.");
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

        #region Util Functions
        private void AddPrice(string entryCode, string marketId, decimal price, string currencyCode)
        {
            var priceValue = new PriceDetailValue
            {
                CatalogKey = new CatalogKey(entryCode),
                MarketId = marketId,
                CustomerPricing = CustomerPricing.AllCustomers,
                MinQuantity = 0,
                ValidFrom = DateTime.Now.AddDays(-7),
                ValidUntil = DateTime.Now.AddYears(10),
                UnitPrice = new Money(price, currencyCode)
            };

            _priceDetailService.Save(priceValue);
        }

        private void AddInventory(string entryCode, decimal inStockQuantity, string warehouseCode)
        {
            if (inStockQuantity <= 0) return;

            var inventoryRecord = new InventoryRecord()
            {
                CatalogEntryCode = entryCode,
                PurchaseAvailableQuantity = inStockQuantity,
                BackorderAvailableQuantity = 0,
                BackorderAvailableUtc = DateTime.UtcNow,
                IsTracked = true,
                PreorderAvailableQuantity = 0,
                PreorderAvailableUtc = DateTime.UtcNow,
                PurchaseAvailableUtc = DateTime.UtcNow,
                WarehouseCode = warehouseCode
            };

            _inventoryService.Save(new[] { inventoryRecord });
        }
        #endregion
    }
}
