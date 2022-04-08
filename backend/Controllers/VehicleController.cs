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
    public class VehicleController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public VehicleController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: api/Vehicle
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<Vehicle>>> GetVehicles()
        //{
        //    return await _context.Vehicles.ToListAsync();
        //}

        // GET: api/Vehicle/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Vehicle>> GetVehicle(int id)
        {
           
            var vehicle = await _context.Vehicles.FindAsync(id);

            if (vehicle == null)
            {
                return NotFound();
            }

            return vehicle;
        }

        [HttpGet]
        public List<Vehicle> GetVehicles(int? ownerId)
        {
            List<Vehicle> vehicles = null;
            if(ownerId != null)
            {
                vehicles = _context.Vehicles.Where(v => v.OwnerId == ownerId).ToList();
            }
            else
            {
                vehicles = _context.Vehicles.ToList();
            }
            

            return vehicles;
        }


        // PUT: api/Vehicle/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public Vehicle Vehicle(Vehicle vehicle)
        {
   
            try
            {
                _context.Vehicles.Update(vehicle);
                _context.SaveChanges();
                return _context.Vehicles.Find(vehicle.Id);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VehicleExists(vehicle.Id))
                {
                    throw;
                }
                else
                {
                    throw;
                }
            }

        }

        // POST: api/Vehicle
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Vehicle>> PostVehicle(Vehicle vehicle)
        {
            _context.Vehicles.Add(vehicle);
            await _context.SaveChangesAsync();

            return vehicle;
        }

        // DELETE: api/Vehicle/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVehicle(int id)
        {
            var vehicle = await _context.Vehicles.FindAsync(id);

            if (vehicle == null)
            {
                return NotFound();
            }

            _context.Vehicles.Remove(vehicle);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool VehicleExists(int id)
        {
            return _context.Vehicles.Any(e => e.Id == id);
        }
    }
}
