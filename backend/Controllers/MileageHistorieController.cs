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
    public class MileageHistorieController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public MileageHistorieController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: api/MileageHistorie
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MileageHistory>>> GetMileageHistories()
        {
            return await _context.MileageHistories.ToListAsync();
        }

        // GET: api/MileageHistorie/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MileageHistory>> GetMileageHistory(int id)
        {
            var mileageHistory = await _context.MileageHistories.FindAsync(id);

            if (mileageHistory == null)
            {
                return NotFound();
            }

            return mileageHistory;
        }

        // PUT: api/MileageHistorie/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMileageHistory(int id, MileageHistory mileageHistory)
        {
            if (id != mileageHistory.Id)
            {
                return BadRequest();
            }

            _context.Entry(mileageHistory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) 
            {
                if (!MileageHistoryExists(id))
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

        // POST: api/MileageHistorie
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<MileageHistory>> PostMileageHistory(MileageHistory mileageHistory)
        {
            _context.MileageHistories.Add(mileageHistory);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMileageHistory", new { id = mileageHistory.Id }, mileageHistory);
        }

        // DELETE: api/MileageHistorie/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMileageHistory(int id)
        {
            var mileageHistory = await _context.MileageHistories.FindAsync(id);
            if (mileageHistory == null)
            {
                return NotFound();
            }

            _context.MileageHistories.Remove(mileageHistory);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MileageHistoryExists(int id)
        {
            return _context.MileageHistories.Any(e => e.Id == id);
        }
    }
}
