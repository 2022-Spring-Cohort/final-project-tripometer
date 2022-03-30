using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using TripometerAPI.Models;

namespace TripometerAPI.Controllers
{
    public class OwnerController : Controller
    {
        private ApplicationContext _context;

        public OwnerController()
        {
            _context = new ApplicationContext();
        }

        [HttpGet]

        public IEnumerable<Owner> get()
        {
            return _context.Owner.ToList();

        }
    }
}