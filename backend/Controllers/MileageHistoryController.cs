using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using TripometerAPI.Models;

namespace TripometerAPI.Controllers
{
    public class MileageHistoryController : Controller
    {
        private ApplicationContext _context;

        public MileageHistoryController()
        {
            _context = new ApplicationContext();
        }

        [HttpGet]

        public IEnumerable<MileageHistory> get()
        {
            return _context.MileageHistory.ToList();

        }
    }
}
