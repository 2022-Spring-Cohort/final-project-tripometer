namespace TripometerAPI.Models
{
    public class Receipt
    {
        public int Id { get; set; }

        public int Date { get; set; }

        public int PricePerGallon { get; set; }

        public int TotalCost { get; set; }

        public int TripCost { get; set; }

        public string GasStation { get; set; }


    }
}
