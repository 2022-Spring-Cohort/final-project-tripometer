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
    public class TripController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public TripController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: api/Trip
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<Trip>>> GetTrips()
        //{
        //    return await _context.Trips.ToListAsync();
        //}

        [HttpGet]
        public List<Trip> GetTrips(int? ownerId)
        {
            if (ownerId != null)
            {
                List<Trip> trips = _context.Trips.Where(t => t.Vehicle.OwnerId == ownerId).ToList();
                return trips;
            }else
            {
                return null;
            }

        }

        // GET: api/Trip/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Trip>> GetTrip(int id)
        {
            var trip = await _context.Trips.FindAsync(id);

            if (trip == null)
            {
                return NotFound();
            }

            return trip;
        }

        // PUT: api/Trip/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTrip(int id, Trip trip)
        {
            if (id != trip.Id)
            {
                return BadRequest();
            }

            _context.Entry(trip).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TripExists(id))
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

        // POST: api/Trip
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Trip>> PostTrip(Trip trip)
        {
            _context.Trips.Add(trip);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTrip", new { id = trip.Id }, trip);
        }

        // DELETE: api/Trip/5
        [HttpDelete("{id}")]
        public List<Trip> DeleteTrip(int id)
        {
            try
            {
                var trip = _context.Trips.Find(id);
                var ownerId = trip.Vehicle.OwnerId;
                _context.Trips.Remove(trip);
                _context.SaveChanges();

                return _context.Trips.Where(t => t.Vehicle.OwnerId == ownerId).ToList();
            }
            catch
            {
                throw;
                
            }

        }

        private bool TripExists(int id)
        {
            return _context.Trips.Any(e => e.Id == id);
        }
    }
}
