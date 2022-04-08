using System;

namespace TripometerAPI.Models
{
    public class Receipt
    {
        public int Id { get; set; }

        public DateTime Date { get; set; }

        public int PricePerGallon { get; set; }

        public int TotalCost { get; set; }

        public int AdditionalCosts { get; set; }

        public string GasStation { get; set; }

        public int? TripId { get; set; }

        public virtual Trip Trip { get; set; }



    }
}
