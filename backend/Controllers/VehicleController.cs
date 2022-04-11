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
        public List<Vehicle> GetVehicles(int ownerId)
        {

            return _context.Vehicles.Where(v => v.OwnerId == ownerId).ToList();
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
        public List<Vehicle> DeleteVehicle(int id)
        {
            Vehicle vehicleToDelete = _context.Vehicles.Find(id);
            var ownerId = vehicleToDelete.OwnerId;
            _context.Vehicles.Remove(vehicleToDelete);
            _context.SaveChanges();
            return _context.Vehicles.Where(v => v.OwnerId == ownerId).ToList(); 
        }

        private bool VehicleExists(int id)
        {
            return _context.Vehicles.Any(e => e.Id == id);
        }
    }
}
