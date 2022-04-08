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
        public int MileageAfter { get; set; }
        public int ETA { get; set; }
        public int Distance { get; set; }
        public int EstimatedGasCost { get; set; }
        public int EstimatedTotalCost { get; set; }

        public int? VehicleId { get; set; }
      //  public int? OwnerId { get; set; }
      //  public virtual Owner Owner { get; set; }
        public virtual Vehicle Vehicle { get; set; }
        public virtual List<Receipt> Receipts { get; set; }
    }
}
