using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using TripometerAPI.Models;

namespace TripometerAPI.Controllers
{
    public class ReceiptController : Controller
    {
        private ApplicationContext _context;

        public ReceiptController()
        {
            _context = new ApplicationContext();
        }

        [HttpGet]

        public IEnumerable<Receipt> get()
        {
            return _context.Receipt.ToList();

        }
    }
}
