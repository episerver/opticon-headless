using EPiServer.Cms.Shell.UI.Controllers.Internal;
using EPiServer.ServiceLocation;
using Mediachase.Commerce.Catalog.Dto;
using Mediachase.Commerce.Inventory;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Optimizely.Server.Models;
using System.Collections.Generic;

namespace Optimizely.Server.Controllers
{
    [Authorize(Policy = "ContentManagementAuthorizationPolicy")]
    public class CommerceController : BaseController
    {
        private IWarehouseRepository _warehouseRepository = ServiceLocator.Current.GetInstance<IWarehouseRepository>();

        [HttpPost]
        [Route("api/episerver/v3.0/warehouse/createwarehouses")]
        public IActionResult CreateWarehouses([FromBody] List<WarehouseViewModel> warehouses)
        {
            int count = 0;
            IWarehouse warehouse;

            foreach (var item in warehouses)
            {
                if (_warehouseRepository.Get(item.Code) == null)
                {
                    warehouse = new Warehouse
                    {
                        Code = item.Code,
                        Name = item.Name,
                        IsActive = item.IsActive,
                        IsPrimary = item.IsPrimary,
                        IsFulfillmentCenter = item.IsFulfillmentCenter,
                        IsPickupLocation = item.IsPickupLocation,
                        IsDeliveryLocation = item.IsDeliveryLocation,
                        ContactInformation = new WarehouseContactInformation
                        {
                            FirstName = item.ContactInformation.FirstName,
                            LastName = item.ContactInformation.LastName,
                            Line1 = item.ContactInformation.Line1,
                            Line2 = item.ContactInformation.Line2,
                            City = item.ContactInformation.City,
                            State = item.ContactInformation.State,
                            CountryCode = item.ContactInformation.CountryCode,
                            CountryName = item.ContactInformation.CountryName,
                            PostalCode = item.ContactInformation.PostalCode,
                            RegionCode = item.ContactInformation.RegionCode,
                            RegionName = item.ContactInformation.RegionName,
                            DaytimePhoneNumber = item.ContactInformation.DaytimePhoneNumber,
                            EveningPhoneNumber = item.ContactInformation.EveningPhoneNumber,
                            FaxNumber = item.ContactInformation.FaxNumber,
                            Email = item.ContactInformation.Email,
                        }
                    };

                    _warehouseRepository.Save(warehouse);
                    count += 1;
                }
            }

            return count > 0 ? Ok($"{count} warehouses created.") : NoContent();
        }
    }
}
