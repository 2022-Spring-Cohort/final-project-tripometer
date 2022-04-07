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
        public async Task<IActionResult> PutReceipt(int id, Receipt receipt)
        {
            if (id != receipt.Id)
            {
                return BadRequest();
            }

            _context.Entry(receipt).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReceiptExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Receipt
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Receipt>> PostReceipt(Receipt receipt)
        {
            _context.Receipts.Add(receipt);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReceipt", new { id = receipt.Id }, receipt);
        }

        // DELETE: api/Receipt/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReceipt(int id)
        {
            var receipt = await _context.Receipts.FindAsync(id);
            if (receipt == null)
            {
                return NotFound();
            }

            _context.Receipts.Remove(receipt);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ReceiptExists(int id)
        {
            return _context.Receipts.Any(e => e.Id == id);
        }
    }
}
