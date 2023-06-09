namespace Optimizely.Server.Models
{
    public class WarehouseViewModel
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public bool IsActive { get; set; }
        public bool IsPrimary { get; set; }
        public bool IsFulfillmentCenter { get; set; }
        public bool IsPickupLocation { get; set; }
        public bool IsDeliveryLocation { get; set; }
        public ContactInformation ContactInformation { get; set; }
    }

    public class ContactInformation
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Line1 { get; set; }
        public string Line2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string CountryCode { get; set; }
        public string CountryName { get; set; }
        public string PostalCode { get; set; }
        public string RegionCode { get; set; }
        public string RegionNName { get; set; }
        public string DaytimePhoneNumber { get; set; }
        public string EveningPhoneNumber { get; set; }
        public string FaxNumber { get; set; }
        public string Email { get; set; }
        public string RegionName { get; internal set; }
    }
}
