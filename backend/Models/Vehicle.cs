using System.Collections.Generic;

namespace TripometerAPI.Models
{
    public class Vehicle
    {
        public int Id { get; set; }
        public string Make { get; set; }

        public string Model { get; set; }

        public string Year { get; set; }

        public int FuelEfficiency { get; set; }

        public int OwnerId { get; set; }

        public virtual Owner Owner { get; set; }

        public virtual List<Trip> Trips { get; set; }

        public virtual string YearMakeModel { get { return $"{Year} {Make} {Model}"; } }
    }
}
