using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TripometerAPI.Models;

namespace TripometerAPI
{
    public class ApplicationContext : DbContext
    {
        public DbSet<Owner> Owner { get; set; }
        public DbSet<Receipt> Receipt { get; set; }
        public DbSet<Trip> Trip { get; set; }
        public DbSet<Vehicle> Vehicle { get; set; }
        public DbSet<MileageHistory> MileageHistory { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder builder)
        {
            builder.UseSqlServer("Server=(localdb)\\mssqllocaldb; Database = BlogRun; Trusted_connection=True");
            builder.UseLazyLoadingProxies();
        }



    }
}
