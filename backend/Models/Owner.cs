using System.Collections.Generic;

namespace TripometerAPI.Models
{
    public class Owner
    {
        public int Id { get; set; }
        
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public virtual string FullName
        {
            get
            {
                return FirstName + ' ' + LastName;
            }
        }
        public virtual List<Vehicle> Vehicles { get; set; }
        public virtual List<Trip> Trips { get; set; }

        }
    }
