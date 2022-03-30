using System;

namespace TripometerAPI.Models
{
    public class MileageHistory
    { 
        public int Id { get; set; }

        public int VehicleId { get; set; }

        public string Model { get; set; }

        public DateTime Date { get; set; }

        public int Mileage { get; set; }

        public string Make { get; set; }

    }
}
