using System;

namespace TripometerAPI.Models
{
    public class MileageHistory
    { 
        public int Id { get; set; }

        public int VehicleId { get; set; }

        public DateTime Date { get; set; }

        public int Mileage { get; set; }

        public virtual Vehicle Vehicle { get; set; }

    }
}
