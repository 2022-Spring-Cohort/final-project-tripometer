using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TripometerAPI;
using TripometerAPI.Models;

namespace TripometerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReceiptController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public ReceiptController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: api/Receipt
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Receipt>>> GetReceipts()
        {
            return await _context.Receipts.ToListAsync();
        }

        // GET: api/Receipt/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<Receipt>> GetReceipt(int id)
        //{
        //    var receipt = await _context.Receipts.FindAsync(id);

        //    if (receipt == null)
        //    {
        //        return NotFound();
        //    }

        //    return receipt;
        //}

        [HttpGet("{id}")]
        public List<Receipt> GetReceipts(int id)
        {
            List<Receipt> receipts;
            if (id != null)
            {
                receipts = _context.Receipts.Where(r => r.TripId == id).ToList();
            }
            else
            {
                receipts = _context.Receipts.ToList();
            }
            return receipts;
        }

        // PUT: api/Receipt/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public Receipt  PutReceipt( Receipt receipt)
        {
          

            try
            {
                _context.Receipts.Update(receipt);
                _context.SaveChanges();
                return _context.Receipts.Find(receipt.Id);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReceiptExists( receipt.Id))
                {
                    throw;
                }
                else
                {
                    throw;
                }
            }

           
        }

        // POST: api/Receipt
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public Receipt PostReceipt(Receipt receipt)
        {
            receipt.Date = DateTime.Now;
            _context.Receipts.Add(receipt);
            _context.SaveChanges();

            return receipt;
        }

        // DELETE: api/Receipt/5
        [HttpDelete("{id}")]
        public Trip DeleteReceipt(int id)
        {
            var receiptToDelete = _context.Receipts.Find(id);
            var tripId = receiptToDelete.TripId;
            Trip trip = _context.Trips.Find(tripId);
            _context.Receipts.Remove(receiptToDelete);
            _context.SaveChanges();

            return trip;
        }

        private bool ReceiptExists(int id)
        {
            return _context.Receipts.Any(e => e.Id == id);
        }
    }
}
