using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using TripometerAPI.Models;

namespace TripometerAPI.Controllers
{
    public class TripController : Controller
    {
        private ApplicationContext _context;

        public TripController()
        {
            _context = new ApplicationContext();
        }

        [HttpGet]

        public IEnumerable<Trip> get()
        {
            return _context.Trip.ToList();

        }
    }
}
