using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using TripometerAPI.Models;

namespace TripometerAPI.Controllers
{
    public class VehicleController : Controller
    {
        private ApplicationContext _context;

        public VehicleController()
        {
            _context = new ApplicationContext();
        }


        [HttpGet]
        public IEnumerable<Vehicle> get()
        {
            return _context.Vehicle.ToList();

        }
    }
}
