using System;
using System.Collections.Generic;

namespace TripometerAPI.Models
{
    public class Trip
    {
        public int Id { get; set; }
        public DateTime EmbarkDate { get; set; }
        public DateTime? DisembarkDate { get; set; }
        public string StartAddress { get; set; }
        public string EndAddress { get; set; }
        public int MileageBefore { get; set; }
        public int MileageAfter { 
            get{
                return MileageBefore + (int)Distance;
            } 
        }
        public DateTime ArrivalDate { get; set; }

        public DateTime? ReturnDate { get; set; }
        public double Distance { get; set; }
        public decimal EstimatedGasCost { get; set; }
        public double EstimatedFuelUsage { get; set; }
        public int VehicleId { get; set; }
        public virtual Vehicle Vehicle { get; set; }
        public virtual List<Receipt> Receipts { get; set; }
    }
}
